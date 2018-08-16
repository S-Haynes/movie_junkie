import React, { Component } from "react";
import axios from "axios";

class Movie extends Component {
  state = {
    movie: {}
  };

  componentDidMount() {
    axios
      .get(
        "http://www.omdbapi.com/?i=" +
          this.props.match.params.id +
          "&apikey=108b0f56"
      )
      .then(res => {
        this.setState({ movie: res.data });
        console.log(this.state.movie);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>TODO: Show Movie</h1>
      </div>
    );
  }
}

export default Movie;
