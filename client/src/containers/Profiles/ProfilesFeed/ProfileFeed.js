import React from "react";
import ProfileItem from "./ProfileItem/ProfileItem";

const ProfileFeed = props => {
  const profiles = props.profiles.map(profile => (
    <ProfileItem key={profile._id} profile={profile} />
  ));
  return profiles;
};

export default ProfileFeed;
