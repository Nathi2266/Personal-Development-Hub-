const { updateGamification } = require("../services/gamificationService");
const { logAudit } = require("../services/auditService");

exports.milestoneCompleted = async (change, context) => {
  const before = change.before.data();
  const after = change.after.data();

  if (before.status !== "completed" && after.status === "completed") {
    await updateGamification(after.userId, after.id);
    await logAudit(after.userId, after.goalId, "milestoneCompleted");
  }
};
