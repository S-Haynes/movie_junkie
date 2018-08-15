import React, { Component } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";

class Layout extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
