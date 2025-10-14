import express from "express";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Check if admin email exists
router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || email.trim().length === 0) {
      return res.status(400).json({ exists: false, message: "Email is required" });
    }

    const admin = await Admin.findOne({ email: email.trim() });
    
    if (!admin) {
      return res.status(404).json({ exists: false, message: "Email not found" });
    }

    return res.status(200).json({ exists: true, message: "Email found" });
  } catch (err) {
    console.error("Error checking admin email:", err);
    return res.status(500).json({ exists: false, message: "Server error" });
  }
});

// POST /api/admin/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2️⃣ Compare hashed passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Generate JWT token (valid for 7 days)
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Send response
    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
