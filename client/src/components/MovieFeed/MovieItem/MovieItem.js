import React, { Component } from "react";
import {
  Container,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import ImageNotFound from "../../../assets/img/image-not-found.png";

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
    this.props.history.push("/movie/" + this.props.movie.imdbID);
  };
  render() {
    const { movie } = this.props;
    const { hovering } = this.state;
    return (
      <Col lg="3" md="6">
        <Container
          onMouseOver={e => this.onMouseOverHandler(e)}
          onMouseLeave={e => this.onMouseOutHandler(e)}
        >
          <Card
            className="ml-auto mr-auto mb-3"
            style={{
              minHeight: "300px",
              maxHeight: "300px",
              maxWidth: "300px",
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
              style={{ minHeight: "300px", maxHeight: "300px" }}
              src={
                movie.Poster === "N/A" || movie.Poster === undefined
                  ? ImageNotFound
                  : movie.Poster
              }
              alt="poster"
            />
            {hovering ? (
              <span
                style={{
                  background: "rgba(0, 0, 0, 0.7)",
                  height: "calc(100% + 10px)",
                  width: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  cursor: "pointer"
                }}
                onClick={e => this.onClickHandler(e)}
              >
                <CardBody
                  style={{
                    position: "relative",
                    bottom: "-100px"
                  }}
                >
                  <CardTitle style={{ textAlign: "center" }}>
                    {movie.Title.slice(0, 30) + "..."}
                  </CardTitle>
                  <CardSubtitle>{movie.Year.slice(0, 4)}</CardSubtitle>
                </CardBody>
              </span>
            ) : null}
          </Card>
        </Container>
      </Col>
    );
  }
}

export default withRouter(MovieItem);
