const mysql = require("mysql2/promise");
require("dotenv").config();

// Secure MySQL Connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection()
  .then(() => console.log("✅ Connected to Secure MySQL Database!"))
  .catch((err) => console.error("❌ Database Connection Error:", err.message));

module.exports = db;
