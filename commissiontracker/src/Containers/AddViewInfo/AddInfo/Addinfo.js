import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import classes from "./AddInfo.module.css";
import customerData from "../../../ResusableFunctions/customerDetails";
import Input from "../../../Components/Input/Input";
import validationFunction from "../../../ResusableFunctions/validationFunction";
import disablingButton from "../../../ResusableFunctions/disablingButton";
import Modal from "../../../Components/Modal/Modal";
import BackDrop from "../../../Components/BackDrop/Backdrop";
import Spinner from "../../../Components/Spinner/Spinner";
import * as actionCreators from "../../../Store/ActionCreators/customerInfo";

class AddInfo extends Component {
  state = {
    formData: customerData(),
    modal: false
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

  modalHandler = event => {
    console.log("In modal Handler");
    this.setState(prevState => {
      return { modal: !prevState.modal };
    });
  };

  modalData = () => {
    return {
      name: this.state.formData.name.value,
      gstin: this.state.formData.gstin.value,
      address: `${this.state.formData.streetno.value}, ${this.state.formData.village.value}, ${this.state.formData.district.value},  ${this.state.formData.pincode.value}`,
      mobile_no: this.state.formData.mobno.value
    };
  };

  modalDataObjToArray = () => {
    const data = this.modalData();
    let dataArr = [];
    for (let key in data) {
      dataArr.push({
        id: key,
        value: data[key]
      });
    }
    return dataArr;
  };

  modalContinueHandler = event => {
    // console.log("In modal Continue handler", this.props.history.replace);
    event.preventDefault();
    this.props.storingDataOnServer(
      this.modalData(),
      this.props.type,
      this.props.history.replace
    );
  };

  render() {
    console.log("In addInfor", this.props);

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
          type={this.props.type}
        />
      );
    });

    let modal = <Modal />;

    const modalData = (
      <React.Fragment>
        <p className={[classes.center, classes.modaltitle].join(" ")}>
          PLEASE CONFIRM!!!
        </p>
        {this.modalDataObjToArray().map(indEl => {
          return (
            <p key={indEl.id}>
              {indEl.id.toUpperCase()} : <strong> {indEl.value} </strong>
            </p>
          );
        })}
        <p className={[classes.center, classes.modaltitle].join(" ")}>
          Do you want to save ?
        </p>
        <div className={classes.center}>
          <button className={[classes.buttonmodal, classes.red].join(" ")}>
            CONTINUE
          </button>
          <button
            type="button"
            onClick={this.modalHandler}
            className={[classes.buttonmodal, classes.green].join(" ")}
          >
            CANCEL
          </button>
        </div>
      </React.Fragment>
    );

    if (this.state.modal) {
      modal = (
        <React.Fragment>
          <BackDrop clicked={this.modalHandler} />
          <Modal open>{this.props.loading ? <Spinner /> : modalData}</Modal>
        </React.Fragment>
      );
    }

    // console.log("In adding", tempArr);
    return (
      <form onSubmit={this.modalContinueHandler} className={classes.form}>
        {formArr}
        <button
          type="button"
          onClick={this.modalHandler}
          disabled={!disablingButton(this.state.formData)}
          className={classes.button}
        >
          Add {this.props.type}
        </button>
        {modal}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.common.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storingDataOnServer: (dataObj, type, replaceFn) =>
      dispatch(actionCreators.storeDataOnServer(dataObj, type, replaceFn))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddInfo)
);
