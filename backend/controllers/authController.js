const AdminUser = require("../models/AdminUser");
const Customer = require("../models/Customer");
const Engineer = require("../models/Engineer");
const { createAuthToken } = require("../middleware/auth");
const { verifyPassword } = require("../utils/security");

const roleModels = {
  ADMIN: AdminUser,
  ENGINEER: Engineer,
  CUSTOMER: Customer
};

function publicUser(user, role) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role
  };
}

async function login(req, res, next) {
  console.log("LOGIN REQUEST:", req.body);
  try {
    const role = String(req.body.role || "").toUpperCase();
    const email = String(req.body.email || "").toLowerCase().trim();
    const password = String(req.body.password || "");

    if (!roleModels[role]) {
      return res.status(400).json({ message: "Valid role is required" });
    }

    const user = await roleModels[role].findOne({ email, active: { $ne: false } });
    if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      token: createAuthToken(user, role),
      user: publicUser(user, role)
    });
  } catch (error) {
    return next(error);
  }
}

async function me(req, res) {
  return res.json({ user: req.auth });
}

module.exports = {
  login,
  me
};
