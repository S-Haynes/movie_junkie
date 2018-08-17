import React from "react";
import JunkieLogo from "../../assets/img/title-junkie.png";
import JunkieGif from "../../assets/img/junkie.gif";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./YouAJunkie.css";

const YouAJunkie = props => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "56px",
        left: "0",
        overflow: "hidden",
        zIndex: "1000"
      }}
      className="title-page"
    >
      <img
        src={JunkieLogo}
        alt="Logo"
        style={{
          position: "absolute",
          zIndex: "99",
          top: "0",
          left: "0",
          width: "100%",
          height: "105%",
          margin: "auto"
        }}
      />

      <img
        src={JunkieGif}
        alt="Logo"
        style={{
          position: "absolute",
          zIndex: "5",
          top: "150px",
          left: "0",
          width: "100%",
          height: "100%",
          margin: "auto"
        }}
      />
      <Container
        style={{
          position: "absolute",
          zIndex: "100",
          bottom: "100px",
          margin: "0",
          textAlign: "center"
        }}
      >
        <Link
          to="/search"
          className="btn btn-outline-primary"
          style={{ width: "50%", opacity: "0.7" }}
          onMouseDown={e => e.preventDefault()}
        >
          Enter
        </Link>
      </Container>
    </div>
  );
};

export default YouAJunkie;
