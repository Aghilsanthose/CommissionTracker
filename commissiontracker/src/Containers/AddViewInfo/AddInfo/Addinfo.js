import React, { Component } from "react";

import classes from "./AddInfo.module.css";
import customerData from "../../../ResusableFunctions/customerDetails";
import Input from "../../../Components/Input/Input";
import validationFunction from "../../../ResusableFunctions/validationFunction";
import disablingButton from "../../../ResusableFunctions/disablingButton";

class AddInfo extends Component {
  state = {
    formData: customerData()
  };

  onChangeHandler = (event, id) => {
    // console.log("onchange", event.target.value, id);
    const temp = {
      ...this.state.formData,
      [id]: {
        ...this.state.formData[id]
      }
    };

    temp[id].value = event.target.value.toUpperCase();
    if (temp[id].validation.isRequired) {
      temp[id].error = validationFunction(
        temp[id].validation,
        event.target.value
      );
    }

    this.setState({ formData: temp });

    // console.log("In temp", temp[id].error);
  };

  render() {
    const tempArr = [];
    for (let key in this.state.formData) {
      tempArr.push(this.state.formData[key]);
    }
    const formArr = tempArr.map(individualFormElement => {
      return (
        <Input
          key={individualFormElement.id}
          onChangeHandler={event =>
            this.onChangeHandler(event, individualFormElement.id)
          }
          id={individualFormElement.id}
          elementType={individualFormElement.elementType}
          elementConfig={individualFormElement.elementConfig}
          error={individualFormElement.error}
          validation={individualFormElement.validation}
          touched={individualFormElement.touched}
          value={individualFormElement.value}
          errorMsg={individualFormElement.errorMsg}
        />
      );
    });
    // console.log("In adding", tempArr);
    return (
      <form className={classes.form}>
        {formArr}
        <button
          disabled={!disablingButton(this.state.formData)}
          className={classes.button}
        >
          Add
        </button>
      </form>
    );
  }
}

export default AddInfo;
