const JobPost = require("../models/job");

module.exports = {
  CreateJobPost: async (req, res) => {
    try {
      const response = await JobPost.createJob(req.body);
      res.json({
        status: response.status,
        message: response.message,
      });
    } catch (error) {
      res.json({
        status: error.status || 500,
        message: error.message,
      });
    }
  },
  GetAllJobsPost: async (req, res) => {
    try {
      const response = await JobPost.getAllJobs(req.query.location, req.query.type);
      res.json({
        status: response.status,
        data: response.data,
      });
    } catch (error) {
      res.json({
        status: error.status || 500,
        message: error.message,
      });
    }
  },
  GetJobPostById: async (req, res) => {
    try {
      const response = await JobPost.getJobById(req.params.jobId);
      res.json({
        status: response.status,
        data: response.data,
      });
    } catch (error) {
      res.json({
        status: error.status || 500,
        message: error.message,
      });
    }
  },
  UpdateJobPost: async (req, res) => {
    try {
      const response = await JobPost.updateJob(
        req.params.jobId,
        req.body
      );
      res.json({
        status: response.status,
        message: response.message,
      });
    } catch (error) {
      res.json({
        status: error.status || 500,
        message: error.message,
      });
    }
  },
  DeleteJobPost: async (req, res) => {
    try {
      const response = await JobPost.deleteJob(req.params.jobId, req.body.userId);
      res.json({
        status: response.status,
        message: response.message,
      });
    } catch (error) {
      res.json({
        status: error.status || 500,
        message: error.message,
      });
    }
  }
}