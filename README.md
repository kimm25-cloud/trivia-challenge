# Team Trivia Challenge

A browser-based coffee trivia prototype with live scores and public shared question editing.

## Local preview

Open `app/index.html` directly in a browser. Scores and edited questions remain in that browser while running locally or on GitHub Pages.

## Azure Static Web Apps deployment

Create an Azure Static Web App connected to the `main` branch of this repository with these build settings:

- App location: `app`
- API location: `api`
- Output location: leave empty

Create a standard Azure Storage account that supports Tables and Blobs. In the Static Web App, add an environment variable named `SCORE_STORAGE_CONNECTION_STRING` containing that storage account's connection string, then rerun the deployment workflow.

The Azure deployment uses:

- Azure Table Storage for live scores and question metadata.
- Azure Blob Storage for uploaded question pictures.
- Anonymous `/api/scores` and `/api/questions` endpoints.

Anyone with the Azure site link can open the host editor and replace the shared question set. This public editing behavior is intentional for the prototype.

## Verification

1. Open the Azure site and confirm `/api/scores` returns a JSON score list.
2. Change a question in the host editor and save it.
3. Open the Azure site in a private window or another browser.
4. Confirm the changed question and picture appear there.
