const Model = require("../../Models");
const moment = require("moment");
const HelperFunction = require("../../Utils");

module.exports.CreateJob = async (req, res) => {
  try {
    const {
      jobTitle,
      jobDescription,
      experienceLevel,
      candidatesEmails,
      endDate,
    } = req.body;

    if (
      !jobTitle ||
      !jobDescription ||
      !experienceLevel ||
      !candidatesEmails ||
      !endDate
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const job = new Model.JobModel({
      title: jobTitle,
      description: jobDescription,
      expereince: experienceLevel,
      candidates: candidatesEmails,
      endDate: moment(endDate).toISOString(),
    });

    const createdJob = await job.save();

    for (const email of candidatesEmails) {
      const emailPayload = {
        to: email,
        title: jobTitle ? `New Job Posting: ${jobTitle}` : "New Job Posting",
        message: await HelperFunction.EmailOtpServices.jobCreationTemplate(
          jobTitle || "Job Title Not Available",
          jobDescription || "Job description not available",
          experienceLevel || "Experience level not provided",
          req.user.companyName || "Company Name",
          endDate || "End date not provided"
        ),
      };

      await HelperFunction.EmailOtpServices.send(emailPayload);
    }

    return res.status(201).json({
      message:
        "Job created successfully and notifications sent to selected candidates",
      job: createdJob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res
      .status(500)
      .json({ error: "Server error while creating the job" });
  }
};
