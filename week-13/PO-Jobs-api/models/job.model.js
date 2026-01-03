const db = require("../config/db.js");

exports.getAll = cb => db.query("SELECT id,title FROM jobs", cb);
exports.getById = (id, cb) =>
  db.query("SELECT * FROM jobs WHERE id=?", [id], cb);
exports.create = (data, cb) =>
  db.query("INSERT INTO jobs SET ?", data, cb);
