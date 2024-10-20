const Model = require("../../Models");
const Validation = require("../../Validation");
const HelperFunction = require("../../Utils");

module.exports.companyRegistration = async (req, res) => {
  try {
    console.log(req.body);
    const { name, phone, email, companyName, employeeSize } = req.body;

    const { error } = Validation.companyRegistrationValidation.validate(
      req.body
    );
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existingCompany = await Model.CompanyModel.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already registered with this email",
      });
    } else {
      const emailOtp = HelperFunction.MobileOtpServices.generateOTP();
      const mobileOtp = HelperFunction.MobileOtpServices.generateOTP();

      const payload = {
        to: email,
        title: `OTP to Verify Company Account: ${emailOtp}`,
        message: await HelperFunction.EmailOtpServices.verifyEmailTemplate(
          emailOtp,
          name,
          companyName
        ),
      };
      await HelperFunction.EmailOtpServices.send(payload);

      await HelperFunction.MobileOtpServices.sendOTP(phone, mobileOtp);

      const newCompany = new Model.CompanyModel({
        email,
        owner: name,
        companyName,
        mobile: phone,
        employeeSize,
        emailOtp,
        mobileOtp,
        isEmailVerified: false,
        isMobileVerified: false,
      });

      await newCompany.save();
      return res.status(200).json({
        success: true,
        message:
          "OTP sent to email and phone. Please verify to complete registration.",
        mobileOtp,
        emailOtp,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.verifyCompanyEmailAndPhone = async (req, res) => {
  try {
    const { email, emailOtp, mobileOtp } = req.body;

    const company = await Model.CompanyModel.findOne({ email });
    if (!company) return res.status(404).json({ error: "Company not found" });

    if (!company.isEmailVerified && company.emailOtp !== emailOtp)
      return res.status(400).json({ error: "Invalid email OTP" });

    company.isEmailVerified = true;
    company.isMobileVerified = true;

    company.mobileOtp = undefined;

    await company.save();

    const payload = {
      to: email,
      title: `Account Verified Successfully`,
      message: await HelperFunction.EmailOtpServices.thankYouTemplate(
        company.owner,
        company.companyName
      ),
    };
    await HelperFunction.EmailOtpServices.send(payload);

    const token = company.generateJwtToken();

    return res.status(200).json({
      message: "Email and phone verified successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.verifyEmail = async (req, res) => {
  try {
    const { email, emailOtp } = req.body;

    const company = await Model.CompanyModel.findOne({ email });
    if (!company) return res.status(404).json({ error: "Company not found" });

    if (!company.isEmailVerified && company.emailOtp !== emailOtp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email OTP" });
    }

    let token = null;

    if (company.emailOtp === emailOtp) {
      company.isEmailVerified = true;
      company.emailOtp = undefined;
      await company.save();

      token = company.generateJwtToken();

      const payload = {
        to: email,
        title: `Account Verified Successfully`,
        message: await HelperFunction.EmailOtpServices.thankYouTemplate(
          company.owner,
          company.companyName
        ),
      };
      await HelperFunction.EmailOtpServices.send(payload);
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.verifyMobile = async (req, res) => {
  try {
    const { mobile, mobileOtp } = req.body;

    // const mobileVerificationResponse =
    //   await HelperFunction.MobileOtpServices.verifyOTP(mobile, mobileOtp);

    // if (mobileVerificationResponse.type === "success") {
    //   return res.status(200).json({
    //     success: true,
    //     message: "Phone Verified Successfully",
    //   });
    // } else {

    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid phone OTP. Please try again.",
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: "Phone Verified Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.fetchCompanyDetails = async (req, res) => {
  try {
    const companyId = req.user._id;

    const company = await Model.CompanyModel.findById(companyId);
    if (!company) return res.status(404).json({ error: "Company not found" });

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
