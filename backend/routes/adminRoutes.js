const express = require("express");
const { assignEngineer, dashboard, login } = require("../controllers/adminController");
const { requireAdmin } = require("../middleware/auth");
const { requireFields } = require("../middleware/validate");

const router = express.Router();

router.post("/login", requireFields(["email", "password"]), login);
router.get("/dashboard", requireAdmin, dashboard);
router.patch("/jobs/:jobId/assign", requireAdmin, requireFields(["engineerId"]), assignEngineer);

module.exports = router;
