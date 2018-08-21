import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../store/actions/profile";

import ProfileFeed from "./ProfilesFeed/ProfileFeed";
import Spinner from "../../components/UI/Spinner/Spinner";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let profilesContent;

    if (loading) {
      profilesContent = <Spinner />;
    } else {
      profilesContent = (
        <div>
          <ProfileFeed profiles={profiles} />
        </div>
      );
    }
    return profilesContent;
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
