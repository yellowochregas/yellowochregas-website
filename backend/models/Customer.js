const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    email: { type: String, trim: true, lowercase: true },
    accessibilityNotes: String,
    properties: [
      {
        addressLine1: String,
        town: String,
        postcode: String,
        propertyType: String,
        accessNotes: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
