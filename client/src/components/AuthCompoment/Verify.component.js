import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyEmailAction,
  verifyPhoneAction,
} from "../../redux/reducers/auth/auth.action";
import { useNavigate } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FcOk } from "react-icons/fc";
import { IoMdCloseCircle } from "react-icons/io";
import { getMyDetailsAction } from "../../redux/reducers/user/user.action";

const VerifyComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, phone } = useSelector(
    (state) => state.auth.authStatus.userTempData || {}
  );

  const { emailVerifyStatus } = useSelector((state) => state.auth);
  const { mobileVerifyStatus } = useSelector((state) => state.auth);

  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);
  const [isPhoneOtpVerified, setIsPhoneOtpVerified] = useState(false);
  const [emailOtpFailed, setEmailOtpFailed] = useState(false);
  const [phoneOtpFailed, setPhoneOtpFailed] = useState(false);

  // Added loading states
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);

  const handleEmailOtpChange = (e) => setEmailOtp(e.target.value);
  const handlePhoneOtpChange = (e) => setPhoneOtp(e.target.value);

  const handleEmailOtpVerification = async () => {
    if (!email || !emailOtp) {
      setEmailOtpFailed(true);
      return;
    }

    try {
      setIsEmailLoading(true);
      const verifyEmailData = { email, emailOtp };
      await dispatch(verifyEmailAction(verifyEmailData));
      setEmailOtpFailed(false);
    } catch (error) {
      setEmailOtpFailed(true);
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handlePhoneOtpVerification = async () => {
    if (!phone || !phoneOtp) {
      setPhoneOtpFailed(true);
      return;
    }

    try {
      setIsPhoneLoading(true);
      const verifyPhoneData = { mobile: phone, mobileOtp: phoneOtp };
      await dispatch(verifyPhoneAction(verifyPhoneData));
      setPhoneOtpFailed(false);
    } catch (error) {
      setPhoneOtpFailed(true);
    } finally {
      setIsPhoneLoading(false);
    }
  };

  useEffect(() => {
    if (emailVerifyStatus) {
      if (emailVerifyStatus?.success) {
        setIsEmailOtpVerified(true);
      } else if (emailVerifyStatus?.message) {
        alert(emailVerifyStatus.message);
      }
    }
  }, [emailVerifyStatus]);

  useEffect(() => {
    if (mobileVerifyStatus) {
      if (mobileVerifyStatus?.success) {
        setIsPhoneOtpVerified(true);
      } else if (mobileVerifyStatus?.message) {
        alert(mobileVerifyStatus.message);
      }
    }
  }, [mobileVerifyStatus]);

  useEffect(() => {
    if (isEmailOtpVerified && isPhoneOtpVerified) {
      dispatch(getMyDetailsAction());
      return;
    }
  }, [isEmailOtpVerified, isPhoneOtpVerified]);

  return (
    <div className="relative p-[2px] rounded-xl">
      <div className="gradient-border bg-white w-[619px] space-y-8 p-[1px] rounded-xl">
        <div className="mx-8 my-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Verify OTP
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please verify your email and phone number
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="company_email"
                name="company_email"
                type="text"
                value={emailOtp}
                onChange={handleEmailOtpChange}
                autoComplete="email"
                required
                className={`w-full pl-10 px-4 py-2 border ${
                  isEmailOtpVerified ? "border-green-500" : "border-gray-500"
                } text-[#403a3a] bg-[#F4F4F4] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CCCCCC] focus:border-transparent`}
                placeholder="Enter Email OTP"
                disabled={isEmailOtpVerified || isEmailLoading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isEmailOtpVerified ? (
                  <FcOk className="text-green-500" />
                ) : emailOtpFailed ? (
                  <IoMdCloseCircle className="text-red-500" />
                ) : null}
              </div>
            </div>

            {!isEmailOtpVerified && (
              <div>
                <button
                  type="button"
                  onClick={handleEmailOtpVerification}
                  className="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  disabled={isEmailLoading}
                >
                  {isEmailLoading ? "Verifying Email..." : "Verify Email OTP"}
                </button>
              </div>
            )}

            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="phone"
                name="phone"
                type="text"
                value={phoneOtp}
                onChange={handlePhoneOtpChange}
                autoComplete="tel"
                required
                className={`w-full pl-10 px-4 py-2 border ${
                  isPhoneOtpVerified ? "border-green-500" : "border-gray-500"
                } text-[#403a3a] bg-[#F4F4F4] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CCCCCC] focus:border-transparent`}
                placeholder="Enter Phone OTP"
                disabled={isPhoneOtpVerified || isPhoneLoading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isPhoneOtpVerified ? (
                  <FcOk className="text-green-500" />
                ) : phoneOtpFailed ? (
                  <IoMdCloseCircle className="text-red-500" />
                ) : null}
              </div>
            </div>

            {!isPhoneOtpVerified && (
              <div>
                <button
                  type="button"
                  onClick={handlePhoneOtpVerification}
                  className="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  disabled={isPhoneLoading}
                >
                  {isPhoneLoading ? "Verifying Phone..." : "Verify Phone OTP"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyComponent;
