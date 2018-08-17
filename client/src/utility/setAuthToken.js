import axios from "axios";

const setAuthToken = token => {
  // Check if token is passed in
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
