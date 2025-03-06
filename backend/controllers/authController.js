const bcrypt = require("bcryptjs");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const passwordHash = await argon2.hash(password);

    User.create(email, passwordHash, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error registering user" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error hashing password" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];

    const isPasswordValid = await argon2.verify(user.password_hash, password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  });
};

module.exports = { register, login };
