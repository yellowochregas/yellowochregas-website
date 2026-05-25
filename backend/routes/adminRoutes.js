const express = require("express");
const { assignEngineer, dashboard, login } = require("../controllers/adminController");
const { listQuotes, updateQuoteStatus } = require("../controllers/quoteController");
const { requireAdmin } = require("../middleware/auth");
const { requireFields } = require("../middleware/validate");

const router = express.Router();

router.post("/login", requireFields(["email", "password"]), login);
router.get("/dashboard", requireAdmin, dashboard);
router.get("/quotes", requireAdmin, listQuotes);
router.patch("/quotes/:quoteId", requireAdmin, updateQuoteStatus);
router.patch("/jobs/:jobId/assign", requireAdmin, requireFields(["engineerId"]), assignEngineer);

module.exports = router;
