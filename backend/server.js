require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const complaintRoutes = require("./routes/complaintRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", complaintRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/campus-complaints")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));


// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port  http://localhost:${PORT}`);
});
