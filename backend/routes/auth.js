const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
require("dotenv").config();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType: userType || "user",
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    //
    res.json({
      token,
      user: {
        id: user._id.toString(), 
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
      message: "Login successful ",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error " });
  }
});

module.exports = router;
