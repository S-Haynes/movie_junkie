import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
class NavigationBar extends Component {
  state = {
    isOpen: false
  };

  toggleHandler = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <Navbar
          style={{ position: "relative", zIndex: "10000" }}
          className="bg-dark"
          dark
          expand="md"
        >
          <NavbarBrand tag={Link} to="/">
            MovieJunkie
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleHandler} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/register">
                  Register
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
