import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
const navigationItems = props => {
  return (
    <div className={classes.navigationitems}>
      <NavigationItem>Home</NavigationItem>
      <NavigationItem>Customer</NavigationItem>
      <NavigationItem>History</NavigationItem>
      <NavigationItem>Logout</NavigationItem>
    </div>
  );
};

export default navigationItems;
