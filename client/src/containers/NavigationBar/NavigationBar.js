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
import { Link, withRouter } from "react-router-dom";
import "./NavigationBar.css";
import { logoutUser } from "../../store/actions/auth";
import NavLogo from "../../assets/img/logo-bg2.png";

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
    this.props.history.push("/login");
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <Nav navbar>
        <NavItem className="ml-2 link-nav">
          <NavLink tag={Link} to="/profiles">
            Members
          </NavLink>
        </NavItem>
        <NavItem className="ml-2 link-nav">
          <NavLink tag={Link} to="/search">
            Search
          </NavLink>
        </NavItem>
        <NavItem className="ml-auto link-nav">
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
      <Nav navbar>
        <NavItem className="link-nav ml-4">
          <NavLink tag={Link} to="/profiles">
            Members
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/search">
            Search
          </NavLink>
        </NavItem>
        <NavItem className="link-nav ml-auto">
          <NavLink tag={Link} to={"/profile/" + user.displayname}>
            Profile
          </NavLink>
        </NavItem>
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
            <img style={{ width: "125px" }} src={NavLogo} alt="logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleHandler} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(NavigationBar)
);
