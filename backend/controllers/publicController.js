const LocationPage = require("../models/LocationPage");
const Review = require("../models/Review");
const Service = require("../models/Service");

async function getReviews(req, res, next) {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 }).limit(12);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
}

async function getLocationPage(req, res, next) {
  try {
    const page = await LocationPage.findOne({ slug: req.params.slug, published: true });
    if (!page) return res.status(404).json({ message: "Location page not found" });
    return res.json(page);
  } catch (error) {
    return next(error);
  }
}

async function getServices(req, res, next) {
  try {
    const services = await Service.find({ active: true }).sort({ title: 1 });
    return res.json(services);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getReviews,
  getLocationPage,
  getServices
};
