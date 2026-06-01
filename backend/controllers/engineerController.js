const Booking = require("../models/Booking");
const Job = require("../models/Job");

function populateJob(query) {
  return query
    .populate({ path: "booking", populate: { path: "customer" } })
    .populate("engineer");
}

function canManageJob(req, job) {
  if (req.auth?.role === "ADMIN") return true;
  return Boolean(job.engineer && job.engineer._id?.toString() === req.auth?.userId);
}

async function getMyJobs(req, res, next) {
  try {
    const jobs = await populateJob(
      Job.find({ engineer: req.auth.userId }).sort({ createdAt: -1 })
    );
    return res.json(jobs);
  } catch (error) {
    return next(error);
  }
}

async function getEngineerJobs(req, res, next) {
  try {
    if (req.auth.role !== "ADMIN" && req.params.engineerId !== req.auth.userId) {
      return res.status(403).json({ message: "Engineers can only view their own assigned jobs" });
    }

    const jobs = await populateJob(
      Job.find({ engineer: req.params.engineerId }).sort({ createdAt: -1 })
    );
    return res.json(jobs);
  } catch (error) {
    return next(error);
  }
}

async function updateJob(req, res, next) {
  try {
    const existingJob = await populateJob(Job.findById(req.params.jobId));
    if (!existingJob) return res.status(404).json({ message: "Job not found" });
    if (!canManageJob(req, existingJob)) {
      return res.status(403).json({ message: "You can only manage jobs assigned to you" });
    }

    const update = {};
    if (req.body.status) update.status = req.body.status;
    if (req.body.status === "Complete") update.completedAt = new Date();

    const push = {};
    if (req.body.note || req.body.notes) {
      push.notes = {
        body: req.body.note || req.body.notes,
        createdBy: req.auth.role === "ADMIN" ? "admin" : "engineer"
      };
    }
    if (req.body.photoUrl) {
      push.photos = {
        url: req.body.photoUrl,
        caption: req.body.photoCaption || "Engineer upload"
      };
    }
    if (Object.keys(push).length) {
      update.$push = Object.entries(push).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    }

    const job = await populateJob(
      Job.findByIdAndUpdate(req.params.jobId, update, { new: true })
    );

    if (job.booking?._id && req.body.status) {
      await Booking.findByIdAndUpdate(job.booking._id, { status: req.body.status });
    }

    return res.json(job);
  } catch (error) {
    return next(error);
  }
}

async function generateServiceReport(req, res, next) {
  try {
    const job = await populateJob(Job.findById(req.params.jobId));
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (!canManageJob(req, job)) {
      return res.status(403).json({ message: "You can only view reports for assigned jobs" });
    }

    return res.json({
      reportId: `YOG-REPORT-${job._id.toString().slice(-6).toUpperCase()}`,
      jobId: job._id,
      status: job.status,
      completedAt: job.completedAt,
      customer: job.booking?.customer,
      postcode: job.booking?.postcode,
      issueType: job.booking?.issueType,
      engineer: job.engineer,
      notes: job.notes,
      photos: job.photos
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  generateServiceReport,
  getEngineerJobs,
  getMyJobs,
  updateJob
};
