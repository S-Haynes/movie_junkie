import React from "react";
import { Row, Col } from "reactstrap";
import Logo from "../Logo/Logo";

const Footer = props => {
  return (
    <div
      style={{
        width: "100%",
        height: "160px",
        background: "#070707",
        paddingTop: "20px",
        position: "absolute",
        bottom: "-200px",
        zIndex: "10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Row>
        <Col style={{ textAlign: "center", marginBottom: "10px" }} sm="12">
          <Logo width="70px" />
        </Col>
        <Col style={{ textAlign: "center", color: "white" }} sm="12">
          <p> Built with React. All Rights Reserved &copy; </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
