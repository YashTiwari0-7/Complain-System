const Complaint = require("../models/Complaint");

// Submit Complaint

exports.submitComplaint = async (req, res) => {
    console.log("Incoming Body:", req.body);
  try {
    const { title, studentName, rollNo, category, description } = req.body;

    if (!title || !studentName || !rollNo || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const complaint = await Complaint.create({
      title,
      studentName,
      rollNo,
      category,
      description
    });

    res.status(201).json({
      success: true,
      data: complaint
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// Get All Complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    const formatted = complaints.map(c => ({
      id: c._id,
      title: c.title,
      studentName: c.studentName,
      rollNo: c.rollNo,
      category: c.category,
      status: c.status,
      date: c.createdAt
    }));

    res.status(200).json(formatted);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// Update Complaint Status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({
      success: true,
      data: complaint
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Admin Stats

exports.getAdminStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });

    res.json({
      total,
      pending,
      inProgress,
      resolved
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
