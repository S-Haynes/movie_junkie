import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  user: {},
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.auth
      };
    default:
      return state;
  }
};

export default reducer;
