import React from "react";
import JunkieLogo from "../../assets/img/title-junkie.png";
import JunkieGif from "../../assets/img/junkie.gif";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import MovieBg from "../../assets/img/movie-collage-bg.jpg";
import MovieTitleImg from "../../assets/img/movie-title-img.png";
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
        src={MovieBg}
        alt="Logo"
        style={{
          position: "relative",
          zIndex: "6",
          top: "0",
          left: "0",
          width: "100%",
          height: "95%",
          margin: "auto"
        }}
      />
      <img
        src={MovieTitleImg}
        alt="Logo"
        style={{
          position: "absolute",
          zIndex: "6",
          top: "50px",
          left: "15%",
          width: "25%",
          height: "100%",
          maxWidth: "400px",
          maxHeight: "100px",
          minWidth: "180px",
          minHeight: "100px",
          margin: "auto",
          opacity: "0.5"
        }}
      />
      <Container
        style={{
          position: "absolute",
          zIndex: "100",
          bottom: "100px",
          margin: "0",
          textAlign: "left",
          paddingLeft: "17%"
        }}
      >
        <Link
          to="/register"
          className="btn btn-outline-primary"
          style={{ width: "20%", minWidth: "100px", opacity: "0.7" }}
          onMouseDown={e => e.preventDefault()}
        >
          Sign Up
        </Link>
      </Container>
    </div>
  );
};

export default YouAJunkie;
