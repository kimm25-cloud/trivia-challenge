const { app } = require("@azure/functions");
const { randomUUID } = require("node:crypto");
const { TableClient } = require("@azure/data-tables");
const { BlobServiceClient } = require("@azure/storage-blob");
const { normalizeQuestions } = require("../questionStore");

const tableName = "CoffeeTriviaQuestions";
const controlPartitionKey = "question-set-control";
const controlRowKey = "active";
const containerName = "coffee-trivia-question-images";

function getConnectionString() {
	const connectionString = process.env.SCORE_STORAGE_CONNECTION_STRING;
	if (!connectionString) {
		throw new Error("Question storage is not configured.");
	}
	return connectionString;
}

async function getStorageClients() {
	const connectionString = getConnectionString();
	const tableClient = TableClient.fromConnectionString(connectionString, tableName);
	const containerClient = BlobServiceClient.fromConnectionString(connectionString).getContainerClient(containerName);
	await Promise.all([tableClient.createTable(), containerClient.createIfNotExists()]);
	return { tableClient, containerClient };
}

async function streamToBuffer(stream) {
	const chunks = [];
	for await (const chunk of stream) {
		chunks.push(Buffer.from(chunk));
	}
	return Buffer.concat(chunks);
}

async function listQuestions() {
	const { tableClient, containerClient } = await getStorageClients();
	let activeVersion;
	try {
		activeVersion = (await tableClient.getEntity(controlPartitionKey, controlRowKey)).activeVersion;
	} catch (error) {
		if (error.statusCode === 404) {
			return [];
		}
		throw error;
	}

	const partitionKey = `question-set-${activeVersion}`;
	const entities = [];
	for await (const entity of tableClient.listEntities({
		queryOptions: { filter: `PartitionKey eq '${partitionKey}'` }
	})) {
		entities.push(entity);
	}
	entities.sort((left, right) => left.rowKey.localeCompare(right.rowKey));

	return Promise.all(entities.map(async (entity) => {
		let image = null;
		if (entity.imageBlobName) {
			const download = await containerClient.getBlobClient(entity.imageBlobName).download();
			const bytes = await streamToBuffer(download.readableStreamBody);
			image = {
				src: `data:${entity.imageMimeType};base64,${bytes.toString("base64")}`,
				alt: entity.imageAlt
			};
		}
		return {
			category: entity.category,
			question: entity.question,
			answers: JSON.parse(entity.answers),
			correctIndex: entity.correctIndex,
			image
		};
	}));
}

async function replaceQuestions(request) {
	const body = await request.json();
	const questions = normalizeQuestions(body?.questions);
	const { tableClient, containerClient } = await getStorageClients();
	const activeVersion = randomUUID();
	const partitionKey = `question-set-${activeVersion}`;

	for (let index = 0; index < questions.length; index += 1) {
		const question = questions[index];
		const rowKey = String(index).padStart(3, "0");
		let imageBlobName = "";
		let imageMimeType = "";
		if (question.image) {
			imageBlobName = `${activeVersion}/${rowKey}-${randomUUID()}`;
			imageMimeType = question.image.mimeType;
			await containerClient.getBlockBlobClient(imageBlobName).uploadData(question.image.bytes, {
				blobHTTPHeaders: { blobContentType: imageMimeType }
			});
		}

		await tableClient.upsertEntity({
			partitionKey,
			rowKey,
			category: question.category,
			question: question.question,
			answers: JSON.stringify(question.answers),
			correctIndex: question.correctIndex,
			imageBlobName,
			imageMimeType,
			imageAlt: question.imageAlt
		}, "Replace");
	}

	// Publishing one pointer after every write succeeds keeps readers on a complete set.
	await tableClient.upsertEntity({
		partitionKey: controlPartitionKey,
		rowKey: controlRowKey,
		activeVersion,
		updatedAt: new Date().toISOString()
	}, "Replace");

	return listQuestions();
}

app.http("questions", {
	methods: ["GET", "PUT"],
	authLevel: "anonymous",
	route: "questions",
	handler: async (request, context) => {
		try {
			const questions = request.method === "GET"
				? await listQuestions()
				: await replaceQuestions(request);
			return { jsonBody: { questions } };
		} catch (error) {
			context.error("Question API request failed", error);
			const isValidationError = error instanceof SyntaxError
				|| /^(Question|Category|Answer|Correct|Picture|Each)/.test(error.message);
			return {
				status: isValidationError ? 400 : 503,
				jsonBody: {
					error: isValidationError ? error.message : "Shared questions are temporarily unavailable."
				}
			};
		}
	}
});
