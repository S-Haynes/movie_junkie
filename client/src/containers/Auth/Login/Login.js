import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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
import { loginUser, clearErrors } from "../../../store/actions/auth";
import BackgroundOverlay from "../../../components/UI/BackgroundOverlay/BackgroundOverlay";
import AuthBg from "../../../assets/img/auth-bg.jpg";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  componentWillUnmount() {
    this.props.clearErrors();
  }

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
    const { isAuthenticated } = this.props.auth;

    let redirect;

    if (isAuthenticated) {
      redirect = <Redirect to="/dashboard" />;
    } else {
      redirect = null;
    }
    return (
      <div className="login">
        {redirect}
        <BackgroundOverlay url={AuthBg} />
        <Container>
          <Jumbotron style={{ background: "rgba(17, 17, 17, 0.7)" }}>
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
                {this.props.error.username ? (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {this.props.error.username}
                  </p>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={e => this.onChangeHandler(e)}
                />
                {this.props.error.password ? (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {this.props.error.password}
                  </p>
                ) : null}
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

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login);
