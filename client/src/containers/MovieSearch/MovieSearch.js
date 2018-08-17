import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies } from "../../store/actions/movie";
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
    mounted: false
  };

  componentDidMount() {
    setAuthToken(false);
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.movie.movies) {
      this.setState({ movies: nextProps.movie.movies });
    }

    if (nextProps.movie.searched) {
      this.setState({ searched: nextProps.movie.searched });
    }
  }
  onSubmitHandler = e => {
    e.preventDefault();
    console.log(this.state.moviesearch);
    this.getData(this.state.moviesearch);
  };

  getData = searchTerm => {
    this.props.getMovies(searchTerm);
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value }, e => {
      if (this.state.moviesearch && this.state.moviesearch.length > 1) {
        this.getData(this.state.moviesearch);
      }
    });
  };
  render() {
    const { movies, moviesearch, searched, mounted } = this.state;

    let movieContent = null;

    if (movies && movies.length > 0 && searched) {
      movieContent = <MovieFeed movies={movies} />;
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
                  />
                </FormGroup>
              </Form>
            </Col>
          </Jumbotron>

          {movieContent}

          {searched || (moviesearch.length > 1 && mounted) ? null : (
            <Typist
              className="MyTypist"
              cursor={{ blink: true, fontSize: "60px" }}
              key="typetype"
            >
              <span className="Typist1">What's the hold up?</span>
              <Typist.Backspace count={19} delay={1000} />
              <span className="Typist2">Search for your favorite movie...</span>
            </Typist>
          )}
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
  { getMovies }
)(MovieSearch);
