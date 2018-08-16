import React from "react";
import { Row, Col, Container } from "reactstrap";
import Logo from "../Logo/Logo";

const Footer = props => {
  return (
    <div
      style={{
        width: "100%",
        height: "160px",
        background: "#070707",
        padding: "20px",
        position: "absolute",
        bottom: "-200px",
        zIndex: "10"
      }}
    >
      <Row>
        <Col style={{ textAlign: "center" }} sm="12">
          <Logo width="100px" />
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
