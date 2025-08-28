const { db, admin } = require("../config/firebase");
const { checkBadges } = require("../utils/badgeUtils");

async function updateGamification(userId, milestoneId) {
  const userRef = db.collection("users").doc(userId);
  const user = (await userRef.get()).data();

  await userRef.update({ points: admin.firestore.FieldValue.increment(50) });
  await userRef.update({ streak: admin.firestore.FieldValue.increment(1) });

  // Check and assign badges
  const badgesToAdd = checkBadges(user);
  if (badgesToAdd.length) {
    await userRef.update({
      badges: admin.firestore.FieldValue.arrayUnion(...badgesToAdd),
    });
  }
}

module.exports = { updateGamification };
