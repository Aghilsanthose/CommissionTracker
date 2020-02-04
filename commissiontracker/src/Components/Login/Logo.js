import React from "react";

import classes from "./Logo.module.css";

const logo = () => {
  return (
    <div className={classes.logo}>
      <i className="fa fa-user-o" aria-hidden="true"></i>
      <p className={classes.titleheader}>Welcome Prem Kumar</p>
    </div>
  );
};

export default logo;
