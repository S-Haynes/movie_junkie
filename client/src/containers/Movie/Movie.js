import React, { Component } from "react";
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
import Link from "../../../node_modules/react-router-dom/Link";
import { connect } from "react-redux";
import { getMovie } from "../../store/actions/movie";
import setAuthToken from "../../utility/setAuthToken";

class Movie extends Component {
  state = {
    movie: {}
  };

  componentDidMount() {
    setAuthToken(false);
    this.props.getMovie(this.props.match.params.id);
  }

  componentWillUnmount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie.movie) {
      this.setState({ movie: nextProps.movie.movie });
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <div style={{ marginTop: "50px" }}>
        <Container style={{ padding: "0", marginBottom: "10px" }}>
          <Link to="/search" className="btn btn-outline-dark btn-lg">
            {" "}
            Back to Search
          </Link>
        </Container>
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

const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { getMovie }
)(Movie);
