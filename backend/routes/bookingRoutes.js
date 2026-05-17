const express = require("express");
const { createBooking, getBooking } = require("../controllers/bookingController");
const { requireFields } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/",
  requireFields(["customer.name", "customer.phone", "issueType", "postcode"]),
  createBooking
);
router.get("/:publicId", getBooking);

module.exports = router;
