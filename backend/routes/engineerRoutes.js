const express = require("express");
const { getEngineerJobs, updateJob } = require("../controllers/engineerController");

const router = express.Router();

router.get("/:engineerId/jobs", getEngineerJobs);
router.patch("/jobs/:jobId", updateJob);

module.exports = router;
