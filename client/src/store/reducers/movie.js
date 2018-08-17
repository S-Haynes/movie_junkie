import { GET_MOVIES, GET_MOVIE } from "../actions/types";

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
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
