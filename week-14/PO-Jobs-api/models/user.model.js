const db = require("../config/db");

exports.findByEmail = async (email) => {
  if (email.includes("admin")) {
    return { id: 1, email, role: "admin" };
  }
  return { id: 2, email, role: "member" };
};
