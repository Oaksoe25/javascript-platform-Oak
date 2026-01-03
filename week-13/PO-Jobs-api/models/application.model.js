const db = require("../config/db.js");

exports.apply = (userId, jobId, cb) => {
  db.query(
    "INSERT INTO applications (user_id, job_id) VALUES (?,?)",
    [userId, jobId],
    cb
  );
};
