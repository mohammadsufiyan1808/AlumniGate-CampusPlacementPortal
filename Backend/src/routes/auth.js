import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Students from "../models/student.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const router = express.Router();

//api for login
router.post("/login", async (req, res) => {
  try {
    const { rollno, password } = req.body;
    const student = await Students.findOne({ rollno });

    if (!student) {
      return res
        .status(400)
        .json({ message: "Invalid Roll Number or Password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Roll Number or Password" });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .json({ message: "Login successful", token, student });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

//  Forgot Password (send reset link)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Students.findOne({ email });
    if (!student) {
      return res
        .status(400)
        .json({ message: "No account found with this email" });
    }

    // generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    student.resetPasswordToken = resetToken;
    student.resetPasswordExpire = resetExpire;
    await student.save();

    // reset URL (frontend link jaha user reset karega)
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(
      student.email,
      "Password Reset Request",
      `You requested a password reset. Click here to reset: ${resetUrl}`
    );

    res.status(200).json({
      message: "Password reset link generated",
      resetUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const student = await Students.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: { $gt: Date.now() }, // token abhi valid hai
    });

    if (!student) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    //  Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    student.password = hashedPassword; // plain (later bcrypt use karenge)
    student.resetPasswordToken = undefined;
    student.resetPasswordExpire = undefined;

    await student.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
