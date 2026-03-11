const mongoose = require('mongoose');


// Define the Mongoose schema
const branchSchema = new mongoose.Schema(
  {
    branchCode: { type: String, required: true, unique: true },
    branchName: { type: String, required: true, unique: true },
    branchOwnerEmail: { type: String, require: true, unique: true },
    concept: { type: [String], default: [] },
    addressName: { type: String, required: true },
    area: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: Number, required: true },
    location: { type: String, required: true }, // Assuming location is a string containing a link
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },

  },
  { timestamps: true }
);



// Compile models from schema

module.exports =  mongoose.model('Branch', branchSchema);
