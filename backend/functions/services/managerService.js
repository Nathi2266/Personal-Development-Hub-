const { db, admin } = require("../config/firebase");

async function acknowledgeMilestone(managerId, milestoneId) {
  const milestoneRef = db.collection("milestones").doc(milestoneId);
  await milestoneRef.update({
    acknowledgedByManager: true,
    managerId
  });
}

module.exports = { acknowledgeMilestone };
