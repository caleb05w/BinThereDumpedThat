const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ error: "Email already linked to an account" });
    }

    const user = await User.create({ email, password });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ error: "You don't have an account. Please sign up." });
  }

  const isMatch = await user.matchPassword(password);

  if (isMatch) {
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });
    return res.status(200).json({ message: "Login successful", token });
  }

  return res
    .status(401)
    .json({ error: "The password is incorrect. Please try again." });
});

router.get("/profile", protect, async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id);
    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(userProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = router;
