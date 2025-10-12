import mongoose from "mongoose";
import companies from "./companies.js";
import students from "./students.js";
import Company from "../src/models/company.js";
import Student from "../src/models/student.js";
import Admin from "../src/models/admin.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

/* const initDBCompanies = async () => {
  try {
    await Company.deleteMany({});
    await Company.insertMany(companies);
    console.log("Companies data inserted successfully");
  } catch (err) {
    console.error("Error inserting companies:", err);
  }
};

const initDBStudents = async () => {
  try {
    await Student.deleteMany({});

    // hash passwords before inserting
    const studentsWithHashedPwds = await Promise.all(
      students.map(async (student) => {
        const hashedPwd = await bcrypt.hash(student.password, 10);
        return { ...student, password: hashedPwd };
      })
    );

    await Student.insertMany(studentsWithHashedPwds);
    console.log("Students data inserted");
  } catch (err) {
    console.error("Error inserting students:", err);
  }
}; */

const initAdmin = async () => {
  try {
    await Admin.deleteMany({});

    const email = "thealumnigate@gmail.com";
    const Password = "thealumnigate@massmutual";

    await Admin.create({
      email,
      password: Password,
    });

    console.log("🛡 Admin account created successfully");
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
};

const seed = async () => {
  await connectDB();
  //await initDBCompanies();
  //await initDBStudents();
  await initAdmin();
  console.log("Database seeding completed!");
  process.exit();
};

seed();
