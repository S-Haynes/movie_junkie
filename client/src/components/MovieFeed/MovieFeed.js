import React from "react";
import MovieItem from "./MovieItem/MovieItem";
import { Row } from "reactstrap";

const MovieFeed = props => {
  const { movies } = props;
  const movieContent = movies.map(movie => (
    <MovieItem key={movie.id + Math.random() * 10000} movie={movie} />
  ));
  return <Row>{movieContent}</Row>;
};

export default MovieFeed;
