const mongoose = require("mongoose");

const engineerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    gasSafeNumber: String,
    skills: [String],
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Engineer", engineerSchema);
