import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileByDisplayName } from "../../store/actions/profile";
import { Container, Col, Row, CardImg } from "reactstrap";
import { withRouter } from "react-router-dom";
import ImageNotFound from "../../assets/img/image-not-found.png";
import Spinner from "../../components/UI/Spinner/Spinner";
import Slider from "react-slick";
import "./Profile.css";
// import BackgroundOverlay from "../../components/UI/BackgroundOverlay/BackgroundOverlay";

class Profile extends Component {
  state = {
    bucketListWidth: "1000px",
    watchedListWidth: "1000px"
  };

  componentDidMount() {
    this.props.getProfileByDisplayName(this.props.match.params.displayname);
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.profile) {
      const { movielist, watchedlist } = nextProps.profile.profile;
      if (movielist && movielist.length < 3 && watchedlist.length < 3) {
        return {
          bucketListWidth: "500px",
          watchedListWidth: "500px"
        };
      } else if (movielist && movielist.length <= 5 && watchedlist.length < 3) {
        return {
          bucketListWidth: "800px",
          watchedListWidth: "500px"
        };
      } else if (movielist && movielist.length < 3 && watchedlist.length <= 5) {
        return {
          bucketListWidth: "500px",
          watchedListWidth: "800px"
        };
      } else if (
        movielist &&
        movielist.length <= 5 &&
        watchedlist.length <= 5
      ) {
        return {
          bucketListWidth: "800px",
          watchedListWidth: "800px"
        };
      } else if (
        movielist &&
        movielist.length <= 7 &&
        watchedlist.length <= 7
      ) {
        return {
          bucketListWidth: "1000px",
          watchedListWidth: "1000px"
        };
      } else if (
        movielist &&
        movielist.length >= 8 &&
        watchedlist.length >= 8
      ) {
        return {
          bucketListWidth: "1100px",
          watchedListWidth: "1100px"
        };
      } else return null;
    }
  }

  render() {
    const { loading } = this.props.profile;
    const { movielist, watchedlist, user } = this.props.profile.profile;

    let profileContent;

    let settingsBucketlist = {
      dots: false,
      draggable: true,
      focusOnSelect: false,
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            dots: false,
            draggable: true,
            focusOnSelect: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 5000
          }
        },
        {
          breakpoint: 600,
          settings: {
            dots: false,
            draggable: true,
            focusOnSelect: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 5000
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    let settingsWatchedlist = {
      dots: false,
      draggable: true,
      focusOnSelect: false,
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            dots: false,
            draggable: true,
            focusOnSelect: false,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 5000
          }
        },
        {
          breakpoint: 600,
          settings: {
            dots: false,
            draggable: true,
            focusOnSelect: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 5000
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    if (loading || Object.keys(this.props.profile.profile).length === 0) {
      profileContent = <Spinner />;
    } else {
      if (movielist.length <= 8) {
        settingsBucketlist.slidesToShow = movielist.length - 1;
        settingsBucketlist.responsive.forEach(
          res => (res.settings.slidesToShow = movielist.length - 1)
        );
      }

      if (movielist.length >= 5) {
        settingsBucketlist.responsive.forEach(
          res => (res.settings.slidesToShow = 4)
        );
      } else {
        settingsBucketlist.slidesToShow = movielist.length;
        settingsBucketlist.responsive.forEach(
          res => (res.settings.slidesToShow = movielist.length - 1)
        );
      }

      if (watchedlist.length <= 8) {
        settingsWatchedlist.slidesToShow = watchedlist.length - 1;
      }

      if (watchedlist.length >= 4) {
        settingsWatchedlist.responsive.forEach(
          res => (res.settings.slidesToShow = 3)
        );
      } else {
        settingsWatchedlist.slidesToShow = watchedlist.length;
        settingsWatchedlist.responsive.forEach(
          res => (res.settings.slidesToShow = watchedlist.length - 1)
        );
      }

      profileContent = (
        <div>
          <div className="profile">
            <div
              className="text-center"
              style={{
                position: "absolute",
                zIndex: "-2",
                top: "80px",
                left: "5%",
                fontSize: "100px",
                opacity: "0.2",
                color: "#ccc"
              }}
            >
              <h1 style={{ margin: "0", fontSize: "inherit" }}>
                {user.displayname}
              </h1>
              <hr
                style={{
                  width: "30%",
                  border: "1px solid rgba(255, 0, 0, 1)",
                  margin: "auto"
                }}
              />
            </div>
            <Container style={{ marginBottom: "150px", marginTop: "140px" }}>
              <Row className="text-center">
                <Col className="text-center" xs="12">
                  <h3>Bucket List: {movielist.length} Movies</h3>
                </Col>
                <Col
                  style={{
                    maxWidth: this.state.bucketListWidth,
                    margin: "auto"
                  }}
                  className="text-center"
                  xs="12"
                >
                  {movielist.length === 0 ? (
                    <div className="text-center" style={{ width: "100%" }}>
                      <h6>No movies added to Bucketlist yet...</h6>
                    </div>
                  ) : (
                    <div style={{ height: "150px" }}>
                      <Slider {...settingsBucketlist}>
                        {movielist.map(movie => (
                          <CardImg
                            key={movie._id}
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
                        ))}
                      </Slider>
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
            <Container style={{ marginBottom: "150px" }}>
              <Row>
                <Col className="text-center" xs="12">
                  <h3>Already Watched: {watchedlist.length} Movies</h3>
                </Col>
                <Col
                  style={{
                    maxWidth: this.state.watchedListWidth,
                    margin: "auto"
                  }}
                  className="text-center"
                  xs="12"
                >
                  {watchedlist.length === 0 ? (
                    <div className="text-center" style={{ width: "100%" }}>
                      <h6>No movies added to watched list yet...</h6>
                    </div>
                  ) : (
                    <Slider {...settingsWatchedlist}>
                      {watchedlist.map(movie => (
                        <CardImg
                          key={movie._id}
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
                      ))}
                    </Slider>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
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
