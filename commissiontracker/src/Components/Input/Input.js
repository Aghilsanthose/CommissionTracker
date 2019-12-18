import React from "react";

import classes from "./Input.module.css";

const input = props => {
  // console.log("In input", props.elementConfig);
  let input = null;
  switch (props.elementType) {
    case "input":
      input = (
        <React.Fragment>
          <label className={classes.label}>
            {props.elementConfig.placeholder}
          </label>
          {props.error ? (
            <p className={classes.errorMsg}>{props.errorMsg}</p>
          ) : null}
          <input
            className={classes.input}
            onChange={props.onChangeHandler}
            {...props.elementConfig}
            value={props.value}
          ></input>
        </React.Fragment>
      );
      break;
    case "select":
      input = (
        <React.Fragment>
          <label className={classes.label}>
            {props.elementConfig.placeholder}
          </label>
          <select
            className={classes.input}
            onChange={props.onChangeHandler}
            value={props.value}
          ></select>
        </React.Fragment>
      );
      break;
  }

  return input;
};

export default input;
