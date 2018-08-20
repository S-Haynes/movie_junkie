import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileByDisplayName } from "../../store/actions/profile";
import { Container, Col, Row, CardImg, Card } from "reactstrap";
import ImageNotFound from "../../assets/img/image-not-found.png";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfileByDisplayName(this.props.match.params.displayname);
  }

  render() {
    const { loading } = this.props.profile;
    const { movielist, watchedlist, user } = this.props.profile.profile;

    let profileContent;

    if (loading || Object.keys(this.props.profile.profile).length === 0) {
      profileContent = <h4>Loading Profile...</h4>;
    } else {
      profileContent = (
        <div className="profile">
          <Container style={{ marginBottom: "100px" }}>
            <Row>
              <Col className="text-center" xs="12">
                <h1 style={{ marginBottom: "100px" }}>
                  {user.displayname}
                  's Profile
                </h1>
                <h3>Bucket List</h3>
              </Col>
              <Col className="text-center" xs="12">
                {movielist.length === 0 ? (
                  <div className="text-center" style={{ width: "100%" }}>
                    <h6>No movies added to Bucketlist yet...</h6>
                  </div>
                ) : (
                  movielist.map(movie => (
                    <CardImg
                      style={{
                        width: "100px",
                        minHeight: "150px",
                        maxHeight: "150px"
                      }}
                      src={
                        movie.poster === "" ||
                        movie.poster === undefined ||
                        movie.poster === null
                          ? ImageNotFound
                          : movie.poster
                      }
                    />
                  ))
                )}
              </Col>
            </Row>
          </Container>
          <Container className="mb-4">
            <Row>
              <Col className="text-center" xs="12">
                <h3>Already Watched</h3>
              </Col>
              <Col className="text-center" xs="12">
                {watchedlist.length === 0 ? (
                  <div className="text-center" style={{ width: "100%" }}>
                    <h6>No movies added to watched list yet...</h6>
                  </div>
                ) : (
                  watchedlist.map(movie => (
                    <CardImg
                      style={{
                        width: "100px",
                        minHeight: "150px",
                        maxHeight: "150px"
                      }}
                      src={
                        movie.poster === "" ||
                        movie.poster === undefined ||
                        movie.poster === null
                          ? ImageNotFound
                          : movie.poster
                      }
                    />
                  ))
                )}
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    return profileContent;
  }
}
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByDisplayName }
)(Profile);
