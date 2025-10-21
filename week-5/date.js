// date.js — module 3
function nowISO() {
  return new Date().toISOString();
}
function daysBetween(a, b) {
  const ms = Math.abs(new Date(b) - new Date(a));
  return Math.round(ms / (1000 * 60 * 60 * 24));
}
module.exports = { nowISO, daysBetween };
