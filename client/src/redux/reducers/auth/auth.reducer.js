import {
  REGISTER_COMPANY,
  REGISTER_COMPANY_ERROR,
  EMAIL_VERIFY,
  EMAIL_VERIFY_ERROR,
  MOBILE_VERIFY,
  MOBILE_VERIFY_ERROR,
} from "./auth.type";

const initialState = {
  authStatus: {},
  emailVerifyStatus: {},
  mobileVerifyStatus: {},
  signupError: {},
  signinError: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_COMPANY:
      return {
        ...state,
        authStatus: action.payload,
      };
    case REGISTER_COMPANY_ERROR:
      return {
        ...state,
        authStatus: action.payload,
      };
    case EMAIL_VERIFY:
      return {
        ...state,
        emailVerifyStatus: action.payload,
      };
    case EMAIL_VERIFY_ERROR:
      return {
        ...state,
        emailVerifyStatus: action.payload,
      };
    case MOBILE_VERIFY:
      return {
        ...state,
        mobileVerifyStatus: action.payload,
      };
    case MOBILE_VERIFY_ERROR:
      return {
        ...state,
        mobileVerifyStatus: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
