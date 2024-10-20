const express = require("express")
const router = express.Router();
const Controllers = require("../../Controllers")
const passport = require("passport");
router.post("/createJob" , passport.authenticate('jwt', { session: false }) , Controllers.JobController.CreateJob)


module.exports = router;