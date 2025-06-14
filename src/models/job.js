const knex = require("../db/knex");

module.exports = class JobPost {
  constructor(jobs) {
    this.id = jobs.id;
    this.title = jobs.title;
    this.company = jobs.company;
    this.location = jobs.location;
    this.description = jobs.description;
    this.type = jobs.type || "full_time";
    this.posted_by = jobs.posted_by;
    this.created_at = jobs.created_at;
  }

  static async createJob(jobDetails) {
    try {
      const job = await knex("jobs").insert(jobDetails);

      if (!job) {
        return { status: 500, message: "Failed to create job" };
      }

      return { status: 201, message: "Job posted successfully" };
    } catch (error) {
      console.error("Error creating job:", error);
      return { status: 500, message: "Internal server error" };
    }
  }

  static async getAllJobs(location, type) {
    try {
      let query = knex("jobs"); // SELECT * FROM jobs

      if (location) {
        // SELECT * FROM jobs WHERE location = ?
        query = query.where({ location }); // sql doesn't excute the query
      }

      if (type) {
        // SELECT * FROM jobs WHERE location = ? AND type = ?
        query = query.where({ type });
      }

      const jobs = await query; // Execute the query when await is used
      if (jobs.length === 0) {
        return { status: 404, message: "No jobs found" };
      }
      return { status: 200, data: jobs };
    } catch (error) {
      console.error("Error creating job:", error);
      return { status: 500, message: "Internal server error" };
    }
  }

  static async getJobById(jobId) {
    try {
      const job = await knex("jobs").where({ id: jobId }).first();
      if (!job) {
        return { status: 404, message: "Job not found" };
      }
      return { status: 200, data: job };
    } catch (error) {
      console.error("Error creating job:", error);
      return { status: 500, message: "Internal server error" };
    }
  }

  static async updateJob(jobId, jobDetails) {
    try {
      const job = await knex("jobs").where({ id: jobId }).first();

      if (!job) {
        return { status: 404, message: "Job not found" };
      }

      if (job.posted_by !== jobDetails.posted_by) {
        return {
          status: 403,
          message: "You are not authorized to update this job application",
        };
      }

      const updatedJob = await knex("jobs")
        .where({ id: jobId })
        .update(jobDetails);

      if (!updatedJob) {
        return { status: 500, message: "Failed to update job" };
      }

      return { status: 200, message: "Job updated successfully" };
    } catch (error) {
      console.error("Error updating job:", error);
      return { status: 500, message: "Internal server error" };
    }
  }

  static async deleteJob(jobId, userId) {
    try {
      const job = await knex("jobs").where({ id: jobId }).first();

      if (!job) {
        return { status: 404, message: "Job not found" };
      }

      if (job.posted_by !== userId) {
        return {
          status: 403,
          message: "You are not authorized to delete this job application",
        };
      }

      const deletedJob = await knex("jobs").where({ id: jobId }).del();

      if (!deletedJob) {
        return { status: 500, message: "Failed to delete job" };
      }

      return { status: 200, message: "Job deleted successfully" };
    } catch (error) {
      console.error("Error deleting job:", error);
      return { status: 500, message: "Internal server error" };
    }
  }
};
