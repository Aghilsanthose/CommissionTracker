import React from "react";
import classes from "./NavigationItem.module.css";

const navigationItem = props => {
  return <div className={classes.navigationitem}>{props.children}</div>;
};

export default navigationItem;
