import axios from "axios";
import { SELF} from "./user.type";
const apiUrl = process.env.REACT_APP_API_URL;

export const getMyDetailsAction = () => async (dispatch) => {
  try {
    const User = await axios({
      method: "GET",
      url: `${apiUrl}/api/v1/company/fetchCompanyDetails`,
    });

    return dispatch({ type: SELF, payload: { ...User.data } });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
