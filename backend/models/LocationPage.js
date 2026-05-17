const mongoose = require("mongoose");

const locationPageSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true },
    areaName: { type: String, required: true },
    title: String,
    intro: String,
    services: [String],
    faqs: [
      {
        question: String,
        answer: String
      }
    ],
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LocationPage", locationPageSchema);
