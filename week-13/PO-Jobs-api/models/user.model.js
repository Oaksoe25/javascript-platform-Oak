const db = require("../config/db.js");

exports.findByEmail = (email, cb) => {
  db.query("SELECT * FROM users WHERE email=?", [email], cb);
};

exports.create = (data, cb) => {
  db.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    data,
    cb
  );
};
