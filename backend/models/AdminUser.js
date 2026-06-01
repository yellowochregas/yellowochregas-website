const mongoose = require("mongoose");
const security = require("../utils/security");

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
  return security.hashPassword(password);
};

adminUserSchema.methods.verifyPassword = function verifyPassword(password) {
  return security.verifyPassword(password, this.passwordHash);
};

module.exports = mongoose.model("AdminUser", adminUserSchema);
