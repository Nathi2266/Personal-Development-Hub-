const { db, admin } = require("../config/firebase");

async function createAlert(userId, goalId, type, message) {
  await db.collection("alerts").add({
    userId,
    goalId,
    type,
    message,
    status: "new",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
}

module.exports = { createAlert };
