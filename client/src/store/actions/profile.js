import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING } from "./types";
import axios from "axios";

export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch(setCurrentProfile(res.data)))
    .catch(err => console.log(err.response.data));
};

export const setCurrentProfile = profile => {
  return {
    type: GET_PROFILE,
    payload: profile
  };
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
