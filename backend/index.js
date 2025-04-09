require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const db = require("./db");
const authRoutes = require("./routes/auth");

const app = express();

// 🔒 Security Middlewares
app.use(helmet()); // Secure headers
app.use(cors()); // Allow cross-origin requests
app.use(compression()); // Compress responses
app.use(morgan("dev")); // Logging
app.use("/api/auth", authRoutes);

// 🚀 Rate Limiting (Prevents Brute Force Attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// 🔥 Parse JSON Requests
app.use(express.json());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🌿 OrganicSikkim API is running securely!");
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
