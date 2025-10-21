// app.js — main file
const { add, multiply } = require("./math");
const { toTitle, countVowels } = require("./string");
const { nowISO, daysBetween } = require("./date");
const { logInfo, logError } = require("./logger");

try {
  logInfo("Application started");

  // 1) Use math module
  const a = 7, b = 5;
  const sum = add(a, b);
  const prod = multiply(a, b);

  // 2) Use string module
  const rawName = "oak soe zaw";
  const titled = toTitle(rawName);
  const vowels = countVowels(rawName);

  // 3) Use date module
  const today = nowISO();
  const diff = daysBetween("2025-01-01", new Date());

  // Print results as “evidence”
  console.log("=== RESULTS ===");
  console.log(`Sum(${a}, ${b}) =`, sum);
  console.log(`Multiply(${a}, ${b}) =`, prod);
  console.log(`Title Case("${rawName}") =`, titled);
  console.log(`Vowel Count("${rawName}") =`, vowels);
  console.log(`Now ISO =`, today);
  console.log(`Days since 2025-01-01 =`, diff);

  logInfo("Application finished successfully");
} catch (err) {
  logError(err.message || String(err));
  process.exit(1);
}
