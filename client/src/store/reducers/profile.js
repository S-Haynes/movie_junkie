import { PROFILE_LOADING, GET_PROFILE, GET_PROFILES } from "../actions/types";

const initialState = {
  profiles: [],
  profile: {},
  loading: false
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
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
