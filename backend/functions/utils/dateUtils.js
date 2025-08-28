// Date helper functions

function daysBetween(date1, date2) {
  return Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
}

module.exports = { daysBetween };
