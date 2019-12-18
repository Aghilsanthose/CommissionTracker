import React from "react";

import LogoTitle from "../LogoTitle/LogoTitle";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./ToolBar.module.css";
import Menu from "../Menu/Menu";

const toolBar = props => {
  return (
    <div className={classes.toolbar}>
      <Menu openSideDraw={props.openSideDraw} />
      <LogoTitle />
      <div className={classes.disableNav}>
        <NavigationItems />
      </div>
    </div>
  );
};

export default toolBar;
