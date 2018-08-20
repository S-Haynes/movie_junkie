import React from "react";
import { Container, Col, Row, CardImg } from "reactstrap";
import DefaultUserIcon from "../../../../assets/img/default-user-icon.png";
import NoMoviesFound from "../../../../assets/img/no-movie.jpg";
import "./ProfileItem.css";
import { Link } from "react-router-dom";

const ProfileItem = props => {
  const { user, movielist } = props.profile;

  return (
    <div className="mt-4 mb-4 profiles text-center">
      <Container>
        <Row style={{ minHeight: "100px" }}>
          <Col
            className="text-left pt-4"
            style={{
              background: "rgba(17, 17, 17, 0.9)",
              position: "relative",
              zIndex: "1000",
              left: "25%"
            }}
            xs="3"
          >
            <Link
              style={{
                position: "absolute",
                zIndex: "10000000",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0"
              }}
              to={"/profile/" + user.displayname}
            />
            <Row>
              <Col xs="12">
                <h1>{user.displayname}</h1>
              </Col>
              <Col className="text-center" xs="12">
                <CardImg
                  className="rounded-circle"
                  style={{ width: "50%" }}
                  src={DefaultUserIcon}
                />
              </Col>
              <Col className="text-center" xs="12">
                <p>View Profile</p>
              </Col>
            </Row>
          </Col>
          <Col style={{ padding: "0", position: "relative" }} xs="7">
            {movielist.length >= 4 ? (
              movielist.slice(0, 4).map(movie => (
                <CardImg
                  key={movie._id}
                  className="movie-profile-bg"
                  style={{
                    width: "25%",
                    height: "100%"
                  }}
                  src={movie.poster}
                  alt="poster"
                />
              ))
            ) : (
              <div style={{ width: "100%" }} className="text-right">
                <CardImg
                  className="movie-profile-bg no-movie"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "100%",
                    minHeight: "165px",
                    opacity: "0.1"
                  }}
                  src={NoMoviesFound}
                  alt="poster"
                />
                <p
                  style={{
                    position: "absolute",
                    right: "0",
                    bottom: "-20px"
                  }}
                >
                  Not enough movies...
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileItem;
