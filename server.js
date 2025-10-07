//server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/admin.routes.js";
import studentRouter from "./routes/student.routes.js";
import studentRoutes from "./routes/studentRoutes.js";
import studentMarksRoutes from "./routes/studentMarksRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// Database connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB error:", err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins, // frontend
  credentials: true
}));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin",adminRouter);
app.use("/api/students",studentRouter);
app.use("/api/student",studentRoutes);
app.use("/api/student",studentMarksRoutes);
app.use("/api/attendance", attendanceRoutes);

// Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
