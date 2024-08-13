const User = require("../models/user-model");
const bcrypt = require("bcrypt");

home = (req, res) => {
  try {
    res.status(200).send("Hello World");
  } catch (err) {
    console.log(err);
  }
};

createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists!" });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists!" });
      }
    }

    const newUser = await User.create(req.body);
    const token = await newUser.generateToken();

    res.status(201).json({
      message: "registration successful",
      userId: newUser._id.toString(),
      token,
    });
  } catch (err) {
    console.error("Failed to create user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await existingUser.camparePassword(password);

    if (passwordMatch) {
      const token = await existingUser.generateToken();

      res.status(200).json({
        message: "Login successful",
        userId: existingUser._id.toString(),
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, createUser, loginUser };
