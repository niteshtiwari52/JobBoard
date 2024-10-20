import axios from "axios";
import { CREATE_JOB, CREATE_JOB_ERROR } from "./job.type";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";


export const createJobAction = (jobData) => async (dispatch) => {
  try {
    const formattedData = {
      jobTitle: jobData.jobTitle,
      jobDescription: jobData.jobDescription,
      experienceLevel: jobData.experienceLevel,
      candidatesEmails: jobData.candidateEmails,
      endDate: jobData.endDate,
    };

    const response = await axios({
      method: "POST",
      url: `${apiUrl}/api/v1/job/createJob`,
      data: formattedData,
    });

    return dispatch({
      type: CREATE_JOB,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error during job creation:", error);

    const errorPayload = error.response
      ? error.response.data
      : { message: "Something went wrong. Please try again." };

    return dispatch({
      type: CREATE_JOB_ERROR,
      payload: errorPayload,
    });
  }
};
