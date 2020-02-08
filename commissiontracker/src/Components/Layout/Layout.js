import React, { Component } from "react";

import classes from "./Layout.module.css";
class Layout extends Component {
  state = {};
  render() {
    return <div className={classes.layout}>{this.props.children}</div>;
  }
}

export default Layout;
