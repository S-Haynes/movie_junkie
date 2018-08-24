import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./InfoControls.css";
import InfoDisplay from "./InfoDisplay/InfoDisplay";

class InfoControls extends Component {
  state = {
    signUp: true,
    search: false,
    list: false
  };

  onSignUpClick = () => {
    this.setState((prevState, props) => {
      return {
        signUp: true,
        search: false,
        list: false
      };
    });
  };
  onSearchClick = () => {
    this.setState((prevState, props) => {
      return {
        search: true,
        signUp: false,
        list: false
      };
    });
  };
  onListClick = () => {
    this.setState((prevState, props) => {
      return {
        list: true,
        signUp: false,
        search: false
      };
    });
  };
  render() {
    let signUpStyles;
    let searchStyles;
    let listStyles;
    let infoDisplay;

    if (this.state.signUp) {
      signUpStyles = {
        borderBottom: "8px solid rgb(150, 0, 0)",
        color: "#aaa"
      };

      infoDisplay = <InfoDisplay signup />;
    }

    if (this.state.search) {
      searchStyles = {
        borderBottom: "8px solid rgb(150, 0, 0)",
        color: "#aaa"
      };

      infoDisplay = <InfoDisplay search />;
    }
    if (this.state.list) {
      listStyles = {
        borderBottom: "8px solid rgb(150, 0, 0)",
        color: "#aaa"
      };
      infoDisplay = <InfoDisplay list />;
    }
    return (
      <div>
        <Container>
          <Row
            className="text-center"
            style={{ fontSize: "4rem", color: "#333" }}
          >
            <Col xs="4" style={signUpStyles}>
              <i
                style={{
                  cursor: "pointer",
                  paddingBottom: "5px"
                }}
                className="fas fa-user-plus"
                aria-hidden
                onClick={this.onSignUpClick}
              />
            </Col>
            <Col xs="4" style={searchStyles}>
              <i
                style={{ cursor: "pointer", paddingBottom: "5px" }}
                className="fas fa-search"
                aria-hidden
                onClick={this.onSearchClick}
              />
            </Col>
            <Col xs="4" style={listStyles}>
              <i
                style={{ cursor: "pointer", paddingBottom: "5px" }}
                className="fas fa-list-ul"
                aria-hidden
                onClick={this.onListClick}
              />
            </Col>
          </Row>
        </Container>
        {infoDisplay}
      </div>
    );
  }
}

export default InfoControls;
