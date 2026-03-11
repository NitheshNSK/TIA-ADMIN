const mongoose = require('mongoose');

// Define the Mongoose schema
const conceptSchema = new mongoose.Schema({
  conceptName: { type: String, required: true ,unique: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  conceptCode: { type: String, required: true ,unique: true  },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });




module.exports = mongoose.model('Concept', conceptSchema);
