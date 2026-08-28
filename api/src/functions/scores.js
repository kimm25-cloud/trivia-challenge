const { app } = require("@azure/functions");
const { TableClient } = require("@azure/data-tables");
const {
	createNameKey,
	mergeBestScore,
	normalizeSubmission,
	sortScores
} = require("../leaderboard");

const tableName = "CoffeeTriviaScores";
const partitionKey = "coffee-quiz-v1";

async function getTableClient() {
	const connectionString = process.env.SCORE_STORAGE_CONNECTION_STRING;
	if (!connectionString) {
		throw new Error("Score storage is not configured.");
	}

	const tableClient = TableClient.fromConnectionString(connectionString, tableName);
	await tableClient.createTable();
	return tableClient;
}

function publicScore(entity) {
	return {
		name: entity.name,
		score: entity.score,
		total: entity.total,
		completedAt: entity.completedAt
	};
}

async function listScores() {
	const tableClient = await getTableClient();
	const scores = [];

	for await (const entity of tableClient.listEntities({
		queryOptions: { filter: `PartitionKey eq '${partitionKey}'` }
	})) {
		scores.push(publicScore(entity));
	}

	return sortScores(scores).slice(0, 100);
}

async function saveScore(request) {
	const submission = normalizeSubmission(await request.json());
	const tableClient = await getTableClient();
	const rowKey = createNameKey(submission.name);
	let existing = null;

	try {
		existing = publicScore(await tableClient.getEntity(partitionKey, rowKey));
	} catch (error) {
		if (error.statusCode !== 404) {
			throw error;
		}
	}

	const bestScore = mergeBestScore(existing, submission, new Date().toISOString());
	if (bestScore !== existing) {
		await tableClient.upsertEntity({ partitionKey, rowKey, ...bestScore }, "Replace");
	}

	return bestScore;
}

app.http("scores", {
	methods: ["GET", "POST"],
	authLevel: "anonymous",
	route: "scores",
	handler: async (request, context) => {
		try {
			if (request.method === "GET") {
				return { jsonBody: { scores: await listScores() } };
			}

			return { status: 201, jsonBody: { score: await saveScore(request) } };
		} catch (error) {
			context.error("Score API request failed", error);
			const isValidationError = error instanceof SyntaxError
				|| error.message.startsWith("Display name")
				|| error.message.startsWith("Score and question total");
			return {
				status: isValidationError ? 400 : 503,
				jsonBody: {
					error: isValidationError ? error.message : "The shared scoreboard is temporarily unavailable."
				}
			};
		}
	}
});