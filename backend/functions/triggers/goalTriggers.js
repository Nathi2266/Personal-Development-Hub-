const { logAudit } = require("../services/auditService");

exports.goalUpdated = async (change, context) => {
  const before = change.before.data();
  const after = change.after.data();

  if (before.status !== after.status) {
    await logAudit(after.userId, after.id, `goalStatusChanged:${after.status}`);
  }
};
