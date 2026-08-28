const test = require("node:test");
const assert = require("node:assert/strict");
const {
	createNameKey,
	mergeBestScore,
	normalizeSubmission,
	sortScores
} = require("../src/leaderboard");

test("normalizes valid submissions", () => {
	assert.deepEqual(normalizeSubmission({ name: "  Coffee   Crew ", score: 5, total: 6 }), {
		name: "Coffee Crew",
		score: 5,
		total: 6
	});
});

test("rejects invalid names and scores", () => {
	assert.throws(() => normalizeSubmission({ name: "", score: 5, total: 6 }), /Display name/);
	assert.throws(() => normalizeSubmission({ name: "Alex", score: 7, total: 6 }), /Score and question total/);
	assert.throws(() => normalizeSubmission({ name: "Alex", score: 0, total: 0 }), /Score and question total/);
	assert.throws(() => normalizeSubmission({ name: "Alex", score: 5, total: 101 }), /Score and question total/);
});

test("accepts a host-edited question total", () => {
	assert.deepEqual(normalizeSubmission({ name: "Alex", score: 7, total: 10 }), {
		name: "Alex",
		score: 7,
		total: 10
	});
});

test("uses the same key for capitalization variants", () => {
	assert.equal(createNameKey("Coffee Crew"), createNameKey("coffee crew"));
});

test("keeps an existing higher score", () => {
	const existing = { name: "Alex", score: 5, total: 6, completedAt: "2026-08-14T10:00:00.000Z" };
	assert.equal(mergeBestScore(existing, { name: "Alex", score: 3, total: 6 }, "2026-08-14T11:00:00.000Z"), existing);
});

test("replaces lower or tied scores with the newest completion", () => {
	const existing = { name: "Alex", score: 4, total: 6, completedAt: "2026-08-14T10:00:00.000Z" };
	assert.deepEqual(mergeBestScore(existing, { name: "Alex", score: 5, total: 6 }, "2026-08-14T11:00:00.000Z"), {
		name: "Alex",
		score: 5,
		total: 6,
		completedAt: "2026-08-14T11:00:00.000Z"
	});
	assert.equal(mergeBestScore(existing, { name: "Alex", score: 4, total: 6 }, "2026-08-14T11:00:00.000Z").completedAt, "2026-08-14T11:00:00.000Z");
});

test("sorts by score, newest completion, then name", () => {
	const scores = [
		{ name: "Casey", score: 5, completedAt: "2026-08-14T10:00:00.000Z" },
		{ name: "Blair", score: 6, completedAt: "2026-08-14T09:00:00.000Z" },
		{ name: "Alex", score: 5, completedAt: "2026-08-14T11:00:00.000Z" }
	];
	assert.deepEqual(sortScores(scores).map((entry) => entry.name), ["Blair", "Alex", "Casey"]);
});