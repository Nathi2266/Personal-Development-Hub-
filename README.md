# Backend Project Documentation

This document outlines the structure, purpose, setup, and execution of the backend services for the Personal Development Hub. The backend is primarily built using Firebase Functions, Firestore, and Cloud Storage, providing a serverless architecture for handling application logic, data storage, and file management.

## 1. Project Overview

The backend is responsible for:
*   **Firebase Functions**: Hosting server-side logic, including HTTP endpoints, background triggers for Firestore events, and scheduled tasks.
*   **Firestore**: Storing application data such as user profiles, goals, milestones, alerts, and gamification data.
*   **Firebase Storage**: Managing user-uploaded content (though not explicitly used in the provided code, it's configured for future use).

## 2. Directory Structure

The `functions` directory contains all the Firebase Cloud Functions code:

```
─ functions/                       # Firebase Functions folder
│   ├── index.js                     # Main entry point, exports all functions
│   ├── config/
│   │   └── firebase.js              # Firebase Admin init
│   ├── services/                    # Core logic services
│   │   ├── alertsService.js         # Goal alerts logic
│   │   ├── gamificationService.js   # Points, badges, streaks
│   │   ├── auditService.js          # Timeline logging
│   │   ├── managerService.js        # Manager actions & approvals
│   │   └── seasonService.js         # Season progress updates
│   ├── triggers/                    # Firestore triggers
│   │   ├── milestoneTriggers.js     # Triggered on milestone updates
│   │   └── goalTriggers.js          # Triggered on goal updates
│   ├── schedulers/                  # Scheduled jobs
│   │   └── alertsScheduler.js       # Checks and creates alerts periodically
│   ├── utils/                       # Helper functions
│   │   ├── dateUtils.js             # Date manipulation utilities
│   │   ├── badgeUtils.js            # Logic for checking and assigning badges
│   │   └── pointsUtils.js           # Logic for calculating points
│   └── package.json                 # Node.js dependencies for Firebase Functions
│
├── firestore.rules                  # Firestore security rules
├── storage.rules                    # Firebase Storage rules
├── firebase.json                    # Firebase project configuration
└── README.md                        # Project documentation
```

## 3. Key Components and Their Roles

*   **`config/firebase.js`**: Initializes the Firebase Admin SDK, setting up connections to Firestore and Cloud Storage. It exports `admin`, `db` (Firestore instance), and `bucket` (Storage bucket instance) for use across all functions.
*   **`index.js`**: The main entry point for Firebase Functions. It imports and exports all individual functions (triggers and schedulers) making them deployable.
*   **`services/`**: Contains core business logic functions. These are reusable modules that encapsulate specific functionalities like gamification updates, audit logging, alert creation, and manager actions.
*   **`triggers/`**: Houses functions that respond to specific events in Firestore (e.g., a document being created, updated, or deleted).
    *   `milestoneTriggers.js`: Handles logic when a milestone's status changes.
    *   `goalTriggers.js`: Handles logic when a goal's status changes.
*   **`schedulers/`**: Contains functions that run on a predefined schedule.
    *   `alertsScheduler.js`: Periodically checks for goals that are due soon or overdue and creates alerts.
*   **`utils/`**: Provides helper functions that are commonly used across different services and functions.
    *   `dateUtils.js`: Utility functions for date calculations.
    *   `badgeUtils.js`: Logic for determining and assigning user badges.
    *   `pointsUtils.js`: Logic for calculating points.
*   **`firestore.rules`**: Defines the security rules for your Firestore database, controlling read and write access to your data.
*   **`storage.rules`**: Defines the security rules for your Firebase Cloud Storage, controlling access to your stored files.
*   **`firebase.json`**: The main configuration file for your Firebase project, linking your functions, Firestore rules, and Storage rules.
*   **`package.json`** (inside `functions`): Lists the Node.js dependencies required for your Firebase Functions.

## 4. Setup and Dependencies

To get the backend running, you'll need the following:

### Prerequisites:

*   **Node.js**: Make sure you have Node.js (version 18 or later recommended) installed. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm**: Node Package Manager, which comes with Node.js.
*   **Firebase CLI**: The Firebase Command Line Interface is essential for deploying and emulating Firebase projects.

### Installation Steps:

1.  **Install Firebase CLI globally**:
    If you haven't already, install the Firebase CLI globally on your machine:
    ```bash
    npm install -g firebase-tools
    ```
    You might need to restart your terminal after this step for the `firebase` command to be recognized.

2.  **Navigate to the functions directory**:
    Open your terminal and change to the `backend/functions` directory:
    ```bash
    cd backend/functions
    ```

3.  **Install Node.js dependencies**:
    Install the project-specific dependencies for your Firebase Functions:
    ```bash
    npm install
    ```

## 5. How to Run the Backend (Locally with Emulators)

The Firebase Emulators allow you to run and test your Firebase Functions, Firestore, and other Firebase services locally without deploying to a live project.

1.  **Ensure you are in the `backend/functions` directory**:
    ```bash
    cd backend/functions
    ```

2.  **Start the Firebase Emulators**:
    Use the `serve` script defined in `package.json` to start the functions emulator:
    ```bash
    npm run serve
    ```
    Alternatively, if `npm run serve` gives issues with `firebase` not being recognized and you found the full path to `firebase.cmd` (e.g., `C:\Users\YourUser\AppData\Roaming\npm\firebase.cmd`), you can run:
    ```bash
    "C:\Users\Nkosinathi Radebe\AppData\Roaming\npm\firebase.cmd" emulators:start --only functions
    ```

    You should see output indicating that the functions emulator is running, along with the local URLs to access your functions.

## 6. Deployment (Firebase)

To deploy your functions to a live Firebase project:

1.  **Authenticate with Firebase**:
    If you haven't already, log in to Firebase through the CLI:
    ```bash
    firebase login
    ```

2.  **Deploy your functions**:
    From the `backend/functions` directory:
    ```bash
    npm run deploy
    ```
    This command will deploy only your Firebase Functions to your connected Firebase project.
