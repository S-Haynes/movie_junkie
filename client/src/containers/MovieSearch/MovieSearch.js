import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  Container,
  Row,
  Col,
  Input,
  Form,
  FormGroup
} from "reactstrap";
import axios from "axios";
import MovieFeed from "../../components/MovieFeed/MovieFeed";

class MovieSearch extends Component {
  state = {
    moviesearch: "",
    movies: [],
    searched: false
  };

  onSubmitHandler = e => {
    e.preventDefault();
    console.log(this.state.moviesearch);

    axios
      .get(
        "http://www.omdbapi.com/?s=" +
          this.state.moviesearch +
          "&apikey=108b0f56"
      )
      .then(res => {
        this.setState({ movies: res.data.Search, searched: true });
        console.log(this.state.movies);
      })
      .catch(err => console.log(err));
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { movies, moviesearch, searched } = this.state;

    let movieContent = null;

    if (movies && movies.length > 0 && searched) {
      movieContent = <MovieFeed movies={movies} />;
    } else if (!searched) {
      movieContent = null;
    } else {
      movieContent = <p>No movies found...</p>;
    }
    return (
      <div>
        <Jumbotron style={{ textAlign: "center" }}>
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
              <Button>Submit</Button>
            </Form>
          </Col>
        </Jumbotron>
        {movieContent}
      </div>
    );
  }
}

export default MovieSearch;
