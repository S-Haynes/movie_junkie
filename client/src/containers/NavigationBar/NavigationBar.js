import React, { Component } from "react";
import { connect } from "react-redux";
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

import { logoutUser } from "../../store/actions/auth";

class NavigationBar extends Component {
  state = {
    isOpen: false
  };

  toggleHandler = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  logoutHandler = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const guestLinks = (
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
    );

    const authLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/dashboard">
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="" onClick={e => this.logoutHandler(e)}>
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );

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
          <Collapse isOpen={this.state.isOpen} navbar />
          {isAuthenticated ? authLinks : guestLinks}
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavigationBar);
