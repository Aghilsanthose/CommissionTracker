import React from "react";
import classes from "./Menu.module.css";

const menu = props => {
  return (
    <div onClick={props.openSideDraw} className={classes.menudisplay}>
      <div className={classes.menu}></div>
      <div className={classes.menu}></div>
      <div className={classes.menu}></div>
    </div>
  );
};

export default menu;
