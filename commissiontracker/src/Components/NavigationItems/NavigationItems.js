import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
const navigationItems = props => {
  return (
    <div className={classes.navigationitems}>
      <NavigationItem clicked={props.clicked} path="/">
        Home
      </NavigationItem>
      <NavigationItem clicked={props.clicked} path="/customer">
        Customer
      </NavigationItem>
      <NavigationItem clicked={props.clicked} path="/history">
        History
      </NavigationItem>
      <NavigationItem clicked={props.clicked} path="/logout">
        Logout
      </NavigationItem>
    </div>
  );
};

export default navigationItems;
