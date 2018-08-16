import React, { Component } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";

class Layout extends Component {
  render() {
    return (
      <div className="wrap_container">
        <NavigationBar />
        <main>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
