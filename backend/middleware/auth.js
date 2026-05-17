const crypto = require("crypto");

const sessions = new Map();

function createSession(adminUser) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, {
    adminId: adminUser._id.toString(),
    email: adminUser.email,
    role: adminUser.role,
    createdAt: Date.now()
  });
  return token;
}

function requireAdmin(req, res, next) {
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const session = sessions.get(token);

  if (!session) {
    return res.status(401).json({ message: "Admin authentication required" });
  }

  req.admin = session;
  return next();
}

module.exports = {
  createSession,
  requireAdmin
};
