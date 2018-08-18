import React from "react";
import ImageNotFound from "../../../assets/img/image-not-found.png";
import "./WatchedListItem.css";

const WatchedListItem = props => {
  const { movie } = props;

  const onDeleteHandler = e => {
    e.preventDefault();
    props.delete(movie._id);
  };
  return (
    <div
      className="d-inline-flex align-items-center ListItem mb-4"
      style={{ width: "100%", height: "50px" }}
    >
      <img
        className="mr-4"
        style={{ width: "50px", height: "50px" }}
        src={
          movie.poster === "N/A" || movie.poster === undefined
            ? ImageNotFound
            : movie.poster
        }
        alt="poster"
      />
      <p className="mr-4 mb-0" style={{ width: "50%", height: "auto" }}>
        {movie.title.length > 25
          ? movie.title.slice(0, 25) + "..."
          : movie.title}
      </p>
      <div className="d-flex pr-4 justify-content-end" style={{ width: "30%" }}>
        <a
          onClick={e => onDeleteHandler(e)}
          href=""
          className="deleteListItem"
          style={{ fontSize: "20px" }}
        >
          &times;
        </a>
      </div>
    </div>
  );
};

export default WatchedListItem;
