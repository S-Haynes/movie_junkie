import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    let redirect;

    if (isAuthenticated) {
      redirect = null;
    } else {
      redirect = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirect}
        <h1>DISPLAY PROFILE HERE</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Profile);
