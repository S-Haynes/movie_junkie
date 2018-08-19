import {
  GET_MOVIES,
  GET_MOVIE,
  GET_NEXT_MOVIES,
  CLEAR_MOVIE,
  CLEAR_MOVIES,
  CLEAR_MOVIE_ADDED
} from "./types";
import axios from "axios";

// Get all movies from api
export const getMovies = (searchTerm, page) => dispatch => {
  dispatch(clearMovieSearch());
  axios
    .get(
      "http://www.omdbapi.com/?s=" +
        searchTerm +
        "&apikey=108b0f56" +
        "&page=" +
        page
    )
    .then(res => {
      if (res.data.Search === undefined || res.data.Search === null) {
        return;
      }
      dispatch(setMovies(res.data.Search));
    })
    .catch(err => console.log(err));
};

//Get next page of movies
export const getNextMovies = (searchTerm, page) => dispatch => {
  axios
    .get(
      "http://www.omdbapi.com/?s=" +
        searchTerm +
        "&apikey=108b0f56" +
        "&page=" +
        page
    )
    .then(res => {
      if (res.data.Search === undefined || res.data.Search === null) {
        return;
      }
      dispatch(setNextMovies(res.data.Search));
    })
    .catch(err => console.log(err));
};

// Send movies to state
export const setMovies = data => {
  return {
    type: GET_MOVIES,
    payload: data
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
    .get("http://www.omdbapi.com/?i=" + id + "&apikey=108b0f56&plot=full")
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

export const clearMovie = () => {
  return {
    type: CLEAR_MOVIE
  };
};

// export const getMovies = (searchTerm, page) => dispatch => {
//   dispatch(clearMovieSearch());
//   axios
//     .get(
//       "https://api.themoviedb.org/3/search/movie?api_key=f8bb5321b2ac567dcd6e70a2e065f9a9&language=en-US&query=" +
//         searchTerm +
//         "&page=" +
//         page +
//         "&include_adult=false"
//     )
//     .then(res => {
//       if (
//         res.data.results === undefined ||
//         res.data.results === null ||
//         res.data.results.length === 0
//       ) {
//         return;
//       }
//       dispatch(setMovies(res.data.results));
//     })
//     .catch(err => console.log(err));
// };

// // Get next page of movies
// export const getNextMovies = (searchTerm, page) => dispatch => {
//   axios
//     .get(
//       "https://api.themoviedb.org/3/search/movie?api_key=f8bb5321b2ac567dcd6e70a2e065f9a9&language=en-US&query=" +
//         searchTerm +
//         "&page=" +
//         page +
//         "&include_adult=false"
//     )
//     .then(res => {
//       if (
//         res.data.results === undefined ||
//         res.data.results === null ||
//         res.data.results.length === 0
//       ) {
//         return;
//       }
//       dispatch(setNextMovies(res.data.results));
//     })
//     .catch(err => console.log(err));
// };
