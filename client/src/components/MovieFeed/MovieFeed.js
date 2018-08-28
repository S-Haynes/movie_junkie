import React from "react";
import MovieItem from "./MovieItem/MovieItem";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import "./Moviefeed.css";

const MovieFeed = props => {
  const { movies } = props;
  const movieContent = movies.map(movie => (
    <MovieItem
      key={movie.id + Math.random() * 10000}
      movie={movie}
      {...props}
    />
  ));
  return <Row>{movieContent}</Row>;
};

MovieFeed.propTypes = {
  movies: PropTypes.array.isRequired
};
export default MovieFeed;
