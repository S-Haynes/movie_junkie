import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
  getProfile,
  deleteBucketItem,
  deleteWatchedItem
} from "../../store/actions/profile";
import { Container, Col, Row, Jumbotron } from "reactstrap";
import BucketListFeed from "../../components/BucketListFeed/BucketListFeed";
import WatchedListFeed from "../../components/WatchedListFeed/WatchedListFeed";
import "./Dashboard.css";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { user, movielist, watchedlist } = this.props.profile.profile;
    const { loading, profile } = this.props.profile;
    // Auth logic
    let redirect;

    if (isAuthenticated) {
      redirect = null;
    } else {
      redirect = <Redirect to="/login" />;
    }

    let profileContent;

    if (loading || Object.keys(profile).length === 0) {
      profileContent = <h3>Loading...</h3>;
    } else {
      profileContent = (
        <div style={{ marginTop: "50px" }}>
          <Container>
            <h1>Dashboard</h1>
            <br />
            <h4>Welcome, {user.displayname}.</h4>
            <Row className="mt-4">
              <Col md="6">
                <h3 className="text-center">Bucket List</h3>
                <Jumbotron
                  style={{
                    minHeight: "500px",
                    background: "#111",
                    paddingRight: "5px",
                    maxHeight: "500px",
                    overflow: "scroll"
                  }}
                >
                  {movielist.length > 0 ? (
                    <BucketListFeed
                      delete={this.props.deleteBucketItem}
                      movielist={movielist}
                    />
                  ) : (
                    <div>
                      <h3>
                        You haven't added any movies to your bucket list yet.
                      </h3>
                      <div className="mt-4 text-center">
                        <Link to="/search"> Add Some Now</Link>
                      </div>
                    </div>
                  )}
                </Jumbotron>
              </Col>
              <Col md="6">
                <h3 className="text-center">Already Watched</h3>
                <Jumbotron
                  style={{
                    minHeight: "500px",
                    maxHeight: "500px",
                    background: "#111",
                    paddingRight: "5px",
                    overflow: "scroll"
                  }}
                >
                  {watchedlist.length > 0 ? (
                    <WatchedListFeed
                      delete={this.props.deleteWatchedItem}
                      movielist={watchedlist}
                    />
                  ) : (
                    <div>
                      <h3>
                        You haven't added any movies to your already-watched
                        list.
                      </h3>
                      <div className="mt-4 text-center">
                        <Link to="/search"> Add Some Now</Link>
                      </div>
                    </div>
                  )}
                </Jumbotron>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

    return (
      <div>
        {redirect}
        {profileContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfile, deleteBucketItem, deleteWatchedItem }
)(Dashboard);
