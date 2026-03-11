const mongoose = require('mongoose');

// Define the Mongoose schema
const courseSchema = new mongoose.Schema({
  courseCode: { type: String, unique: true },
  concept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Concept",
    required: true,
  },
  conceptName: { type: String, required: true },
  courseFee: { type: String, required: true },
  courseName: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  vipPercentage: { type: String, required: true },
  companyCommissionPercentage: { type: Number, require: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
});



module.exports = mongoose.model('Course', courseSchema);
