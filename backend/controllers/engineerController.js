const Job = require("../models/Job");

async function getEngineerJobs(req, res, next) {
  try {
    const jobs = await Job.find({ engineer: req.params.engineerId })
      .populate({ path: "booking", populate: { path: "customer" } })
      .populate("engineer")
      .sort({ createdAt: -1 });
    return res.json(jobs);
  } catch (error) {
    return next(error);
  }
}

async function updateJob(req, res, next) {
  try {
    const update = {};
    if (req.body.status) update.status = req.body.status;
    if (req.body.status === "Complete") update.completedAt = new Date();
    if (req.body.note) {
      update.$push = {
        notes: {
          body: req.body.note,
          createdBy: "engineer"
        }
      };
    }

    const job = await Job.findByIdAndUpdate(req.params.jobId, update, { new: true })
      .populate({ path: "booking", populate: { path: "customer" } })
      .populate("engineer");

    if (!job) return res.status(404).json({ message: "Job not found" });
    return res.json(job);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getEngineerJobs,
  updateJob
};
