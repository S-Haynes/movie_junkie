import {
  PROFILE_LOADING,
  GET_PROFILE,
  GET_PROFILES,
  MOVIE_ADDED,
  CLEAR_MOVIE_ADDED,
  DELETE_BUCKET_ITEM,
  DELETE_WATCHED_ITEM
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
    case DELETE_BUCKET_ITEM:
      return {
        ...state,
        profile: {
          ...state.profile,
          movielist: state.profile.movielist.filter(
            movie => movie._id !== action.payload
          )
        }
      };
    case DELETE_WATCHED_ITEM:
      return {
        ...state,
        profile: {
          ...state.profile,
          watchedlist: state.profile.watchedlist.filter(
            movie => movie._id !== action.payload
          )
        }
      };
    default:
      return state;
  }
};

export default reducer;
