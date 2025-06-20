const knex = require("../db/knex");

module.exports = class Application {
  static async applyForJob(jobId, userId, coverLetter) {
    try {
      const job = await knex("jobs").where({ id: jobId }).first();
      if (!job) {
        return { status: 404, message: "Job not found" };
      }
      const alreadyApplied = await knex("applications").where({
        job_id: jobId,
        user_id: userId,
      });
      if (alreadyApplied) {
        return {
          status: 403,
          message: "You have already applied for this job",
        };
      }
      const user = await knex("users").where({ id: userId }).first();
      if (!user) {
        return { status: 404, message: "User not found" };
      }
      if (job.posted_by === userId) {
        return {
          status: 403,
          message: "You cannot apply for your own job",
        };
      }
      if (user.role !== "job_seeker") {
        return {
          status: 403,
          message: "Only applicants can apply for jobs",
        };
      }
      const application = await knex("applications").insert({
        job_id: jobId,
        user_id: userId,
        cover_letter: coverLetter,
      });
      if (!application) {
        return { status: 500, message: "Failed to apply for job" };
      }
      return { status: 200, message: "Job applied successfully" };
    } catch (error) {
      console.error("Error creating job:", error);
      return { status: 500, message: "Internal server error" };
    }
  }

  static async applicantsForJob(jobId) {
    const job = await knex("jobs").where({ id: jobId }).first();
    if (!job) {
      return { status: 404, message: "Job not found" };
    }
    const applicants = await knex("applications").find({ job_id: jobId });
    if (!applicants) {
      return { status: 404, message: "No applicants found" };
    }
    return { status: 200, data: applicants };
  }
};
