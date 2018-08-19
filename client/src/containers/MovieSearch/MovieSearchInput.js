import React, { Component } from "react";
import { Jumbotron, Container, Col, Input, Form, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { getMovies, getNextMovies } from "../../store/actions/movie";
import setAuthToken from "../../utility/setAuthToken";

class MovieSearchInput extends Component {
  state = {
    moviesearch: "",
    page: 1,
    typingTimeout: null
  };

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

    this.setState({
      [e.target.name]: e.target.value,
      typingTimeout: setTimeout(() => {
        this.getData(this.state.moviesearch, this.state.page);
      }, 450)
    });
  };

  onKeyDownHandler = e => {
    if (e.keyCode > 0) {
      this.setState({ page: 1 });
    }
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { getMovies, getNextMovies }
)(MovieSearchInput);
