const express = require("express")
const router = express.Router();
const CompanRoutes = require("./Company/company.routes")
const JobRoutes = require("./Job/job.routes")

router.use("/company" , CompanRoutes);

router.use("/job" , JobRoutes)

module.exports = router;