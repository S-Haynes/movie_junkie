import {
  GET_MOVIES,
  GET_MOVIE,
  CLEAR_MOVIE,
  CLEAR_MOVIES,
  GET_NEXT_MOVIES,
  SET_MOVIES_NOW,
  SET_MOVIES_POPULAR,
  SET_MOVIES_TOP,
  SET_SEARCHED,
  SET_SEARCHED_FALSE
} from "../actions/types";

const initialState = {
  moviesNow: [],
  moviesTop: [],
  moviesPopular: [],
  movies: [],
  searched: false,
  movie: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        searched: true
      };
    case GET_NEXT_MOVIES:
      return {
        ...state,
        movies: [...state.movies.concat(action.payload)]
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
        searched: false
      };
    case SET_MOVIES_NOW:
      return {
        ...state,
        moviesNow: action.payload
      };
    case SET_MOVIES_POPULAR:
      return {
        ...state,
        moviesPopular: action.payload
      };
    case SET_MOVIES_TOP:
      return {
        ...state,
        moviesTop: action.payload
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: []
      };
    case CLEAR_MOVIE:
      return {
        ...state,
        movie: {}
      };
    case SET_SEARCHED:
      return {
        ...state,
        searched: true
      };
    case SET_SEARCHED_FALSE:
      return {
        ...state,
        searched: false
      };
    default:
      return state;
  }
};

export default reducer;
