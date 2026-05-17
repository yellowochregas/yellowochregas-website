const express = require("express");
const { getCustomerBookings } = require("../controllers/bookingController");

const router = express.Router();

router.get("/bookings", getCustomerBookings);

module.exports = router;
