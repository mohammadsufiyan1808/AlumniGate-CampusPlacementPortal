import express from "express";
import Companies from "../models/company.js";
import Students from "../models/student.js";
import Applications from "../models/application.js";
import verifyToken from "../../middlewares/verifyToken.js";
const router = express.Router();

router.get("/companies", async (req, res) => {
  try {
    const companies = await Companies.find({});
    res.json(companies);
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//----------- Sending Companies For You Data ---------

router.get("/companies-for-you/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Students.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const allCompanies = await Companies.find();

    // Student details
    const { branch, cgpa, backlogs, no_of_internships, sector } = student;

    // Get all applications of this student
    const appliedApplications = await Applications.find({ studentId });
    const appliedCompanyIds = appliedApplications.map(a => a.companyId.toString());

    // Filter companies based on eligibility
    const today = new Date();
    const filtered = allCompanies.filter(c => {
      const eligibleBranch = c.eligibility.branches.includes(branch);
      const cgpaOk = parseFloat(cgpa) >= c.eligibility.min_gpa;
      const backlogOk = parseInt(backlogs) <= c.eligibility.max_backlogs;
      const internOk = parseInt(no_of_internships) >= c.eligibility.min_internships;
      //const sectorOk = sector ? c.job_role.toLowerCase().includes(sector.toLowerCase()) : true;
      const deadlineOk = new Date(c.deadline) >= today;

      return eligibleBranch && cgpaOk && backlogOk && internOk && deadlineOk;
    });

    // Tag applied status
    const companiesWithStatus = filtered.map(c => ({
      ...c._doc,
      applied: appliedCompanyIds.includes(c._id.toString()),
    }));

    // Sort: applied companies first
    const sortedCompanies = [
      ...companiesWithStatus.filter(c => c.applied),
      ...companiesWithStatus.filter(c => !c.applied),
    ];

    res.json(sortedCompanies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
