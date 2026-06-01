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

async function getMyBookings(req, res, next) {
  try {
    const bookings = await Booking.find({ customer: req.auth.userId })
      .populate("customer")
      .sort({ createdAt: -1 });
    const jobs = await Job.find({ booking: { $in: bookings.map((booking) => booking._id) } }).populate("engineer");
    const jobsByBooking = new Map(jobs.map((job) => [job.booking.toString(), job]));
    return res.json(bookings.map((booking) => ({
      ...booking.toObject(),
      job: jobsByBooking.get(booking._id.toString()) || null
    })));
  } catch (error) {
    return next(error);
  }
}

async function rebookService(req, res, next) {
  try {
    const original = await Booking.findOne({ _id: req.params.bookingId, customer: req.auth.userId });
    if (!original) return res.status(404).json({ message: "Booking not found" });

    const booking = await Booking.create({
      customer: req.auth.userId,
      issueType: req.body.issueType || original.issueType,
      postcode: req.body.postcode || original.postcode,
      urgency: req.body.urgency || "Flexible",
      preference: req.body.preference || "Call-back",
      answers: original.answers,
      mediaNote: req.body.mediaNote || "Customer requested a rebook from their dashboard",
      status: "Rebook requested",
      source: "customer-dashboard"
    });

    await Job.create({
      booking: booking._id,
      status: "Rebook requested"
    });

    return res.status(201).json(await booking.populate("customer"));
  } catch (error) {
    return next(error);
  }
}

async function reportNewIssue(req, res, next) {
  try {
    const customer = await Customer.findById(req.auth.userId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const booking = await Booking.create({
      customer: customer._id,
      issueType: req.body.issueType || "New issue",
      postcode: req.body.postcode || customer.properties?.[0]?.postcode || "To confirm",
      urgency: req.body.urgency || "Flexible",
      preference: req.body.preference || "Call-back",
      answers: normaliseMap(req.body.answers || {}),
      mediaNote: req.body.mediaNote || "",
      safetyFlag: hasSafetyFlag(req.body.answers || {}),
      status: hasSafetyFlag(req.body.answers || {}) ? "Emergency review" : "New issue reported",
      source: "customer-dashboard"
    });

    await Job.create({
      booking: booking._id,
      status: booking.status === "Emergency review" ? "Emergency triage" : "Unassigned"
    });

    return res.status(201).json(await booking.populate("customer"));
  } catch (error) {
    return next(error);
  }
}

async function downloadReceipt(req, res, next) {
  try {
    const booking = await Booking.findOne({ _id: req.params.bookingId, customer: req.auth.userId }).populate("customer");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    return res.json({
      receiptId: `YOG-RECEIPT-${booking.publicId}`,
      bookingId: booking.publicId,
      customer: booking.customer?.name,
      issueType: booking.issueType,
      postcode: booking.postcode,
      status: booking.status,
      amount: "To be confirmed",
      note: "Formal invoice PDF generation is ready to connect to accounting software."
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createBooking,
  getBooking,
  getCustomerBookings,
  getMyBookings,
  rebookService,
  reportNewIssue,
  downloadReceipt
};
