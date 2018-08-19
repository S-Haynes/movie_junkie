import {
  GET_MOVIES,
  GET_MOVIE,
  CLEAR_MOVIE,
  CLEAR_MOVIES,
  GET_NEXT_MOVIES
} from "../actions/types";

const initialState = {
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
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: [],
        searched: false
      };
    case CLEAR_MOVIE:
      return {
        ...state,
        movie: {}
      };
    default:
      return state;
  }
};

export default reducer;
