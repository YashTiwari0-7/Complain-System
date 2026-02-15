const express = require("express");
const router = express.Router();

const {
  submitComplaint,
  getAllComplaints,
  updateStatus
} = require("../controllers/complaintController");
const { getAdminStats } = require("../controllers/complaintController");
const { adminLogin } = require("../controllers/complaintController");
const { studentLogin } = require("../controllers/complaintController");

// POST → Submit Complaint
router.post("/submit-complaint", submitComplaint);
router.post("/admin-login", adminLogin);
router.post("/student-login", studentLogin);

// GET → Get All Complaints (Optional filter: ?category=Technical)
router.get("/complaints", getAllComplaints);
router.get("/admin/stats", getAdminStats);
// PUT → Update Complaint Status
router.put("/update-status/:id", updateStatus);





module.exports = router;
