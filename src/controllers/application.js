const Application = require("../models/application");

module.exports = {
  ApplyForJob: async (req, res) => {
    try {
      const { jobId } = req.params;
      const { userId, coverLetter } = req.body;
      if (!jobId) {
        return res.status(400).json({ message: "Job ID is required" });
      }
      if (!userId || !coverLetter) {
        return res
          .status(400)
          .json({ message: "User ID and cover letter are required" });
      }
      const response = await Application.applyForJob(jobId, userId, coverLetter);
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
  GetApplicantsForJob: async (req, res) => {
    try {
      const { jobId } = req.params;
      if (!jobId) {
        return res.status(400).json({
          status: 400,
          message: "Missing required fields",
        });
      }
      const response = await Application.applicantsForJob(jobId);
      res.json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      res.json({
        status: error.status || 500,
        message: error.message,
      });
    }
  },
};
