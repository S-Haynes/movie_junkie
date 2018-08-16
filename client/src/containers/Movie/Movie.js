import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Col,
  Row,
  CardImg,
  Jumbotron,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import "./Movie.css";

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
    const { movie } = this.state;
    return (
      <div style={{ marginTop: "50px" }}>
        <Container
          style={{ color: "white", background: "#111", padding: "50px" }}
        >
          <Row>
            <Col lg="6">
              <CardImg
                style={{
                  maxHeight: "600px",
                  minHeight: "300px",
                  minWidth: "200px",
                  marginBottom: "50px"
                }}
                src={movie.Poster}
                alt="Poster"
              />
            </Col>
            <Col lg="6">
              <h2 className="mb-4">
                {movie.Title} ({movie.Year})
              </h2>
              <Jumbotron style={{ background: "#232323" }}>
                <ListGroup>
                  {movie.Actors === "N/A" ? null : (
                    <ListGroupItem>
                      <strong>Actors:</strong> {movie.Actors}
                      {movie.Director === "N/A" ? null : (
                        <div className="mt-3">
                          <strong>Director:</strong> {movie.Director}
                        </div>
                      )}
                      <hr
                        style={{
                          width: "100%",
                          border: "1px solid rgba(200, 200, 200, 0.2)",
                          marginBottom: "0"
                        }}
                      />
                    </ListGroupItem>
                  )}
                  {movie.Genre === "N/A" ? null : (
                    <ListGroupItem>
                      <strong>Genre:</strong> {movie.Genre}
                    </ListGroupItem>
                  )}
                  {movie.Released === "N/A" ? null : (
                    <ListGroupItem>
                      <strong>Released:</strong> {movie.Released}
                    </ListGroupItem>
                  )}
                  {movie.Rated === "N/A" ? null : (
                    <ListGroupItem>
                      <strong>Rated:</strong> {movie.Rated}
                    </ListGroupItem>
                  )}
                  {movie.Runtime === "N/A" ? null : (
                    <ListGroupItem>
                      <strong>Runtime:</strong> {movie.Runtime}
                    </ListGroupItem>
                  )}
                  {movie.BoxOffice === "N/A" ||
                  movie.BoxOffice === undefined ? null : (
                    <ListGroupItem>
                      <strong>Box Office:</strong> {movie.BoxOffice}
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Jumbotron>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md="12">
              <h1>Plot</h1>
            </Col>
            <Col md="12">
              <p>{movie.Plot}</p>
            </Col>
            <hr
              style={{
                width: "80%",
                border: "1px solid rgba(200, 200, 200, 0.2)"
              }}
            />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Movie;
