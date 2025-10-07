// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/admin.routes.js";
import studentRouter from "./routes/student.routes.js";
import studentRoutes from "./routes/studentRoutes.js";
import studentMarksRoutes from "./routes/studentMarksRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Database connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB error:", err));

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup: allow any localhost + any deployed frontend
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (Postman or server-to-server)
    if (!origin) return callback(null, true);

    // allow localhost
    if (origin.startsWith("http://localhost")) return callback(null, true);

    // allow all https deployed frontends
    if (origin.startsWith("https://")) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/students", studentRouter);
app.use("/api/student", studentRoutes);
app.use("/api/student", studentMarksRoutes);
app.use("/api/attendance", attendanceRoutes);

// Test route to confirm backend is live
app.get("/", (req, res) => {
  res.send("✅ Backend is live and CORS is working!");
});

// Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
