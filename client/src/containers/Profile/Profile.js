import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProfile } from "../../store/actions/profile";
import { Container, Col, Row, Jumbotron } from "reactstrap";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { user, movieslist, watchedlist } = this.props.profile.profile;
    const { loading, profile } = this.props.profile;
    console.log(this.props.profile);
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
  { getProfile }
)(Profile);
