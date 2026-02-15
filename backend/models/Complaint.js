const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return /^[A-Za-z\s]+$/.test(value);
    },
    message: "Student name should only contain letters and spaces"
      }
    },

    rollNo: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Hostel",
        "Lab",
        "Faculty",
        "Campus",
        "Canteen",
        "Classroom",
        "Management Work",
        "Other"
      ]
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
