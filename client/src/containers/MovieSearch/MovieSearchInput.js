import React, { Component } from "react";
import { Jumbotron, Container, Col, Input, Form, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import {
  getMovies,
  getNextMovies,
  getMoviesNow,
  getMoviesTop,
  getMoviesPopular,
  setSearched,
  clearMovieSearch,
  setSearchedFalse
} from "../../store/actions/movie";
import PropTypes from "prop-types";
import setAuthToken from "../../utility/setAuthToken";
import "./MovieSearch.css";

class MovieSearchInput extends Component {
  state = {
    moviesearch: "",
    page: 1,
    typingTimeout: null
  };
  componentWillMount() {
    this.props.getMoviesNow();
    this.props.getMoviesTop();
    this.props.getMoviesPopular();
  }
  componentDidMount() {
    setAuthToken(false);
    window.onscroll = () => {
      if (
        this.props.movie.searched &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.body.scrollHeight - 150
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
    this.props.setSearchedFalse();
  }

  onSubmitHandler = e => {
    e.preventDefault();
    this.getData(this.state.moviesearch, this.state.page);
  };

  getData = (searchTerm, page) => {
    this.props.getMovies(searchTerm, page);
  };

  onChangeHandler = e => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    this.props.setSearched();
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.props.movie.searched && this.state.moviesearch.length > 0) {
        this.setState({
          typingTimeout: setTimeout(() => {
            this.getData(this.state.moviesearch, this.state.page);
          }, 350)
        });
      }

      if (this.state.moviesearch.length === 0) {
        this.props.clearMovieSearch();
        this.props.setSearchedFalse();
      }
    });
  };

  onKeyDownHandler = e => {
    if (e.keyCode) {
      this.setState({ page: 1 });
    }
  };

  render() {
    const { moviesearch } = this.state;
    return (
      <Container>
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
                  className="no-border"
                  style={{ color: "#111", background: "#777" }}
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
        <div
          className="text-left"
          style={{
            position: "absolute",
            zIndex: "-3",
            top: "50%",
            left: "5%",
            fontSize: "200px",
            opacity: "0.03",
            color: "#ccc",
            height: "400px",
            width: "95%",
            overflow: "hidden"
          }}
        />
      </Container>
    );
  }
}

MovieSearchInput.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovies: PropTypes.func.isRequired,
  getNextMovies: PropTypes.func.isRequired,
  getMoviesNow: PropTypes.func.isRequired,
  getMoviesTop: PropTypes.func.isRequired,
  getMoviesPopular: PropTypes.func.isRequired,
  clearMovieSearch: PropTypes.func.isRequired,
  setSearchedFalse: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(
  mapStateToProps,
  {
    getMovies,
    getNextMovies,
    getMoviesNow,
    getMoviesTop,
    getMoviesPopular,
    setSearched,
    clearMovieSearch,
    setSearchedFalse
  }
)(MovieSearchInput);
