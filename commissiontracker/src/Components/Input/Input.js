import React from "react";
import Select from "react-select";
import { connect } from "react-redux";

import classes from "./Input.module.css";

const input = props => {
  let inputCls = [classes.input];

  if (props.error || props.touched) {
    inputCls.push(classes.inputerr);
  }

  let input = null;
  switch (props.elementType) {
    case "input":
      input = (
        <React.Fragment>
          <label className={classes.label}>
            {props.type} {props.elementConfig.placeholder}
          </label>
          {props.error ? (
            <p className={classes.errorMsg}>{props.errorMsg}</p>
          ) : null}
          <input
            className={inputCls.join(" ")}
            onChange={props.onChangeHandler}
            {...props.elementConfig}
            value={props.value}
          ></input>
        </React.Fragment>
      );
      break;
    case "select":
      const customStyles = {
        control: styles => ({
          // none of react-select's styles are passed to <Control />
          ...styles,
          borderRadius: "10px",
          border: "1px solid black",
          minHeight: "0",
          height: "2.1rem",
          fontSize: "0.8rem",
          boxSizing: "border-box",
          boxShadow: "2px 2px 2px rgba(131, 131, 209, 0.37)",
          "&:hover": {
            background: "rgba(235, 217, 235, 0.63)",
            border: "2px solid rgba(235, 217, 235, 0.63)"
          }
        }),

        placeholder: styles => {
          return {
            ...styles,
            top: "40%",
            fontSize: "0.9rem",
            fontFamily: "'Nunito', sans-serif"
          };
        },

        menuList: styles => {
          return {
            ...styles,
            fontSize: "0.9rem",
            fontFamily: "'Nunito', sans-serif"
          };
        },

        container: styles => {
          return {
            ...styles,
            minWidth: "18%"
          };
        },

        input: styles => {
          return {
            ...styles,
            fontSize: "0.9rem"
          };
        }
      };

      input = (
        <React.Fragment>
          <label className={classes.label}>{props.elementConfig.label}</label>
          <Select
            value={props.value}
            onChange={props.onChangeHandler}
            options={props.options}
            styles={customStyles}
          />
        </React.Fragment>
      );

      break;
  }

  return input;
};

const mapStateToProps = state => {
  return {
    buyerList: state.viewInfo.buyerList,
    sellerList: state.viewInfo.sellerList
  };
};

export default connect(mapStateToProps, null)(input);
