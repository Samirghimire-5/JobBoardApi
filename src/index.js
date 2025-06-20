const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const applicationRoutes = require("./routes/application");

app.use("/api", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/jobApplications", applicationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});