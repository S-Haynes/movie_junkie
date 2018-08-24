import {
  GET_MOVIES,
  GET_MOVIE,
  GET_NEXT_MOVIES,
  CLEAR_MOVIE,
  CLEAR_MOVIES,
  CLEAR_MOVIE_ADDED,
  SET_MOVIES_NOW,
  SET_MOVIES_POPULAR,
  SET_MOVIES_TOP,
  SET_SEARCHED,
  SET_SEARCHED_FALSE
} from "./types";
import axios from "axios";

export const getMovies = (searchTerm, page) => dispatch => {
  dispatch(clearMovieSearch());
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`
    )
    .then(res => {
      if (
        res.data.results === undefined ||
        res.data.results === null ||
        res.data.results.length === 0
      ) {
        dispatch(setSearched());
        dispatch(setMovies({}));
        return;
      }
      dispatch(setMovies(res.data.results));
    })
    .catch(err => console.log(err));
};

// Get next page of movies
export const getNextMovies = (searchTerm, page) => dispatch => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`
    )
    .then(res => {
      if (
        res.data.results === undefined ||
        res.data.results === null ||
        res.data.results.length === 0
      ) {
        return;
      }
      dispatch(setNextMovies(res.data.results));
    })
    .catch(err => console.log(err));
};

// Get Now Playing Movies
export const getMoviesNow = () => dispatch => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/now_playing?${
        process.env.REACT_APP_API_KEY
      }&language=en-US&page=1`
    )
    .then(res => {
      if (
        res.data.results === undefined ||
        res.data.results === null ||
        res.data.results.length === 0
      ) {
        return;
      }
      dispatch(setMoviesNow(res.data.results));
    })
    .catch(err => console.log(err));
};
// Get Now Playing Movies
export const getMoviesTop = () => dispatch => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/top_rated?${
        process.env.REACT_APP_API_KEY
      }&language=en-US&page=1`
    )
    .then(res => {
      if (
        res.data.results === undefined ||
        res.data.results === null ||
        res.data.results.length === 0
      ) {
        return;
      }
      dispatch(setMoviesTop(res.data.results));
    })
    .catch(err => console.log(err));
};
export const getMoviesPopular = () => dispatch => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?${
        process.env.REACT_APP_API_KEY
      }&language=en-US&page=1`
    )
    .then(res => {
      if (
        res.data.results === undefined ||
        res.data.results === null ||
        res.data.results.length === 0
      ) {
        return;
      }
      dispatch(setMoviesPopular(res.data.results));
    })
    .catch(err => console.log(err));
};

// Send movies to state
export const setMovies = movies => {
  return {
    type: GET_MOVIES,
    payload: movies
  };
};

// Send Now Playing Movies to State
export const setMoviesNow = movies => {
  return {
    type: SET_MOVIES_NOW,
    payload: movies
  };
};

export const setMoviesTop = movies => {
  return {
    type: SET_MOVIES_TOP,
    payload: movies
  };
};
export const setMoviesPopular = movies => {
  return {
    type: SET_MOVIES_POPULAR,
    payload: movies
  };
};

export const setNextMovies = data => {
  return {
    type: GET_NEXT_MOVIES,
    payload: data
  };
};

// Get single movie
export const getMovie = id => dispatch => {
  dispatch({
    type: CLEAR_MOVIE_ADDED
  });
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?${
        process.env.REACT_APP_API_KEY
      }&append_to_response=credits`
    )
    .then(res => {
      dispatch(setMovie(res.data));
    })
    .catch(err => console.log(err));
};

// Send single movie to state
export const setMovie = movie => {
  return {
    type: GET_MOVIE,
    payload: movie
  };
};

// clear searched movies
export const clearMovieSearch = () => {
  return {
    type: CLEAR_MOVIES
  };
};

export const setSearched = () => {
  return {
    type: SET_SEARCHED
  };
};
export const setSearchedFalse = () => {
  return {
    type: SET_SEARCHED_FALSE
  };
};

export const clearMovie = () => {
  return {
    type: CLEAR_MOVIE
  };
};
