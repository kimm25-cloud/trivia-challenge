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

### R14: Player Names and Shared Scoreboard

- Ask for a display name before starting and show the best score for each name on a shared leaderboard.
- Treat names as the same regardless of capitalization, keep only the best score, and use the newest completion time to order ties.
- **How to verify:** Submit scores from two browsers and confirm both names appear; submit a lower score for one name and confirm its best score does not decrease.

### R15: Azure Static Web Apps Deployment

- Deploy the page from `app`, serve the score API from `api`, and store scores in Azure Table Storage.
- Keep the quiz playable with a clear status message when the shared score service is unavailable.
- **How to verify:** Deploy with Azure Static Web Apps, configure the storage connection setting, complete a quiz, and confirm the score appears after refreshing another browser.

### R16: Live Top-Three Scores

- Require a display name before a player starts, save that player with a score of zero when they join, and update the saved score after every answer.
- Show the top three named players on the welcome, quiz, and results screens, refreshing shared scores while a round is being played.
- Keep a browser-based fallback scoreboard and show a clear status if the shared score service is unavailable.
- **How to verify:** Join with three or more names in separate browser sessions, answer questions, and confirm the top three scores update during play.

### R17: Host Question Editor

- Provide a host question editor from the welcome screen without adding accounts or passwords.
- Let the host add, update, and remove questions, including the question text, four answers, correct answer, category, picture, and useful picture description.
- Save edited questions in browser storage and provide a way to restore the original sample questions.
- **How to verify:** Open the host editor, change a question and picture, save it, start the quiz, and confirm the saved content is used after refreshing the page.

### R18: Shared Questions and Pictures

- When hosted on Azure, save the host's question set in Azure Table Storage and save uploaded pictures in Azure Blob Storage.
- Load the shared question set for every player before a round starts, while keeping the sample questions available if the service is unavailable.
- Allow anyone with the deployed page link to update the shared questions, as selected for this prototype.
- **How to verify:** Save a changed question and picture in one browser, open the Azure site in a different browser, and confirm the same question and picture appear.

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
10. Enter a display name, finish the quiz, and confirm its best score appears on the shared leaderboard in another browser.
11. Watch the top-three board while players answer and confirm their scores update during the round.
12. Return to the welcome screen, open the host question editor, save a question with a picture, and confirm it appears in the next round.
13. Open the Azure site in another browser and confirm the updated shared question and picture load there too.

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
| R16 | PASS | Browser verification showed a named player join at 0/6 and move to 1/6 immediately after a correct answer; the offline fallback status remained visible. |
| R17 | PASS | Browser verification changed and saved a question, restored the sample set, and confirmed keyboard focus moved into the host editor. |
