const express = require("express");
const { CreateJobPost, GetAllJobsPost, GetJobPostById, UpdateJobPost, DeleteJobPost } = require("../controllers/job");
const router = express.Router();

router.post("/", CreateJobPost);
router.get("/", GetAllJobsPost);
router.get("/:jobId", GetJobPostById);
router.put("/:jobId", UpdateJobPost);
router.delete("/:jobId", DeleteJobPost);

module.exports = router;