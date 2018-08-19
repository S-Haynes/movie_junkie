import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getMovies,
  clearMovieSearch,
  getNextMovies
} from "../../store/actions/movie";
import { Jumbotron, Container, Col, Input, Form, FormGroup } from "reactstrap";
import MovieFeed from "../../components/MovieFeed/MovieFeed";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import "./MovieSearch.css";
import setAuthToken from "../../utility/setAuthToken";

class MovieSearch extends Component {
  state = {
    moviesearch: "",
    movies: [],
    searched: false,
    mounted: false,
    page: 1
  };

  componentDidMount() {
    setAuthToken(false);
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.body.scrollHeight
      ) {
        this.setState(prevState => {
          return {
            page: prevState.page + 1
          };
        });

        this.props.getNextMovies(this.state.moviesearch, this.state.page);
      }
    };
  }

  componentWillUnmount() {
    this.props.clearMovieSearch();
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
    window.onscroll = null;
  }

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

  onSubmitHandler = e => {
    e.preventDefault();
    console.log(this.state.moviesearch);
    this.getData(this.state.moviesearch, this.state.page);
  };

  getData = (searchTerm, page) => {
    this.props.getMovies(searchTerm, page);
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value }, e => {
      if (this.state.moviesearch) {
        this.getData(this.state.moviesearch, this.state.page);
      }
    });
  };

  onKeyDownHandler = e => {
    if (e.keyCode > 0) {
      this.setState({ page: 1 });
    }
  };

  render() {
    const { movies, moviesearch, searched, mounted } = this.state;

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
          <Jumbotron
            style={{
              textAlign: "center",
              background: "rgba(100, 100, 100, 0.1)"
            }}
          >
            <Col>
              <Form onSubmit={e => this.onSubmitHandler(e)}>
                <FormGroup>
                  <Input
                    value={moviesearch}
                    type="text"
                    name="moviesearch"
                    placeholder="Search for Movies"
                    onChange={e => this.onChangeHandler(e)}
                    onKeyDown={e => this.onKeyDownHandler(e)}
                  />
                </FormGroup>
              </Form>
            </Col>
          </Jumbotron>
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
