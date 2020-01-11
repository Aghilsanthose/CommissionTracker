import React, { Component } from "react";

import classes from "./Modal.module.css";

const modal = props => {
  // console.log("In modal", props);

  let modalCls = [classes.modal, classes.close];

  if (props.open) {
    modalCls = [classes.modal, classes.open];
  }

  return <div className={modalCls.join(" ")}>{props.children}</div>;
};

export default modal;
