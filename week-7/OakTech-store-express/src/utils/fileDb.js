const path = require('path');
const fs = require('fs');
const dataDir = path.join(__dirname, '../../data'); // from src/utils → src/data

function readJson(name) {
  const fp = path.join(dataDir, name);
  if (!fs.existsSync(fp)) return [];
  return JSON.parse(fs.readFileSync(fp, 'utf8') || '[]');
}
function writeJson(name, data) {
  const fp = path.join(dataDir, name);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
}
module.exports = { readJson, writeJson };
