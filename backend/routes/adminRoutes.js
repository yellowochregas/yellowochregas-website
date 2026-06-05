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
// Add this temporary route in your backend
router.get('/api/debug-db', async (req, res) => {
  try {
    // Test 1: Check DB connection
    const dbState = mongoose.connection.readyState;
    // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting

    // Test 2: Count users in database
    const userCount = await User.countDocuments();

    // Test 3: Find one user (no password)
    const sampleUser = await User.findOne({}, { password: 0 });

    res.json({
      dbConnected: dbState === 1,
      dbState: dbState,
      totalUsers: userCount,
      sampleUser: sampleUser
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});
module.exports = router;
