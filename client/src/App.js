import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";

import Layout from "./containers/Layout/Layout";
import MovieSearch from "./containers/MovieSearch/MovieSearch";
import Movie from "./containers/Movie/Movie";
import Register from "./containers/Auth/Register/Register";
import Login from "./containers/Auth/Login/Login";
import Home from "./components/Home/Home";
import Dashboard from "./containers/Dashboard/Dashboard";
import Profiles from "./containers/Profiles/Profiles";
import Profile from "./containers/Profile/Profile";

import setAuthToken from "./utility/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/auth";
import jwt_decode from "jwt-decode";

// Check if token is in local storage
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  // Set auth header
  setAuthToken(token);

  // Set user state
  const decodedUser = jwt_decode(token);
  store.dispatch(setCurrentUser(decodedUser, true));

  // Check if token expired
  const currentTime = Date.now() / 1000;

  // Logout the user after one hour
  setTimeout(() => {
    store.dispatch(logoutUser());
    //relocate the user
    window.location.href = "/login";
  }, 3600000);

  // Logout the user on page refresh if token is expired
  if (decodedUser.exp < currentTime) {
    store.dispatch(logoutUser());
    //relocate the user
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <div className="App">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/search" component={MovieSearch} />
                <Route exact path="/movie/:id" component={Movie} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:displayname" component={Profile} />
              </Switch>
            </div>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
