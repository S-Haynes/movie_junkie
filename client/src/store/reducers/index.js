import { combineReducers } from "redux";
import movieReducer from "./movie";

const rootReducer = combineReducers({
  movie: movieReducer
});

export default rootReducer;
