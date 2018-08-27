import React from "react";
import { Container, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./InfoDisplay.css";
import SearchImg from "../../../assets/img/home-search.png";
import ListImg from "../../../assets/img/home-list.png";
import ProfilesImg from "../../../assets/img/home-profiles.png";

const InfoDisplay = props => {
  let infoContent;
  let imgContent;
  if (props.search) {
    infoContent = (
      <div className="ml-4">
        <h1>Search.</h1>
        <h6>
          Search for any movie. You'll get instanesults matching your desired
          movie, as well as Popular, Top Rated, and Movies in theatres now.
        </h6>
        <Link className="btn btn-lg btn-danger" to="/search">
          Search Now
        </Link>
      </div>
    );

    imgContent = SearchImg;
  }
  if (props.signup) {
    infoContent = (
      <div className="ml-4">
        <h1>Sign up.</h1>
        <h6>
          Gain access to immediately search for movies and save them to your
          account.
        </h6>
        <Link
          style={{ marginRight: "20px" }}
          className="btn btn-lg btn-danger"
          to="/register"
        >
          Register
        </Link>
        <Link className="btn btn-lg btn-danger" to="/login">
          Login
        </Link>
      </div>
    );

    imgContent = ProfilesImg;
  }
  if (props.list) {
    infoContent = (
      <div className="ml-4">
        <h1>Build Your Account.</h1>
        <h6>
          Create a list of all movies you've watched, or plan to watch in the
          future.
        </h6>
        <Link className="btn btn-lg btn-danger" to="/profiles">
          Profiles
        </Link>
      </div>
    );

    imgContent = ListImg;
  }
  return (
    <div style={{ margin: "5rem 0" }}>
      <Container>
        <Row>
          <Col style={{ padding: "0", margin: "50px auto" }} md="6">
            {infoContent}
          </Col>
          <Col md="6">
            <img
              style={{ width: "100%", opacity: "0.5" }}
              src={imgContent}
              alt="info-img"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

InfoDisplay.propTypes = {
  search: PropTypes.bool,
  list: PropTypes.bool,
  signup: PropTypes.bool
};

export default InfoDisplay;
