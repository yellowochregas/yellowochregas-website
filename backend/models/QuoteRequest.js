const mongoose = require("mongoose");

const quoteRequestSchema = new mongoose.Schema(
  {
    publicId: { type: String, unique: true, index: true },
    quoteType: { type: String, enum: ["boiler", "bathroom"], required: true, index: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true, index: true }
    },
    postcode: { type: String, required: true, index: true },
    address: { type: String, required: true },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
    emergencyFlag: { type: Boolean, default: false, index: true },
    status: { type: String, default: "New quote request", index: true },
    consent: { type: Boolean, required: true },
    uploads: [
      {
        url: String,
        label: String,
        uploadedAt: { type: Date, default: Date.now }
      }
    ],
    notificationStatus: {
      email: { type: String, default: "queued" },
      whatsapp: { type: String, default: "queued" }
    },
    assignedEngineer: { type: mongoose.Schema.Types.ObjectId, ref: "Engineer" },
    crmSyncedAt: Date
  },
  { timestamps: true }
);

quoteRequestSchema.pre("save", function setPublicId(next) {
  if (!this.publicId) {
    this.publicId = `YOG-Q-${Math.floor(100000 + Math.random() * 900000)}`;
  }
  next();
});

module.exports = mongoose.model("QuoteRequest", quoteRequestSchema);
