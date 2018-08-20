import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../store/actions/profile";

import ProfileFeed from "./ProfilesFeed/ProfileFeed";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles } = this.props.profile;
    return (
      <div>
        <ProfileFeed profiles={profiles} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
