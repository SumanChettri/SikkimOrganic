import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

// Multer Storage Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register User
router.post("/register", upload.single("profileImage"), async (req, res) => {
  const { name, email, password, phone, address, pincode } = req.body;
  const profileImage = req.file ? req.file.buffer.toString("base64") : null;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      pincode,
      profileImage,
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        pincode: newUser.pincode,
        profileImage: profileImage ? `data:image/png;base64,${profileImage}` : null,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid password" });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        pincode: user.pincode,
        profileImage: user.profileImage ? `data:image/png;base64,${user.profileImage}` : null,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

export default router;
