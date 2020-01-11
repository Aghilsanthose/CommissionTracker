import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./ConsignmentButtons.module.css";

const consignmentButtons = () => {
  return (
    <div className={classes.white}>
      <div className={classes.overalldisplaybutton}>
        <div className={classes.individualbutton}>
          <NavLink to="/yarn" activeClassName={classes.active}>
            Yarn
          </NavLink>
        </div>
        <div className={classes.individualbutton}>
          <NavLink activeClassName={classes.active} to="/cotton">
            Cotton
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default consignmentButtons;
