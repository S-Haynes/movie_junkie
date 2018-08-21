import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getMovies,
  clearMovieSearch,
  getNextMovies
} from "../../store/actions/movie";
import { Container, Row, Col, Jumbotron } from "reactstrap";
import MovieFeed from "../../components/MovieFeed/MovieFeed";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import "./MovieSearch.css";
import setAuthToken from "../../utility/setAuthToken";
import MovieSearchInput from "./MovieSearchInput";

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
      popularMovies,
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
            titleLength={30}
            overlayOffset="-100px"
            colLg="3"
            colMd="6"
            height="250px"
            width="250px"
            movies={movies}
          />
        </Col>
      );
    } else if (!searched && moviesNow.length > 0) {
      movieContent = (
        <Col md="8">
          <Container>
            <p>
              In theatres{" "}
              <span
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
            colMd="6"
            height="250px"
            width="250px"
            movies={moviesNow.slice(randomNumNow, 16 + randomNumNow)}
          />
        </Col>
      );
    }

    return (
      <div>
        <Container style={{ marginTop: "50px", maxWidth: "90%" }}>
          <MovieSearchInput />
          <div className="movie-content-body">
            <Row>
              {movieContent}
              <Col className="ml-auto" md="4">
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
                          border: "1px solid #999",
                          width: "15%",
                          opacity: "0.5"
                        }}
                      />
                      <MovieFeed
                        titleLength={10}
                        colLg="4"
                        colMd="6"
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
                          border: "1px solid #999",
                          width: "15%",
                          opacity: "0.5"
                        }}
                      />
                      <MovieFeed
                        titleLength={10}
                        colLg="4"
                        colMd="6"
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
