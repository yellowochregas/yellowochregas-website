const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    plainEnglishSummary: String,
    emergencyEligible: { type: Boolean, default: false },
    safetyNotes: [String],
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
