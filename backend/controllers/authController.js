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

// async function login(req, res, next) {
//   console.log("LOGIN REQUEST:", req.body);
//   try {
//     const role = String(req.body.role || "").toUpperCase();
//     const email = String(req.body.email || "").toLowerCase().trim();
//     const password = String(req.body.password || "");

//     if (!roleModels[role]) {
//       return res.status(400).json({ message: "Valid role is required" });
//     }

//     const user = await roleModels[role].findOne({ email, active: { $ne: false } });
//     if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     return res.json({
//       token: createAuthToken(user, role),
//       user: publicUser(user, role)
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     return next(error);
//   }
// }

// TEMPORARY DEBUG VERSION
async function login(req, res, next) {
  console.log("LOGIN REQUEST:", req.body);
  
  try {
    const role = String(req.body.role || "").toUpperCase();
    const email = String(req.body.email || "").toLowerCase().trim();
    const password = String(req.body.password || "");

    console.log("STEP 1: role =", role);

    if (!roleModels[role]) {
      return res.status(400).json({ message: "Valid role is required" });
    }

    console.log("STEP 2: about to query DB");
    const user = await roleModels[role].findOne({ email, active: { $ne: false } });
    console.log("STEP 3: user found =", !!user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials - no user" });
    }

    console.log("STEP 4: about to verify password");
    let passwordValid;
    try {
      passwordValid = verifyPassword(password, user.passwordHash);
      console.log("STEP 5: password valid =", passwordValid);
    } catch (pwError) {
      console.log("PASSWORD ERROR:", pwError.message);
      return res.status(500).json({ message: "Password verification error", error: pwError.message });
    }

    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid credentials - bad password" });
    }

    console.log("STEP 6: about to create token");
    let token;
    try {
      token = createAuthToken(user, role);
      console.log("STEP 7: token created");
    } catch (tokenError) {
      console.log("TOKEN ERROR:", tokenError.message);
      return res.status(500).json({ message: "Token creation error", error: tokenError.message });
    }

    return res.json({
      token,
      user: publicUser(user, role)
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message, error.stack);
    return res.status(500).json({ message: "Login error", error: error.message, stack: error.stack });
  }
}

async function me(req, res) {
  return res.json({ user: req.auth });
}

module.exports = {
  login,
  me
};
