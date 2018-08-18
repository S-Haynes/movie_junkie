import React from "react";
import WatchedListItem from "./WatchedListItem/WatchedListItem";

const WatchedListFeed = props => {
  const movieContent = props.movielist.map(movie => (
    <WatchedListItem delete={props.delete} key={movie._id} movie={movie} />
  ));
  return movieContent;
};

export default WatchedListFeed;
