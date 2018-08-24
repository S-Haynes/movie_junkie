import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getMovies,
  clearMovieSearch,
  getNextMovies
} from "../../store/actions/movie";
import { Container, Row, Col, Jumbotron } from "reactstrap";
import MovieFeed from "../../components/MovieFeed/MovieFeed";
import "react-typist/dist/Typist.css";
import "./MovieSearch.css";
import setAuthToken from "../../utility/setAuthToken";
import MovieSearchInput from "./MovieSearchInput";
import Spinner from "../../components/UI/Spinner/Spinner";

class MovieSearch extends Component {
  state = {
    movies: [],
    moviesTop: [],
    moviesPopular: [],
    searched: false,
    moviesNow: [],
    randomNumNow: Math.floor(Math.random() * 4),
    randomNumTop: Math.floor(Math.random() * 8)
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.movie.movies !== prevState.movies ||
      nextProps.movie.searched !== prevState.searched ||
      nextProps.movie.moviesNow !== prevState.moviesNow ||
      nextProps.movie.moviesTop !== prevState.moviesTop ||
      nextProps.movie.moviesPopular !== prevState.moviesPopular
    ) {
      return {
        movies: nextProps.movie.movies,
        searched: nextProps.movie.searched,
        moviesNow: nextProps.movie.moviesNow,
        moviesTop: nextProps.movie.moviesTop,
        moviesPopular: nextProps.movie.moviesPopular
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
    const {
      movies,
      searched,
      moviesNow,
      moviesTop,
      moviesPopular,
      randomNumNow,
      randomNumTop
    } = this.state;

    let movieContent = null;

    if (movies && movies.length > 0 && searched) {
      movieContent = (
        <Col md="8">
          <Container>
            <p>Scroll down for additional movies results.</p>
          </Container>

          <MovieFeed
            titleLength={20}
            overlayOffset="-100px"
            colLg="3"
            colMd="4"
            colSm="4"
            col="12"
            minHeight="250px"
            maxHeight="250px"
            minWidth="150px"
            maxWidth="300px"
            movies={movies}
          />
        </Col>
      );
    } else if (movies.length === 0 && !searched && moviesNow.length > 0) {
      movieContent = (
        <Col style={{ maxWidth: "800px" }} md="8">
          <Container>
            <p>
              In theatres{" "}
              <span
                className="blink"
                style={{
                  color: "red"
                }}
              >
                <em>NOW</em>
              </span>
            </p>
          </Container>

          <MovieFeed
            titleLength={30}
            overlayOffset="-100px"
            colLg="3"
            colMd="4"
            colSm="4"
            col="12"
            minHeight="250px"
            maxHeight="250px"
            minWidth="150px"
            maxWidth="280px"
            movies={moviesNow.slice(randomNumNow, 16 + randomNumNow)}
          />
        </Col>
      );
    } else if (movies && movies.length === 0 && searched) {
      movieContent = (
        <Col md="8">
          <Container className="pt-4">
            <Spinner />
          </Container>
        </Col>
      );
    } else {
      movieContent = (
        <Col md="8">
          <Container className="pt-4">
            <h1>No Movies found by that name, keep searching...</h1>
          </Container>
        </Col>
      );
    }

    return (
      <div>
        <Container
          className="mx-auto"
          style={{ marginTop: "50px", maxWidth: "1200px" }}
        >
          <MovieSearchInput />
          <div className="movie-content-body">
            <Row>
              {movieContent}
              <Col md="4">
                <Row>
                  <Col xs="12">
                    <Jumbotron
                      style={{
                        background: "#111",
                        textAlign: "center",
                        padding: "10px"
                      }}
                    >
                      <h4>Top Rated</h4>
                      <hr
                        style={{
                          marginTop: "-2px",
                          border: "1px solid rgba(255, 0, 0, 0.7)",
                          width: "5%",
                          opacity: "0.5"
                        }}
                      />
                      <MovieFeed
                        titleLength={10}
                        colSm="4"
                        col="6"
                        width="150px"
                        height="150px"
                        minwidth="60px"
                        movies={moviesTop.slice(randomNumTop, 6 + randomNumTop)}
                      />
                    </Jumbotron>
                  </Col>
                  <Col xs="12">
                    <Jumbotron
                      style={{
                        background: "#111",
                        textAlign: "center",
                        padding: "10px"
                      }}
                    >
                      <h4>Popular</h4>
                      <hr
                        style={{
                          marginTop: "-2px",
                          border: "1px solid rgba(255, 0, 0, 0.7)",
                          width: "5%",
                          opacity: "0.5"
                        }}
                      />
                      <MovieFeed
                        titleLength={10}
                        colSm="4"
                        col="6"
                        width="150px"
                        height="150px"
                        minwidth="60px"
                        movies={moviesPopular.slice(
                          randomNumTop,
                          6 + randomNumTop
                        )}
                      />
                    </Jumbotron>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
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
