import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";

import Layout from "./containers/Layout/Layout";
import MovieSearch from "./containers/MovieSearch/MovieSearch";
import Movie from "./containers/Movie/Movie";
import Home from "./components/Home/Home";

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
              </Switch>
            </div>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
