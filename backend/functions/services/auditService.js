const { db, admin } = require("../config/firebase");

async function logAudit(userId, goalId, actionType) {
  await db.collection("timeline").add({
    userId,
    goalId,
    actionType,
    details: `${actionType} triggered`,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
}

module.exports = { logAudit };
