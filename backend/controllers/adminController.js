const AdminUser = require("../models/AdminUser");
const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const Engineer = require("../models/Engineer");
const Job = require("../models/Job");
const LocationPage = require("../models/LocationPage");
const QuoteRequest = require("../models/QuoteRequest");
const Review = require("../models/Review");
const { createAuthToken } = require("../middleware/auth");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await AdminUser.findOne({ email: String(email).toLowerCase(), active: true });
    if (!admin || !admin.verifyPassword(password)) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = createAuthToken(admin, "ADMIN");
    return res.json({ token, admin: { email: admin.email, name: admin.name, role: admin.role } });
  } catch (error) {
    return next(error);
  }
}

async function dashboard(req, res, next) {
  try {
    const [bookings, quotes, customers, engineers, jobs, reviews, locationPages] = await Promise.all([
      Booking.find().populate("customer").sort({ urgency: 1, createdAt: -1 }).limit(80),
      QuoteRequest.find().sort({ emergencyFlag: -1, createdAt: -1 }).limit(80),
      Customer.find().sort({ createdAt: -1 }).limit(80),
      Engineer.find().sort({ active: -1, name: 1 }),
      Job.find().populate("booking engineer").sort({ createdAt: -1 }).limit(80),
      Review.find().sort({ createdAt: -1 }).limit(40),
      LocationPage.find().sort({ areaName: 1 })
    ]);

    return res.json({ bookings, quotes, customers, engineers, jobs, reviews, locationPages });
  } catch (error) {
    return next(error);
  }
}

async function assignEngineer(req, res, next) {
  try {
    const { engineerId } = req.body;
    const job = await Job.findOneAndUpdate(
      { booking: req.params.jobId },
      { engineer: engineerId, status: "Engineer assigned" },
      { new: true }
    ).populate("booking engineer");

    if (!job) {
      return res.status(404).json({ message: "Job not found for booking" });
    }

    await Booking.findByIdAndUpdate(req.params.jobId, { status: "Engineer assigned" });
    return res.json(job);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
  dashboard,
  assignEngineer
};
