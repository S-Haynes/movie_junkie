import React, { Component } from "react";
import "./App.css";
import Layout from "./containers/Layout/Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MovieSearch from "./containers/MovieSearch/MovieSearch";
import Movie from "./containers/Movie/Movie";
import Home from "./components/Home/Home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <div className="App">
              <Route exact path="/" component={Home} />
              <Route exact path="/search" component={MovieSearch} />
              <Route exact path="/movie/:id" component={Movie} />
            </div>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
