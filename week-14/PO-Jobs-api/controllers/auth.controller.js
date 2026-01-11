const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = await User.findByEmail(email);

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "SECRET",
    { expiresIn: "1h" }
  );

  res.json({ token });
};

exports.register = async (req, res) => {
  res.status(201).json({ message: "User registered" });
};
