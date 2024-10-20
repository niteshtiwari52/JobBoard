const express = require("express");
const router = express.Router();
const Controllers = require("../../Controllers");
const passport = require("passport");

router.post("/register", Controllers.CompanyController.companyRegistration);
router.post(
  "/verify",
  Controllers.CompanyController.verifyCompanyEmailAndPhone
);
router.post("/verify/email", Controllers.CompanyController.verifyEmail);
router.post("/verify/phone", Controllers.CompanyController.verifyMobile);

router.get(
  "/fetchCompanyDetails",
  passport.authenticate("jwt", { session: false }),
  Controllers.CompanyController.fetchCompanyDetails
);

module.exports = router;
