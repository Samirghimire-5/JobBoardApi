const express = require("express");
const { ApplyForJob, GetApplicantsForJob } = require("../controllers/application");
const router = express.Router();

router.post("/:jobId/apply", ApplyForJob);
router.get("/:jobId/applicants", GetApplicantsForJob);

module.exports = router;