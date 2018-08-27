import React, { Component } from "react";
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { withRouter } from "react-router-dom";
import ImageNotFound from "../../../assets/img/image-not-found.png";
import PropTypes from "prop-types";

import "./MovieItem.css";

class MovieItem extends Component {
  state = {
    hovering: false
  };

  onMouseOverHandler = e => {
    this.setState({ hovering: true });
  };
  onMouseOutHandler = e => {
    this.setState({ hovering: false });
  };

  onClickHandler = e => {
    this.props.history.push("/movie/" + this.props.movie.id);
  };
  render() {
    const {
      movie,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      colLg,
      colMd,
      colSm,
      col,
      overlayOffset,
      titleLength
    } = this.props;
    const { hovering } = this.state;
    return (
      <Col lg={colLg} md={colMd} sm={colSm} xs={col}>
        <div
          onMouseOver={e => this.onMouseOverHandler(e)}
          onMouseLeave={e => this.onMouseOutHandler(e)}
        >
          <Card
            className="ml-auto mr-auto mb-3"
            style={{
              minHeight: minHeight,
              maxHeight: maxHeight,
              maxWidth: maxWidth,
              minWidth: minWidth,
              background: "#080808",
              color: "white",
              textAlign: "center",
              position: "relative"
            }}
          >
            <CardImg
              top
              width="100%"
              height="100%"
              style={{
                minHeight: minHeight,
                maxHeight: maxHeight
              }}
              src={
                movie.poster_path === "" ||
                movie.poster_path === undefined ||
                movie.poster_path === null
                  ? ImageNotFound
                  : "https://image.tmdb.org/t/p/w500" + movie.poster_path
              }
              alt="poster"
            />
            {hovering ? (
              <span
                style={{
                  background: "rgba(0, 0, 0, 0.7)",
                  height: "calc(100% + 2%)",
                  width: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  cursor: "pointer",
                  overflow: "hidden"
                }}
                onClick={e => this.onClickHandler(e)}
              >
                <CardBody
                  style={{
                    position: "relative",
                    bottom: overlayOffset
                  }}
                >
                  <CardTitle style={{ textAlign: "center" }}>
                    {movie.title.slice(0, titleLength) + "..."}
                  </CardTitle>
                  <CardSubtitle>{movie.release_date.slice(0, 4)}</CardSubtitle>
                </CardBody>
              </span>
            ) : null}
          </Card>
        </div>
      </Col>
    );
  }
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  colLg: PropTypes.string,
  colMd: PropTypes.string,
  colSm: PropTypes.string,
  col: PropTypes.string,
  overlayOffset: PropTypes.string,
  titleLength: PropTypes.number
};

export default withRouter(MovieItem);
