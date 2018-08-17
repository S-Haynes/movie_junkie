import {} from "./types";
import axios from "axios";

// Register a New User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => console.log(err.response.data));
};
