// Badge helper functions

function checkBadges(user) {
  const badges = [];
  if (!user.badges.includes("First Milestone")) badges.push("First Milestone");
  if (user.streak >= 5) badges.push("5 Week Streak");
  return badges;
}

module.exports = { checkBadges };
