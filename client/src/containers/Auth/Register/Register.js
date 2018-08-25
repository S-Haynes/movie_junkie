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
import "./Register.css";
import { registerUser } from "../../../store/actions/auth";
import BackgroundOverlay from "../../../components/UI/BackgroundOverlay/BackgroundOverlay";
import AuthBg from "../../../assets/img/auth-bg.jpg";

class Register extends Component {
  state = {
    username: "",
    password: "",
    displayname: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const { username, password, displayname } = this.state;

    const newUser = {
      username: username,
      password: password,
      displayname: displayname
    };

    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { username, password, displayname } = this.state;
    return (
      <div>
        <BackgroundOverlay url={AuthBg} />
        <div className="register">
          <Container>
            <Jumbotron style={{ background: "rgba(17, 17, 17, 0.7)" }}>
              <div className="text-center">
                <h3>Register</h3>
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
                <FormGroup>
                  <Label for="displayname">Display Name</Label>
                  <Input
                    value={displayname}
                    name="displayname"
                    id="displayname"
                    placeholder="Display Name"
                    onChange={e => this.onChangeHandler(e)}
                  />
                  {this.props.error.displayname ? (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {this.props.error.displayname}
                    </p>
                  ) : null}
                </FormGroup>
                <div className="text-center mt-4">
                  <Button>Register</Button>
                </div>
              </Form>
            </Jumbotron>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
