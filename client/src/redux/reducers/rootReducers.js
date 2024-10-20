import { combineReducers } from "redux";

import auth from "./auth/auth.reducer";
import user from "./user/user.reducer";
import job from "./job/job.reducer";

const rootReducer = combineReducers({
  auth,
  user,
  job,
});

export default rootReducer;
