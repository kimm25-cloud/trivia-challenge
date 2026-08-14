# Team Trivia Challenge

## Project Description

Team Trivia Challenge is a simple trivia game where team members test their knowledge, compete for high scores, and have fun while learning. This prototype runs in a web page and gives players clear feedback after each answer.

## Features

- Show one multiple-choice trivia question at a time.
- Let the player select one answer for each question.
- Mark the active question in yellow: **Current - this question is active.**
- Show correct answers in green: **Correct - great job!**
- Show selected wrong answers in red: **Incorrect - wrong answer selected.**
- Track the player's score and show the final high score result.

## Sample Data

Use six coffee-identification questions with four multiple-choice answers each. Hardcode the image paths, answer choices, and correct answers directly in the page.

## Interactive Prototype Requirements

### R7: Question Navigation

- Show the current question number and total, such as "Question 3 of 8."
- Show quiz progress with a progress bar or indicators.
- **How to verify:** Answer questions and confirm the question number and progress display update.

### R8: Answer Feedback

- After an answer is selected, show whether it is correct or wrong.
- If the answer is wrong, display and highlight the correct answer.
- Pause briefly before moving to the next question.
- **How to verify:** Answer incorrectly and confirm the correct answer is highlighted.

### R9: Results Screen

- Show the final score and percentage.
- List each question and whether it was answered correctly or incorrectly.
- Show a performance message based on the score: green **Amazing!**, yellow **Good effort!**, or red **Keep practicing!**
- **How to verify:** Complete the quiz and confirm the detailed results appear.

### R10: High Score Tracking

- Save the best score in browser storage.
- Show the personal best on the welcome screen.
- **How to verify:** Complete the quiz, refresh the page, and confirm the high score is still shown.

### R11: Play Again

- Provide a **Play Again** button that restarts the quiz with shuffled questions.
- **How to verify:** Click **Play Again** and confirm the quiz restarts from question 1 in a new order.

### R12: Responsive Layout

- Keep the quiz playable on phone screens with touch-friendly answer buttons.
- **How to verify:** Narrow the browser window and confirm the answer buttons remain easy to read and tap.

### R13: Image Questions

- Show one coffee image for each of the six questions and ask the player to identify it from four text choices.
- Give the image useful alternative text and keep it fully visible on phone and desktop screens.
- **How to verify:** Complete all six questions and confirm each matching coffee image loads and can be answered using one of four choices.

## Demo Script

1. Open the page and point out the saved personal best on the welcome screen.
2. Start the quiz and show the current question number, total, and progress bar.
3. Select a wrong answer and show the red incorrect feedback, highlighted correct answer, and brief pause before the next question.
4. Answer the remaining questions and show progress updating after each answer.
5. Complete the quiz and review the final score, percentage, question-by-question results, and color-coded performance message.
6. Refresh the page and confirm the personal best remains saved.
7. Click **Play Again** and confirm the quiz restarts at question 1 with shuffled questions.
8. Narrow the browser window and confirm the layout and answer buttons remain easy to use.
9. Find the image question and identify the pictured object from its four choices.

## Verification Report

| Requirement | Status | Evidence |
|-------------|--------|----------|
| R1 | PASS | Browser inspection found six hardcoded coffee-identification questions, each with four choices and one valid correct answer, while only one question was visible at a time. |
| R2 | PASS | Selecting one answer disabled all four choices and recorded the selection, preventing a second answer on the same question. |
| R3 | PASS | The active question displayed the required current-status message with a yellow dot using `rgb(242, 189, 46)`. |
| R4 | PASS | A correct selection displayed "Correct - great job!" in green using `rgb(22, 131, 75)`. |
| R5 | PASS | A wrong selection displayed "Incorrect - wrong answer selected" in red using `rgb(199, 62, 62)`. |
| R6 | PASS | A correct answer increased the visible score from 0 to 1, wrong answers left it unchanged, and the final score appeared in results. |
| R7 | PASS | The quiz started at "Question 1 of 6" and advanced the question count and progress bar to question 2 after answering. |
| R8 | PASS | A wrong answer highlighted the correct choice, named it in the feedback, and advanced automatically after a measured 1.95-second pause. |
| R9 | PASS | A controlled 3/6 run showed 50%, yellow "Good effort!", and six detailed rows split into three correct and three incorrect results. |
| R10 | PASS | Completing the quiz stored a best score of 3 and refreshing the page restored "3 of 6" on the welcome screen. |
| R11 | PASS | Play Again reset the score to 0 and progress to question 1, enabled all answers, and produced a different six-question order. |
| R12 | PASS | At 320px, welcome and quiz screens had no horizontal overflow, answer buttons were 64px tall, and the Start button was 48px tall. |
| R13 | PASS | All six local coffee images loaded with useful alternative text, matched the supplied answer key, and produced a verified score of 6/6. |
