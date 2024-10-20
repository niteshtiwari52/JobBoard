import axios from "axios";

// Redux type
import {
  REGISTER_COMPANY_ERROR,
  REGISTER_COMPANY,
  EMAIL_VERIFY,
  EMAIL_VERIFY_ERROR,
  MOBILE_VERIFY,
  MOBILE_VERIFY_ERROR,
} from "./auth.type";
const apiUrl = process.env.REACT_APP_API_URL;

export const registerCompanyAction = (userData) => async (dispatch) => {
  try {
    const formattedData = {
      name: userData.name,
      phone: userData.phone,
      email: userData.company_email,
      companyName: userData.company_name,
      employeeSize: userData.employee_size,
    };
    const User = await axios({
      method: "POST",
      url: `${apiUrl}/api/v1/company/register`,
      data: formattedData,
    });

    return dispatch({
      type: REGISTER_COMPANY,
      payload: {
        ...User.data,
        userTempData: {
          email: userData.company_email,
          phone: userData.phone,
        },
      },
    });
  } catch (error) {
    console.error("Error during company registration:", error);

    const errorPayload = error.response
      ? error.response.data
      : { message: "Something went wrong. Please try again." };

    return dispatch({
      type: REGISTER_COMPANY_ERROR,
      payload: {
        ...errorPayload,
        userTempData: {
          email: userData.company_email,
          phone: userData.phone,
        },
      },
    });
  }
};

export const verifyEmailAction = (verifyEmailData) => async (dispatch) => {
  try {
    const formattedData = {
      email: verifyEmailData.email,
      emailOtp: verifyEmailData.emailOtp,
    };
    const verificationResponse = await axios({
      method: "POST",
      url: `${apiUrl}/api/v1/company/verify/email`,
      data: formattedData,
    });

    localStorage.setItem(
      "JBUser",
      JSON.stringify({ token: verificationResponse.data.token })
    );
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${verificationResponse.data.token}`;
    return dispatch({ type: EMAIL_VERIFY, payload: verificationResponse.data });
  } catch (error) {
    console.error("Error during company registration:", error);

    const errorPayload = error.response
      ? error.response.data
      : { message: "Something went wrong. Please try again." };

    return dispatch({ type: EMAIL_VERIFY_ERROR, payload: errorPayload });
  }
};

export const verifyPhoneAction = (verifyMobileData) => async (dispatch) => {
  try {
    const formattedData = {
      mobile: verifyMobileData.mobile,
      mobileOtp: verifyMobileData.mobileOtp,
    };
    const verificationResponse = await axios({
      method: "POST",
      url: `${apiUrl}/api/v1/company/verify/phone`,
      data: formattedData,
    });

    return dispatch({
      type: MOBILE_VERIFY,
      payload: verificationResponse.data,
    });
  } catch (error) {
    console.error("Error during company registration:", error);

    const errorPayload = error.response
      ? error.response.data
      : { message: "Something went wrong. Please try again." };

    return dispatch({ type: MOBILE_VERIFY_ERROR, payload: errorPayload });
  }
};
