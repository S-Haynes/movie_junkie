import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  MOVIE_ADDED
} from "./types";
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

// Add Movie to Bucket List
export const addToBucketList = movieData => dispatch => {
  axios
    .post("/api/profile/addmovie", movieData)
    .then(res => dispatch(movieAdded()))
    .catch(err => console.log(err.response.data));
};
// Add to already watched list
export const addToWatchedList = movieData => dispatch => {
  axios
    .post("/api/profile/watchedmovie", movieData)
    .then(res => dispatch(movieAdded()))
    .catch(err => console.log(err.response.data));
};

export const movieAdded = () => {
  return {
    type: MOVIE_ADDED
  };
};
