const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const derived = crypto
    .scryptSync(`${process.env.PASSWORD_PEPPER || "yellow-ochre"}:${password}`, salt, 64)
    .toString("base64url");
  return `scrypt$${salt}$${derived}`;
}

function timingSafeEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function verifyPassword(password, hash) {
  if (String(hash || "").startsWith("scrypt$")) {
    const [, salt, expected] = String(hash).split("$");
    if (!salt || !expected) return false;
    const derived = crypto
      .scryptSync(`${process.env.PASSWORD_PEPPER || "yellow-ochre"}:${password}`, salt, 64)
      .toString("base64url");
    return timingSafeEqual(derived, expected);
  }

  const legacyHash = crypto
    .createHash("sha256")
    .update(`${process.env.PASSWORD_PEPPER || "yellow-ochre"}:${password}`)
    .digest("hex");
  return timingSafeEqual(legacyHash, hash);
}

function base64Url(input) {
  return Buffer.from(JSON.stringify(input)).toString("base64url");
}

function signToken(payload, expiresInSeconds = 60 * 60 * 8) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds
  };
  const unsigned = `${base64Url(header)}.${base64Url(body)}`;
  const signature = crypto
    .createHmac("sha256", process.env.JWT_SECRET || process.env.PASSWORD_PEPPER || "yellow-ochre-dev-secret")
    .update(unsigned)
    .digest("base64url");
  return `${unsigned}.${signature}`;
}

function verifyToken(token) {
  const [encodedHeader, encodedBody, signature] = String(token || "").split(".");
  if (!encodedHeader || !encodedBody || !signature) return null;
  const unsigned = `${encodedHeader}.${encodedBody}`;
  const expected = crypto
    .createHmac("sha256", process.env.JWT_SECRET || process.env.PASSWORD_PEPPER || "yellow-ochre-dev-secret")
    .update(unsigned)
    .digest("base64url");

  if (!timingSafeEqual(signature, expected)) return null;

  const payload = JSON.parse(Buffer.from(encodedBody, "base64url").toString("utf8"));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

module.exports = {
  hashPassword,
  signToken,
  verifyPassword,
  verifyToken
};
