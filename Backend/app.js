import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/auth.js";
import companyRoutes from "./src/routes/companies.js";
import applicationRoutes from "./src/routes/applications.js";
import profileRoutes from "./src/routes/profile.js";
import eligibilityRoutes from "./src/routes/eligibility.js";

import adminStudentRoute from "./src/AdminRoutes/studentRoute.js";
import adminCompanyRoute from "./src/AdminRoutes/companyRoute.js";
import evaluateResultsRoute from "./src/AdminRoutes/evaluateResultsRoute.js";
import adminLoginRoute from "./src/AdminRoutes/login.js";
import adminDetails from "./src/AdminRoutes/adminDetails.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, 
  })
);

app.use(express.json()); // for JSON request body
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = process.env.MONGODB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("working");
});

// Student Page routes
app.use("/api/auth", authRoutes);
app.use("/api", companyRoutes);
app.use("/api", applicationRoutes);
app.use("/api", profileRoutes);
app.use("/api", eligibilityRoutes);

//admin routes
app.use("/api/admin" , adminLoginRoute);
app.use("/api/admin" , adminDetails);
app.use("/api/admin" , evaluateResultsRoute);
app.use("/api/admin/student" , adminStudentRoute);
app.use("/api/admin/company", adminCompanyRoute);


app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});


app.listen(8080, () => {
  console.log("port listening");
});
