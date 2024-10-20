import {
    CREATE_JOB,
    CREATE_JOB_ERROR,
    CLEAR_JOB_ERROR,
  } from "./job.type";
  
  const initialState = {
    jobStatus: {},
    createJobError: {},
  };
  
  const jobReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_JOB:
        return {
          ...state,
          jobStatus: action.payload,
        };
      
      case CREATE_JOB_ERROR:
        return {
          ...state,
          createJobError: action.payload,
        };
  
      case CLEAR_JOB_ERROR:
        return {
          ...state,
          createJobError: {},
        };
  
      default:
        return state;
    }
  };
  
  export default jobReducer;
  