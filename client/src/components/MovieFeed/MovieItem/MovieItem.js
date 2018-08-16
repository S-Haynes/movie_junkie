import React from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";

const MovieItem = props => {
  const { movie } = props;
  return (
    <Col md="3" sm="6">
      <Container>
        <Card
          className="ml-auto mr-auto mb-3"
          style={{ minHeight: "450px", maxHeight: "450px", maxWidth: "300px" }}
        >
          <CardImg
            top
            width="100%"
            style={{ minHeight: "300px", maxHeight: "300px" }}
            src={movie.Poster}
            alt="poster"
          />
          <CardBody>
            <CardTitle>{movie.Title.slice(0, 30) + "..."}</CardTitle>
            <CardSubtitle>{movie.Year}</CardSubtitle>
          </CardBody>
          <Link to={"movie/" + movie.imdbID} className="btn btn-sm btn-light">
            More Info
          </Link>
        </Card>
      </Container>
    </Col>
  );
};

export default MovieItem;
