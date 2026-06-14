const express = require("express");
const { login, me } = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");
const { requireFields } = require("../middleware/validate");

const router = express.Router();

//router.post("/login", requireFields(["email", "password", "role"]), login);

// TEMPORARY — remove requireFields to test
router.post("/login", login);
router.get("/me", requireAuth, me);

module.exports = router;
