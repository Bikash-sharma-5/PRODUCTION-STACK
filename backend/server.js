const express = require("express");
require("dotenv").config();
const db = require("./db");

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// Register user
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId
    });
  });
});

// Get all users
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
