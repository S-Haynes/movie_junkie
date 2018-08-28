import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getMovies,
  clearMovieSearch,
  getNextMovies
} from "../../store/actions/movie";
import { Container, Row, Col, Jumbotron } from "reactstrap";
import PropTypes from "prop-types";
import MovieFeed from "../../components/MovieFeed/MovieFeed";
import "react-typist/dist/Typist.css";
import "./MovieSearch.css";
import setAuthToken from "../../utility/setAuthToken";
import MovieSearchInput from "./MovieSearchInput";
import Spinner from "../../components/UI/Spinner/Spinner";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

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
        <CSSTransition key="moviesearch" classNames="fade" timeout={500}>
          <div>
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
          </div>
        </CSSTransition>
      );
    } else if (movies.length === 0 && !searched && moviesNow.length > 0) {
      movieContent = (
        <CSSTransition key="moviesnow" classNames="fadenow" timeout={300}>
          <div>
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
          </div>
        </CSSTransition>
      );
    } else if (movies.length === 0 && searched) {
      movieContent = (
        <CSSTransition key="spinner" timeout={0} classNames="fade-spinner">
          <Container className="pt-4">
            <Spinner />
          </Container>
        </CSSTransition>
      );
    } else if (searched) {
      movieContent = (
        <CSSTransition key="nomovies" timeout={0} classNames="fade-spinner">
          <Container className="pt-4">
            <h1>No Movies found by that name, keep searching...</h1>
          </Container>
        </CSSTransition>
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
              <Col md="8" style={{ maxWidth: "800px" }}>
                <TransitionGroup component={null} exit={false}>
                  {movieContent}
                </TransitionGroup>
              </Col>
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

MovieSearch.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovies: PropTypes.func.isRequired,
  clearMovieSearch: PropTypes.func.isRequired,
  getNextMovies: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { getMovies, clearMovieSearch, getNextMovies }
)(MovieSearch);
