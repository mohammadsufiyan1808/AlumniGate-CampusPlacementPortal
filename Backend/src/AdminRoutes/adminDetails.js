import express from "express";
import Admin from "../models/admin.js";
import verifyAdminToken from "../../middlewares/verifyAdminToken.js";
const router = express.Router();


// Get current admin details
router.get("/me", verifyAdminToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        // Add other admin fields you need
      },
    });
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;