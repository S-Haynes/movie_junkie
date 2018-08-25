import { combineReducers } from "redux";
import movieReducer from "./movie";
import authReducer from "./auth";
import profileReducer from "./profile";
import errorReducer from "./error";

const rootReducer = combineReducers({
  movie: movieReducer,
  auth: authReducer,
  profile: profileReducer,
  error: errorReducer
});

export default rootReducer;
