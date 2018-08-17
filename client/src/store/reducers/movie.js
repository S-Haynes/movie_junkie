import { SET_MOVIES, SET_MOVIE } from "../actions/types";

const initialState = {
  movies: [],
  searched: false,
  movie: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        searched: true
      };
    case SET_MOVIE:
      return {
        ...state,
        movie: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
