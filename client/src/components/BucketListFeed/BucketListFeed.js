import React from "react";
import BucketListItem from "./BucketListItem/BucketListItem";
import PropTypes from "prop-types";

const WatchedListFeed = props => {
  const movieContent = props.movielist.map(movie => (
    <BucketListItem delete={props.delete} key={movie._id} movie={movie} />
  ));
  return movieContent;
};

WatchedListFeed.propTypes = {
  movielist: PropTypes.array.isRequired
};
export default WatchedListFeed;
