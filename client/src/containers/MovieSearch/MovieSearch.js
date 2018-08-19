import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getMovies,
  clearMovieSearch,
  getNextMovies
} from "../../store/actions/movie";
import { Container } from "reactstrap";
import MovieFeed from "../../components/MovieFeed/MovieFeed";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import "./MovieSearch.css";
import setAuthToken from "../../utility/setAuthToken";
import MovieSearchInput from "./MovieSearchInput";

class MovieSearch extends Component {
  state = {
    movies: [],
    searched: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.movie.movies !== prevState.movies ||
      nextProps.movie.searched !== prevState.searched
    ) {
      return {
        movies: nextProps.movie.movies,
        searched: nextProps.movie.searched
      };
    } else return null;
  }

  componentWillUnmount() {
    this.props.clearMovieSearch();
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
    window.onscroll = null;
  }

  render() {
    const { movies, searched } = this.state;

    let movieContent = null;

    if (movies && movies.length > 0 && searched) {
      movieContent = (
        <div>
          <Container>
            <p>Scroll down for additional movies results.</p>
          </Container>
          <MovieFeed movies={movies} />
        </div>
      );
    } else if (!searched) {
      movieContent = null;
    } else {
      movieContent = <p>Nothing found yet, keep searching...</p>;
    }

    return (
      <div>
        <Container style={{ marginTop: "50px" }}>
          <MovieSearchInput />
          <div className="movie-content-body">{movieContent}</div>

          {/* {searched || (moviesearch.length > 1 && mounted) ? null : (
            <Typist
              className="MyTypist"
              cursor={{ blink: true, fontSize: "60px" }}
              key="typetype"
            >
              <span className="Typist1">What's the hold up?</span>
              <Typist.Backspace count={19} delay={1000} />
              <span className="Typist2">Search for your favorite movie...</span>
            </Typist>
          )} */}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { getMovies, clearMovieSearch, getNextMovies }
)(MovieSearch);
