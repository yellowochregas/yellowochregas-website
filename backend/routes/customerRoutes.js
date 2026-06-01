const express = require("express");
const {
  downloadReceipt,
  getCustomerBookings,
  getMyBookings,
  rebookService,
  reportNewIssue
} = require("../controllers/bookingController");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/bookings", getCustomerBookings);
router.get("/me/bookings", requireAuth, requireRole("CUSTOMER"), getMyBookings);
router.post("/me/bookings/:bookingId/rebook", requireAuth, requireRole("CUSTOMER"), rebookService);
router.post("/me/issues", requireAuth, requireRole("CUSTOMER"), reportNewIssue);
router.get("/me/bookings/:bookingId/receipt", requireAuth, requireRole("CUSTOMER"), downloadReceipt);

module.exports = router;
