const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    engineer: { type: mongoose.Schema.Types.ObjectId, ref: "Engineer" },
    scheduledAt: Date,
    status: { type: String, default: "Unassigned", index: true },
    notes: [
      {
        body: String,
        createdBy: String,
        createdAt: { type: Date, default: Date.now }
      }
    ],
    photos: [
      {
        url: String,
        caption: String,
        uploadedAt: { type: Date, default: Date.now }
      }
    ],
    completedAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
