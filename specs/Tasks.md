# Team Trivia Challenge Tasks

## Requirement Key

- R1: Hardcode sample questions and show one multiple-choice question at a time.
- R2: Let the player select one answer per question.
- R3: Show the active question in yellow with the current status message.
- R4: Show correct answers in green with the success message.
- R5: Show selected wrong answers in red with the incorrect message.
- R6: Track the score and show the final high score result.
- R7: Show the question number, total, and quiz progress.
- R8: Show answer feedback, reveal the correct answer, and pause before continuing.
- R9: Show detailed final results with a score-based performance message.
- R10: Save the best score and show it on the welcome screen.
- R11: Restart with shuffled questions from a Play Again button.
- R12: Provide a responsive, touch-friendly phone layout.

[x] Task 1: Create welcome, quiz, and results sections with a title, description, question area, score, and status area.
	Satisfies: R1, R6
	Done when: Opening app/index.html shows a clear welcome screen and the page source contains separate quiz and results sections.

[x] Task 2: Add 5-10 hardcoded, mixed-topic trivia questions with four choices and one correct answer each.
	Satisfies: R1
	Done when: The page source contains 5-10 questions from mixed topics, each with four choices and one correct answer.

[x] Task 3: Render one current question with four answers, a yellow current badge, question count, and progress bar.
	Satisfies: R1, R3, R7
	Done when: Starting the quiz shows one question, four answers, "Question 1 of N," and a yellow active status; answering advances both the count and progress bar.

[x] Task 4: Accept only one answer selection for each question.
	Satisfies: R2
	Done when: Clicking an answer records it and disables every answer button for that question.

[x] Task 5: Show color-coded answer feedback, reveal the correct answer after a mistake, and continue after a brief pause.
	Satisfies: R4, R5, R8
	Done when: A correct answer shows green "Correct - great job!" feedback; a wrong answer shows red "Incorrect - wrong answer selected," highlights the correct answer, and then advances automatically.

[x] Task 6: Update the current score after each answer.
	Satisfies: R6
	Done when: Correct answers increase the visible score by one and incorrect answers leave it unchanged.

[x] Task 7: Build a detailed results screen with score, percentage, answer history, and a color-coded performance message.
	Satisfies: R9
	Done when: Completing the quiz lists every question as correct or incorrect and shows the final score, percentage, and the matching green, yellow, or red performance message.

[x] Task 8: Save the best score in browser storage and display it on the welcome screen.
	Satisfies: R10
	Done when: Completing a quiz sets the personal best and refreshing the page keeps the same best score visible.

[x] Task 9: Add a Play Again button that restarts the quiz with shuffled questions.
	Satisfies: R11
	Done when: Clicking Play Again returns to question 1 with a reset score and a different question order.

[x] Task 10: Make the layout responsive with touch-friendly answer buttons.
	Satisfies: R12
	Done when: At a 320px-wide viewport, all content fits without horizontal scrolling and answer buttons remain readable and easy to tap.

## Progress Log

### Task 1

- **What changed:** Added a dedicated welcome section with the project title, challenge description, and Start Challenge button. Kept the quiz and results as separate sections, with question, score, and status areas ready for the quiz flow.
- **Requirement satisfied:** R1 and R6.
- **How to test in your browser:** Open `app/index.html`. Confirm the welcome screen shows the Team Trivia Challenge title, description, and Start Challenge button. Click **Start challenge** and confirm the welcome screen is replaced by the quiz area with a question, score, and yellow current-status badge.

### Task 2

- **What changed:** Confirmed the page includes six hardcoded trivia questions covering Science, History, Technology, Geography, General Knowledge, and Teamwork. Every question has four answer choices and one correct answer stored directly in the HTML/JavaScript.
- **Requirement satisfied:** R1.
- **How to test in your browser:** Open `app/index.html`, click **Start challenge**, choose an answer, and click **Next question**. Continue through the quiz and confirm six questions appear from different topics, each with four answer buttons. No internet connection or external data file is needed.

### Task 3

