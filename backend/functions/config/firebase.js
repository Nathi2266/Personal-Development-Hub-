const admin = require("firebase-admin");

// Initialize Firebase Admin with your project configuration
const serviceAccount = {
  projectId: "debugthugs-37266",
  storageBucket: "debugthugs-37266.firebasestorage.app",
  databaseURL: "https://debugthugs-37266-default-rtdb.firebaseio.com"
};

// For local development, you can use application default credentials
// or set GOOGLE_APPLICATION_CREDENTIALS environment variable to a service account key file
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  ...serviceAccount
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
