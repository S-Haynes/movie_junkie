import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  MOVIE_ADDED,
  DELETE_BUCKET_ITEM,
  DELETE_WATCHED_ITEM
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

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => dispatch(setCurrentProfiles(res.data)))
    .catch(err => console.log(err.response.data));
};

export const getProfileByDisplayName = name => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/displayname/" + name)
    .then(res => dispatch(setCurrentProfile(res.data)))
    .catch(err => console.log(err.response.data));
};

export const setCurrentProfiles = profiles => {
  return {
    type: GET_PROFILES,
    payload: profiles
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

export const deleteBucketItem = id => dispatch => {
  axios
    .delete("/api/profile/bucketlist/" + id)
    .then(res =>
      dispatch({
        type: DELETE_BUCKET_ITEM,
        payload: id
      })
    )
    .catch(err => console.log(err.response.data));
};
export const deleteWatchedItem = id => dispatch => {
  axios
    .delete("/api/profile/alreadywatched/" + id)
    .then(res =>
      dispatch({
        type: DELETE_WATCHED_ITEM,
        payload: id
      })
    )
    .catch(err => console.log(err.response.data));
};

export const movieAdded = () => {
  return {
    type: MOVIE_ADDED
  };
};
