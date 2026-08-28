const MAX_QUESTIONS = 100;
const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/gif", "image/webp"]);

function hasValidImageSignature(bytes, mimeType) {
	if (mimeType === "image/png") {
		return bytes.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"));
	}
	if (mimeType === "image/jpeg") {
		return bytes.subarray(0, 3).equals(Buffer.from("ffd8ff", "hex"));
	}
	if (mimeType === "image/gif") {
		return ["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString("ascii"));
	}
	if (mimeType === "image/webp") {
		return bytes.subarray(0, 4).toString("ascii") === "RIFF"
			&& bytes.subarray(8, 12).toString("ascii") === "WEBP";
	}
	return false;
}

function normalizeText(value, label, maxLength) {
	const text = typeof value === "string" ? value.trim() : "";
	if (!text || text.length > maxLength) {
		throw new Error(`${label} must be between 1 and ${maxLength} characters.`);
	}
	return text;
}

function parseDataImage(source) {
	if (!source) {
		return null;
	}

	if (typeof source !== "string") {
		throw new Error("Question picture is invalid.");
	}

	const match = source.match(/^data:([^;]+);base64,([A-Za-z0-9+/=]+)$/);
	if (!match || !SUPPORTED_IMAGE_TYPES.has(match[1])) {
		throw new Error("Question picture must be PNG, JPEG, GIF, or WebP.");
	}

	const bytes = Buffer.from(match[2], "base64");
	if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES) {
		throw new Error("Question picture must be no larger than 1.5 MB.");
	}
	if (!hasValidImageSignature(bytes, match[1])) {
		throw new Error("Question picture content does not match its file type.");
	}

	return { bytes, mimeType: match[1] };
}

function normalizeQuestions(value) {
	if (!Array.isArray(value) || value.length < 1 || value.length > MAX_QUESTIONS) {
		throw new Error(`Question set must contain between 1 and ${MAX_QUESTIONS} questions.`);
	}

	return value.map((question) => {
		const answers = Array.isArray(question?.answers)
			? question.answers.map((answer) => normalizeText(answer, "Answer", 80))
			: [];
		if (answers.length !== 4) {
			throw new Error("Each question must contain exactly four answers.");
		}
		if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) {
			throw new Error("Correct answer must identify one of the four answers.");
		}

		const image = question.image?.src ? parseDataImage(question.image.src) : null;
		const imageAlt = image ? normalizeText(question.image?.alt, "Picture description", 180) : "";
		return {
			category: normalizeText(question.category, "Category", 40),
			question: normalizeText(question.question, "Question", 180),
			answers,
			correctIndex: question.correctIndex,
			image,
			imageAlt
		};
	});
}

module.exports = {
	MAX_IMAGE_BYTES,
	MAX_QUESTIONS,
	hasValidImageSignature,
	normalizeQuestions,
	parseDataImage
};
