const { db, admin } = require("../config/firebase");

async function updateSeasonProgress(seasonId, userId, points) {
  const seasonRef = db.collection("seasons").doc(seasonId);
  await seasonRef.update({
    [`teamProgress.${userId}`]: admin.firestore.FieldValue.increment(points)
  });
}

module.exports = { updateSeasonProgress };
