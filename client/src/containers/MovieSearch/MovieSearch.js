import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  Container,
  Col,
  Input,
  Form,
  FormGroup
} from "reactstrap";
import axios from "axios";
import MovieFeed from "../../components/MovieFeed/MovieFeed";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import "./MovieSearch.css";

class MovieSearch extends Component {
  state = {
    moviesearch: "",
    movies: [],
    searched: false
  };

  onSubmitHandler = e => {
    e.preventDefault();
    console.log(this.state.moviesearch);
    this.getData();
  };

  getData = () => {
    axios
      .get(
        "http://www.omdbapi.com/?s=" +
          this.state.moviesearch +
          "&apikey=108b0f56"
      )
      .then(res => {
        this.setState({
          movies: res.data.Search,
          searched: true
        });
      })
      .catch(err => console.log(err));
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value }, e => {
      if (this.state.moviesearch && this.state.moviesearch.length > 1) {
        this.getData();
      }
    });
  };
  render() {
    const { movies, moviesearch, searched } = this.state;

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

                {/* {moviesearch.length > 0 ? <Button>Search</Button> : null} */}
              </Form>
            </Col>
          </Jumbotron>

          {movieContent}

          {searched ? null : (
            <Typist
              className="MyTypist"
              cursor={{ blink: true, fontSize: "60px" }}
            >
              <span className="Typist1">What's the hold up?</span>
              <Typist.Backspace count={19} delay={500} />
              <span className="Typist2">Search for your favorite movie...</span>
            </Typist>
          )}
        </Container>
      </div>
    );
  }
}

export default MovieSearch;