- **What changed:** Completed the current-question view with one question, four answer buttons, a yellow active-status badge, a question counter, and a progress bar. The visible and accessible progress values now stay synchronized as the quiz advances.
- **Requirement satisfied:** R1, R3, and R7.
- **How to test in your browser:** Open `app/index.html` and click **Start challenge**. Confirm you see one question, four answers, the yellow "Current - this question is active" badge, "Question 1 of 6," and 17% progress. Select an answer, click **Next question**, and confirm the display changes to "Question 2 of 6" and 33% progress.

### Task 4

- **What changed:** Added quiz state that records the selected answer for each question. The existing selection guard now records the first choice and disables all four answer buttons so the same question cannot be answered twice; replay clears the saved selections.
- **Requirement satisfied:** R2.
- **How to test in your browser:** Open `app/index.html`, click **Start challenge**, and click any answer once. Confirm all four answer buttons become disabled and clicking them again cannot change the selected answer or score.

### Task 5

- **What changed:** Added a 1.6-second feedback pause followed by automatic question advancement. Correct choices show green "Correct - great job!" feedback; wrong choices show red "Incorrect - wrong answer selected," name the correct answer, and highlight that answer in green.
- **Requirement satisfied:** R4, R5, and R8.
- **How to test in your browser:** Open `app/index.html`, click **Start challenge**, and choose **Venus** for the first question. Confirm the selected answer turns red, **Mars** is highlighted green, and the message names Mars as the correct answer. Wait briefly and confirm Question 2 appears automatically. Choose **1969** and confirm the green "Correct - great job!" message appears before the next automatic advance.

### Task 6

- **What changed:** Centralized the visible score update so it runs after every answer. Correct answers add one point, incorrect answers preserve the current score, and score changes are announced accessibly.
- **Requirement satisfied:** R6.
- **How to test in your browser:** Open `app/index.html`, click **Start challenge**, and confirm the score starts at 0. Choose **Mars** and confirm the score becomes 1. After Question 2 appears, choose **1959** and confirm the score remains 1 when Question 3 loads.

### Task 7

- **What changed:** Built a detailed results screen with the final score, percentage, and one result row per question showing the selected answer and whether it was correct. Added score-based messages: green "Amazing!" for 80% or higher, yellow "Good effort!" for 50-79%, and red "Keep practicing!" below 50%.
- **Requirement satisfied:** R9.
- **How to test in your browser:** Open `app/index.html`, complete all six questions, and inspect the results screen. Confirm it shows the score and percentage plus six green or red answer rows. Score 5-6 correct to see green **Amazing!**, 3-4 correct to see yellow **Good effort!**, or 0-2 correct to see red **Keep practicing!**

### Task 8

- **What changed:** Added a personal-best display to the welcome screen and connected it to browser storage. Completing a quiz saves the highest score, updates the results screen, and restores that best score when the page is refreshed.
- **Requirement satisfied:** R10.
- **How to test in your browser:** Open `app/index.html` and note the personal best on the welcome screen. Complete the quiz, then refresh the browser. Confirm the same best score still appears above the **Start challenge** button. Complete another quiz with a lower score and refresh again; the higher personal best should remain.

### Task 9

- **What changed:** Connected the **Play again** button to a Fisher-Yates question shuffle and a full quiz-state reset. The shuffle includes a fallback that guarantees the new question order differs from the completed round.
- **Requirement satisfied:** R11.
- **How to test in your browser:** Open `app/index.html`, note the first few questions, and complete the quiz. Click **Play again** on the results screen. Confirm the quiz returns to **Question 1 of 6** with a score of 0, four enabled answers, and the questions appearing in a different order.

### Task 10

- **What changed:** Refined the phone layout with compact panel spacing, wrapping-safe labels and feedback, single-column answers, and smaller results rows. Start and Play Again buttons now have 48px touch targets, while answer buttons remain at least 64px tall.
- **Requirement satisfied:** R12.
- **How to test in your browser:** Open `app/index.html`, narrow the browser to 320px, and move through the welcome, quiz, feedback, and results screens. Confirm there is no horizontal scrollbar, all text remains readable, answer choices stay in one column, and the Start, answer, and Play Again buttons are easy to tap.

## Verification Complete

All requirements R1 through R12 passed end-to-end browser verification on 2026-08-13. The evidence for each requirement is recorded in the Verification Report in `specs/PRD.md`.
