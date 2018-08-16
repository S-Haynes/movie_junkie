import React, { Component } from "react";
import "./App.css";
import Layout from "./containers/Layout/Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MovieSearch from "./containers/MovieSearch/MovieSearch";
import Movie from "./containers/Movie/Movie";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route exact path="/" component={MovieSearch} />
              <Route exact path="/movie/:id" component={Movie} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
