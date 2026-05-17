const express = require("express");
const { getLocationPage, getReviews, getServices } = require("../controllers/publicController");

const router = express.Router();

router.get("/reviews", getReviews);
router.get("/locations/:slug", getLocationPage);
router.get("/services", getServices);

module.exports = router;
