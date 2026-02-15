const Complaint = require("../models/Complaint");

exports.adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;
    
    if (!adminId || !password) {
      return res.status(400).json({
        success: false,
        message: "Admin ID and Password are required"
      });
    }

    // Hardcoded credentials (for hackathon demo)
    const validAdminId = "admin123";
    const validPassword = "password123";

    if (adminId !== validAdminId || password !== validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

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
    const { status, rollNo } = req.query;

    let filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (rollNo) {
      filter.rollNo = { $regex: rollNo, $options: "i" };
    }

    const complaints = await Complaint.find(filter)
      .sort({ createdAt: -1 });

    const formatted = complaints.map(c => ({
      id: c._id,
      title: c.title,
      studentName: c.studentName,
      rollNo: c.rollNo,
      category: c.category,
      status: c.status,
      date: c.createdAt
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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

// Stuent Login (Optional - for future authentication implementation)

exports.studentLogin = async (req, res) => {
  try {
    const { rollNo, dob, mobile } = req.body;

    if (!rollNo || !dob || !mobile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Basic validation
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be 10 digits"
      });
    }

    // Demo mode login (since no student DB exists)
    // In real system, you would check DB here

    res.status(200).json({
      success: true,
      message: "Login successful",
      student: {
        rollNo,
        studentName: "Student " + rollNo.slice(-3) // temporary mock
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
