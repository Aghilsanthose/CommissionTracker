import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = props => {
  return (
    <div onClick={props.clicked} className={classes.navigationitem}>
      <NavLink exact to={props.path} activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </div>
  );
};

export default navigationItem;
