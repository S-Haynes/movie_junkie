import { GET_MOVIES, GET_MOVIE } from "./types";
import axios from "axios";

// Get all movies from api
export const getMovies = searchTerm => dispatch => {
  axios
    .get("http://www.omdbapi.com/?s=" + searchTerm + "&apikey=108b0f56")
    .then(res => dispatch(setMovies(res.data.Search)))
    .catch(err => console.log(err));
};

// Send movies to state
export const setMovies = data => {
  return {
    type: GET_MOVIES,
    payload: data
  };
};

// Get single movie
export const getMovie = id => dispatch => {
  axios
    .get("http://www.omdbapi.com/?i=" + id + "&apikey=108b0f56")
    .then(res => dispatch(setMovie(res.data)))
    .catch(err => console.log(err));
};

// Send single movie to state
export const setMovie = movie => {
  return {
    type: GET_MOVIE,
    payload: movie
  };
};
