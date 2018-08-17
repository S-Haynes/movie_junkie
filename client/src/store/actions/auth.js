import { SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utility/setAuthToken";

// Register a New User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => console.log(err.response.data));
};

// Login a user and return token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;

      // Set the auth token header
      setAuthToken(token);

      // Decode the token to the user info
      const decodedUser = jwt_decode(token);

      // Send the current user to the state
      dispatch(setCurrentUser(decodedUser));
    })
    .catch(err => console.log(err.response.data));
};

export const setCurrentUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  };
};
