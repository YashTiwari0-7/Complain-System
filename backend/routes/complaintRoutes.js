const express = require("express");
const router = express.Router();

const {
  submitComplaint,
  getAllComplaints,
  updateStatus
} = require("../controllers/complaintController");
const { getAdminStats } = require("../controllers/complaintController");

// POST → Submit Complaint
router.post("/submit-complaint", submitComplaint);

// GET → Get All Complaints (Optional filter: ?category=Technical)
router.get("/complaints", getAllComplaints);
router.get("/admin/stats", getAdminStats);
// PUT → Update Complaint Status
router.put("/update-status/:id", updateStatus);





module.exports = router;
