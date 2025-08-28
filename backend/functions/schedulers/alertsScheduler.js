const functions = require("firebase-functions");
const { db } = require("../config/firebase");
const { createAlert } = require("../services/alertsService");

exports.checkAlerts = functions.pubsub.schedule("every 24 hours").onRun(async () => {
  const today = new Date();
  const goalsSnapshot = await db.collection("goals").get();

  for (const doc of goalsSnapshot.docs) {
    const goal = doc.data();
    const dueDate = new Date(goal.dueDate);

    // Due Soon
    if ((dueDate - today) / (1000 * 60 * 60 * 24) <= goal.effortWeeks * 7) {
      await createAlert(goal.userId, doc.id, "dueSoon", `Goal "${goal.title}" is approaching!`);
    }

    // Overdue
    if (today > dueDate && goal.status !== "completed") {
      await createAlert(goal.userId, doc.id, "overdue", `Goal "${goal.title}" is overdue!`);
    }
  }
});
