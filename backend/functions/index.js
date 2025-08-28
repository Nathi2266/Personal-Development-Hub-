const functions = require("firebase-functions");

// Triggers
const { milestoneCompleted } = require("./triggers/milestoneTriggers");
const { goalUpdated } = require("./triggers/goalTriggers");

// Schedulers
const { checkAlerts } = require("./schedulers/alertsScheduler");

// Exports
exports.milestoneCompleted = milestoneCompleted;
exports.goalUpdated = goalUpdated;
exports.checkAlerts = checkAlerts;
