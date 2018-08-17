import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  FormGroup,
  Label,
  Input,
  Form,
  Jumbotron,
  Button
} from "reactstrap";
import "./Login.css";
import { loginUser } from "../../../store/actions/auth";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const { username, password } = this.state;

    const userData = {
      username: username,
      password: password
    };

    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="login">
        <Container>
          <Jumbotron style={{ background: "#111" }}>
            <div className="text-center">
              <h3>Login</h3>
            </div>
            <Form onSubmit={e => this.onSubmitHandler(e)}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  value={username}
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={e => this.onChangeHandler(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  value={password}
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={e => this.onChangeHandler(e)}
                />
              </FormGroup>
              <div className="text-center mt-4">
                <Button>Login</Button>
              </div>
            </Form>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default connect(
  null,
  { loginUser }
)(Login);
