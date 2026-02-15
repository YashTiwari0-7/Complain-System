const mongoose = require("mongoose");

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status value
    const allowedStatus = ["Pending", "In Progress", "Resolved"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid complaint ID"
      });
    }

    // Atomic update
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,           // return updated document
        runValidators: true  // enforce schema validation
      }
    );

    if (!updatedComplaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedComplaint
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
