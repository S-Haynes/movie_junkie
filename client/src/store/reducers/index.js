import { combineReducers } from "redux";
import movieReducer from "./movie";
import authReducer from "./auth";
import profileReducer from "./profile";

const rootReducer = combineReducers({
  movie: movieReducer,
  auth: authReducer,
  profile: profileReducer
});

export default rootReducer;
