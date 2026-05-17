const crypto = require("crypto");
const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

adminUserSchema.statics.hashPassword = function hashPassword(password) {
  return crypto.createHash("sha256").update(`${process.env.PASSWORD_PEPPER || "yellow-ochre"}:${password}`).digest("hex");
};

adminUserSchema.methods.verifyPassword = function verifyPassword(password) {
  return this.passwordHash === this.constructor.hashPassword(password);
};

module.exports = mongoose.model("AdminUser", adminUserSchema);
