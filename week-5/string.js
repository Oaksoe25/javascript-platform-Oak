// string.js — module 2
function toTitle(str) {
  return String(str)
    .toLowerCase()
    .split(/\s+/)
    .map(w => w ? w[0].toUpperCase() + w.slice(1) : "")
    .join(" ");
}
function countVowels(str) {
  return (str.match(/[aeiou]/gi) || []).length;
}
module.exports = { toTitle, countVowels };
