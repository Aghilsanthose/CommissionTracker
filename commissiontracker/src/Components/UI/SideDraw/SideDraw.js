import React from "react";
import classes from "./SideDraw.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const sideDraw = props => {
  return (
    <div className={classes.sidedraw}>
      <div className={classes.aligningnav}>
        <NavigationItems clicked={props.clicked} />
      </div>
    </div>
  );
};

export default sideDraw;
