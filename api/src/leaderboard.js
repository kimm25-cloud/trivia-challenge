const crypto = require("node:crypto");

const MAX_NAME_LENGTH = 30;
const MAX_QUESTIONS = 100;

function normalizeSubmission(value) {
	const name = typeof value?.name === "string" ? value.name.trim().replace(/\s+/g, " ") : "";
	const score = value?.score;
	const total = value?.total;

	if (!name || name.length > MAX_NAME_LENGTH) {
		throw new Error(`Display name must be between 1 and ${MAX_NAME_LENGTH} characters.`);
	}

	if (!Number.isInteger(score) || !Number.isInteger(total) || total < 1 || total > MAX_QUESTIONS || score < 0 || score > total) {
		throw new Error(`Score and question total must be whole numbers, with 1 to ${MAX_QUESTIONS} questions.`);
	}

	return { name, score, total };
}

function createNameKey(name) {
	return crypto.createHash("sha256").update(name.toLocaleLowerCase("en-US")).digest("hex");
}

function mergeBestScore(existing, submission, completedAt) {
	if (existing && existing.score > submission.score) {
		return existing;
	}

	return {
		name: submission.name,
		score: submission.score,
		total: submission.total,
		completedAt
	};
}

function sortScores(scores) {
	return [...scores].sort((left, right) =>
		right.score - left.score
		|| Date.parse(right.completedAt) - Date.parse(left.completedAt)
		|| left.name.localeCompare(right.name)
	);
}

module.exports = {
	MAX_QUESTIONS,
	createNameKey,
	mergeBestScore,
	normalizeSubmission,
	sortScores
};