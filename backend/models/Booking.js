const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    publicId: { type: String, unique: true, index: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    issueType: { type: String, required: true, index: true },
    postcode: { type: String, required: true, trim: true },
    urgency: { type: String, enum: ["Emergency", "Today", "Tomorrow", "This week", "Flexible"], default: "Flexible", index: true },
    preference: { type: String, enum: ["Call-back", "Book engineer", "Text first"], default: "Call-back" },
    answers: { type: Map, of: String, default: {} },
    mediaNote: String,
    status: { type: String, default: "Request received", index: true },
    source: { type: String, default: "pwa" },
    safetyFlag: { type: Boolean, default: false }
  },
  { timestamps: true }
);

bookingSchema.pre("save", function setPublicId(next) {
  if (!this.publicId) {
    this.publicId = `YOG-${Math.floor(100000 + Math.random() * 900000)}`;
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
