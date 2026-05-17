const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const Job = require("../models/Job");

function normaliseMap(value = {}) {
  return Object.entries(value).reduce((acc, [key, item]) => {
    if (item !== undefined && item !== null) acc[key] = String(item);
    return acc;
  }, {});
}

function hasSafetyFlag(answers = {}) {
  return answers.gasSmell === "Yes" || answers.gasSmell === "Not sure" || answers.immediateRisk === "Yes";
}

async function createBooking(req, res, next) {
  try {
    const { customer: customerPayload, issueType, postcode, urgency, preference, answers = {}, mediaNote } = req.body;
    const phone = customerPayload.phone.trim();

    const customer = await Customer.findOneAndUpdate(
      { phone },
      {
        $set: {
          name: customerPayload.name.trim(),
          phone,
          email: customerPayload.email
        }
      },
      { new: true, upsert: true }
    );

    const safetyFlag = hasSafetyFlag(answers);
    const booking = await Booking.create({
      customer: customer._id,
      issueType,
      postcode,
      urgency: safetyFlag ? "Emergency" : urgency,
      preference,
      answers: normaliseMap(answers),
      mediaNote,
      safetyFlag,
      status: (safetyFlag || urgency === "Emergency") ? "Emergency review" : "Request received"
    });

    await Job.create({
      booking: booking._id,
      status: booking.status === "Emergency review" ? "Emergency triage" : "Unassigned"
    });

    const populated = await booking.populate("customer");
    res.status(201).json({ publicId: booking.publicId, booking: populated });
  } catch (error) {
    next(error);
  }
}

async function getBooking(req, res, next) {
  try {
    const booking = await Booking.findOne({ publicId: req.params.publicId }).populate("customer");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (req.query.phone && booking.customer.phone !== req.query.phone) {
      return res.status(403).json({ message: "Phone number does not match this booking" });
    }
    return res.json(booking);
  } catch (error) {
    return next(error);
  }
}

async function getCustomerBookings(req, res, next) {
  try {
    const phone = req.query.phone;
    if (!phone) return res.status(400).json({ message: "Phone query is required" });
    const customer = await Customer.findOne({ phone });
    if (!customer) return res.json([]);
    const bookings = await Booking.find({ customer: customer._id }).populate("customer").sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createBooking,
  getBooking,
  getCustomerBookings
};
