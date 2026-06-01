const { signToken, verifyToken } = require("../utils/security");

function createAuthToken(user, role) {
  return signToken({
    sub: user._id.toString(),
    role,
    email: user.email,
    name: user.name
  });
}

function readBearer(req) {
  const header = req.get("authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

function requireAuth(req, res, next) {
  const token = readBearer(req);
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ message: "Authentication required" });
  }

  req.auth = {
    userId: payload.sub,
    role: payload.role,
    email: payload.email,
    name: payload.name
  };
  return next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.auth) {
      return requireAuth(req, res, () => requireRole(...roles)(req, res, next));
    }

    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({ message: "You do not have permission to access this resource" });
    }

    return next();
  };
}

function requireAdmin(req, res, next) {
  return requireRole("ADMIN")(req, res, next);
}

module.exports = {
  createAuthToken,
  requireAdmin,
  requireAuth,
  requireRole
};
