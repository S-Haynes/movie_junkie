import React from "react";
import BucketListItem from "./BucketListItem/BucketListItem";

const WatchedListFeed = props => {
  const movieContent = props.movielist.map(movie => (
    <BucketListItem delete={props.delete} key={movie._id} movie={movie} />
  ));
  return movieContent;
};

export default WatchedListFeed;
