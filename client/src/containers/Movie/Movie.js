import React, { Component } from "react";
import {
  Container,
  Col,
  Row,
  CardImg,
  Card,
  CardText,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";
import "./Movie.css";
import Link from "../../../node_modules/react-router-dom/Link";
import { connect } from "react-redux";
import { getMovie, clearMovie } from "../../store/actions/movie";
import { addToBucketList, addToWatchedList } from "../../store/actions/profile";
import setAuthToken from "../../utility/setAuthToken";
import ImageNotFound from "../../assets/img/image-not-found.png";
import Spinner from "../../components/UI/Spinner/Spinner";

class Movie extends Component {
  state = {
    movie: {},
    movieAdded: null
  };

  async componentDidMount() {
    setAuthToken(false);
    await this.props.getMovie(this.props.match.params.id);
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
  }

  componentWillUnmount() {
    this.props.clearMovie();
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.movie.movie !== prevState.movie ||
      nextProps.profile.movieAdded
    ) {
      return {
        movie: nextProps.movie.movie,
        movieAdded: nextProps.profile.movieAdded
      };
    } else return null;
  }

  bucketListHandler = () => {
    const movieData = {};
    if (this.state.movie.title) movieData.title = this.state.movie.title;
    if (this.state.movie.release_date)
      movieData.year = this.state.movie.release_date;
    if (this.state.movie.vote_average)
      movieData.rated = this.state.movie.vote_average;
    if (this.state.movie.genres)
      movieData.genre = this.state.movie.genres.map(genre => " " + genre.name);
    if (this.state.movie.overview) movieData.plot = this.state.movie.overview;
    if (this.state.movie.poster_path)
      movieData.poster =
        "https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path;

    this.props.addToBucketList(movieData);
  };

  alreadyWatchedHandler = () => {
    const movieData = {};
    if (this.state.movie.title) movieData.title = this.state.movie.title;
    if (this.state.movie.release_date)
      movieData.year = this.state.movie.release_date;
    if (this.state.movie.vote_average)
      movieData.rated = this.state.movie.vote_average;
    if (this.state.movie.genres) movieData.genre = this.state.movie.genres;
    if (this.state.movie.overview) movieData.plot = this.state.movie.overview;
    if (this.state.movie.poster_path)
      movieData.poster =
        "https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path;

    this.props.addToWatchedList(movieData);
  };

  render() {
    const { movie, movieAdded } = this.state;
    const { isAuthenticated } = this.props.auth;
    let movieContent;

    if (Object.keys(movie).length === 0) {
      movieContent = <Spinner />;
    } else {
      movieContent = (
        <div className="single-movie-display" style={{ marginTop: "20px" }}>
          <div className="bg-overlay" />
          {movie.backdrop_path === null ? null : (
            <div
              className="movie-bg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${
                  movie.backdrop_path
                })`
              }}
            />
          )}
          <Container style={{ padding: "0", marginBottom: "10px" }}>
            <Link
              to="/search"
              style={{
                background: "rgba(17, 17, 17, 0.3)"
              }}
              className="btn btn-dark btn-lg"
            >
              {" "}
              Back to Search
            </Link>
          </Container>
          <Container
            style={{
              color: "white",
              backgroundColor: "rgba(17, 17, 17, 0.8)",
              padding: "50px",
              marginBottom: "50px"
            }}
          >
            <Row>
              <Col lg="6">
                <CardImg
                  style={{
                    maxHeight: "500px",
                    minHeight: "300px",
                    minWidth: "200px",
                    marginBottom: "50px"
                  }}
                  src={
                    movie.poster_path === "N/A" ||
                    movie.poster_path === undefined ||
                    movie.poster_path === null
                      ? ImageNotFound
                      : "https://image.tmdb.org/t/p/w500" + movie.poster_path
                  }
                  alt="Poster"
                />
              </Col>
              <Col lg="6">
                <h2 className="mb-4">
                  {movie.title}
                  {movie.release_date === null ||
                  movie.release_date === "" ? null : (
                    <span> ({movie.release_date.slice(0, 4)})</span>
                  )}
                </h2>
                <Jumbotron style={{ background: "#232323" }}>
                  <ListGroup>
                    {movie.genres.length === 0 ||
                    movie.genres === null ? null : (
                      <ListGroupItem>
                        <strong>Genres:</strong>{" "}
                        {movie.genres.map(genre => genre.name + ", ")}
                      </ListGroupItem>
                    )}
                    {movie.release_date === null ||
                    movie.release_date === "" ? null : (
                      <ListGroupItem>
                        <strong>Released:</strong> {movie.release_date}
                      </ListGroupItem>
                    )}
                    {movie.vote_average === null ||
                    movie.vote_average === 0 ? null : (
                      <ListGroupItem>
                        <strong>Rated:</strong> {movie.vote_average}
                      </ListGroupItem>
                    )}
                    {movie.runtime === null || movie.runtime === "0" ? null : (
                      <ListGroupItem>
                        <strong>Runtime:</strong> {movie.runtime} mins
                      </ListGroupItem>
                    )}
                    {movie.revenue === null ||
                    movie.revenue === undefined ||
                    movie.revenue === 0 ? null : (
                      <ListGroupItem>
                        <strong>Box Office:</strong> $
                        {movie.revenue
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </ListGroupItem>
                    )}
                  </ListGroup>
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Container
                  className="no-ads"
                  style={{
                    textAlign: "center",
                    height: "500px"
                  }}
                >
                  <h1>
                    Watch {movie.title} For{" "}
                    <span style={{ color: "red" }}>
                      <em>Free</em>
                    </span>{" "}
                    Below
                  </h1>
                  <p>Adblock must be disabled on this page</p>
                  <p>Ads: 2</p>
                  <iframe
                    title="free-video"
                    style={{
                      backgroundColor: "#000"
                    }}
                    src={`https://videospider.in/getvideo?key=HFO2WcvHbLqz5FAj&video_id=${
                      movie.id
                    }&tmdb=1`}
                    width="100%"
                    height="100%"
                    allowscriptaccess="always"
                    allowFullScreen="true"
                    scrolling="no"
                    frameBorder="0"
                    className="secretvid"
                  />
                </Container>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col style={{ marginTop: "200px" }} md="12">
                <h1>Plot</h1>
              </Col>
              <Col md="12">
                <p>{movie.overview}</p>
              </Col>
              <hr
                style={{
                  width: "80%",
                  border: "1px solid rgba(200, 200, 200, 0.2)"
                }}
              />
            </Row>
            {movie.credits.cast.length === 0 ? null : (
              <div className="d-block text-center">
                <div className="flex-1 text-center">
                  <h3>Lead Cast</h3>
                </div>
                <Row className="mb-4 d-flex justify-content-center">
                  {movie.credits.cast.slice(0, 5).map(actor => (
                    <Col
                      key={actor.credit_id}
                      className="mb-4 mr-4 d-flex justify-content-center"
                      lg="2"
                      md="4"
                      sm="6"
                    >
                      <Card
                        style={{
                          background: "rgb(35, 35, 35)",
                          height: "200px",
                          minWidth: "150px",
                          maxWidth: "200px"
                        }}
                      >
                        <CardImg
                          style={{
                            maxHeight: "100%",
                            minHeight: "100%",
                            minWidth: "100%",
                            maxWidth: "100%",
                            marginBottom: "5px"
                          }}
                          src={
                            actor.profile_path === "N/A" ||
                            actor.profile_path === undefined ||
                            actor.profile_path === null
                              ? ImageNotFound
                              : "https://image.tmdb.org/t/p/original" +
                                actor.profile_path
                          }
                          alt="Actor"
                        />
                        <CardText>{actor.name}</CardText>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <hr
                  style={{
                    width: "80%",
                    border: "1px solid rgba(200, 200, 200, 0.2)"
                  }}
                />
              </div>
            )}

            <div className="text-center">
              {isAuthenticated ? (
                <div>
                  {" "}
                  {movieAdded ? (
                    <h3>{movie.title} has been added to your list.</h3>
                  ) : (
                    <span>
                      <div className="text-center d-block">
                        <h3>Have you watched {movie.title}?</h3>
                      </div>
                      <div className="mt-4 mx-auto text-center">
                        <Button
                          onClick={this.bucketListHandler}
                          className="mb-3 mr-4"
                        >
                          Add to Bucketlist
                        </Button>
                        <Button
                          className="mb-3 mr-4"
                          onClick={this.alreadyWatchedHandler}
                        >
                          Already Watched
                        </Button>
                      </div>
                    </span>
                  )}{" "}
                </div>
              ) : (
                <h4>
                  <Link to="/register">Sign Up</Link> to add movies to your
                  watch list.
                </h4>
              )}
            </div>
          </Container>
        </div>
      );
    }
    return movieContent;
  }
}

const mapStateToProps = state => ({
  movie: state.movie,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMovie, addToBucketList, addToWatchedList, clearMovie }
)(Movie);
