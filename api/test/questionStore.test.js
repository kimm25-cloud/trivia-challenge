const test = require("node:test");
const assert = require("node:assert/strict");
const { normalizeQuestions, parseDataImage } = require("../src/questionStore");

const validQuestion = {
	category: "Coffee",
	question: "Which drink is shown?",
	answers: ["Latte", "Mocha", "Espresso", "Frappe"],
	correctIndex: 0,
	image: null
};

test("should_normalize_questions_when_input_is_valid", () => {
	const [question] = normalizeQuestions([validQuestion]);
	assert.equal(question.question, validQuestion.question);
	assert.deepEqual(question.answers, validQuestion.answers);
	assert.equal(question.image, null);
});

test("should_reject_questions_when_answer_count_is_not_four", () => {
	assert.throws(
		() => normalizeQuestions([{ ...validQuestion, answers: ["One"] }]),
		/exactly four answers/
	);
});

test("should_parse_picture_when_data_url_is_supported", () => {
	const pngHeader = Buffer.from("89504e470d0a1a0a00000000", "hex").toString("base64");
	const image = parseDataImage(`data:image/png;base64,${pngHeader}`);
	assert.equal(image.mimeType, "image/png");
});

test("should_reject_picture_when_type_is_not_supported", () => {
	assert.throws(
		() => parseDataImage("data:image/svg+xml;base64,aGVsbG8="),
		/PNG, JPEG, GIF, or WebP/
	);
});

test("should_reject_picture_when_content_does_not_match_type", () => {
	assert.throws(
		() => parseDataImage("data:image/png;base64,aGVsbG8="),
		/content does not match/
	);
});

test("should_reject_questions_when_set_is_empty_or_too_large", () => {
	assert.throws(() => normalizeQuestions([]), /between 1 and 100/);
	assert.throws(() => normalizeQuestions(Array(101).fill(validQuestion)), /between 1 and 100/);
});
