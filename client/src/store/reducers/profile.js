import {
  PROFILE_LOADING,
  GET_PROFILE,
  GET_PROFILES,
  MOVIE_ADDED,
  CLEAR_MOVIE_ADDED
} from "../actions/types";

const initialState = {
  profiles: [],
  profile: {},
  loading: false,
  movieAdded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        movieAdded: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case MOVIE_ADDED:
      return {
        ...state,
        movieAdded: true
      };
    case CLEAR_MOVIE_ADDED:
      return {
        ...state,
        movieAdded: false
      };
    default:
      return state;
  }
};

export default reducer;
