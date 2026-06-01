const express = require("express");
const { generateServiceReport, getEngineerJobs, getMyJobs, updateJob } = require("../controllers/engineerController");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.get("/me/jobs", requireRole("ENGINEER"), getMyJobs);
router.get("/:engineerId/jobs", requireRole("ADMIN", "ENGINEER"), getEngineerJobs);
router.patch("/jobs/:jobId", requireRole("ADMIN", "ENGINEER"), updateJob);
router.get("/jobs/:jobId/report", requireRole("ADMIN", "ENGINEER"), generateServiceReport);

module.exports = router;
