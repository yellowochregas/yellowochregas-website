const express = require("express");
const { createQuote, getQuote } = require("../controllers/quoteController");
const { requireFields } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/",
  requireFields(["quoteType", "customer.name", "customer.email", "customer.phone", "postcode", "address", "consent"]),
  createQuote
);
router.get("/:publicId", getQuote);

module.exports = router;
