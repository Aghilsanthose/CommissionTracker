import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import classes from "./Yarn.module.css";
import yarnFormDetails from "../../../ResusableFunctions/yarnFormDetails";
import Input from "../../../Components/Input/Input";
import validationFunction from "../../../ResusableFunctions/validationFunction";
import disablingFunction from "../../../ResusableFunctions/disablingButton";
import Modal from "../../../Components/Modal/Modal";
import BackDrop from "../../../Components/BackDrop/Backdrop";
import Spinner from "../../../Components/Spinner/Spinner";
import * as actionCreators from "../../../Store/ActionCreators/consignmentYarn";

class Yarn extends Component {
  state = {
    yarn: yarnFormDetails(),
    date: new Date(),
    modal: false
  };

  //Helper function for updating the state based on redux store. In redux store, Buyer and seller data is retrived from server
  updatingBuyerSellerName = (type, propsList) => {
    const tempObj = {
      ...this.state.yarn,
      [type]: {
        ...this.state.yarn[type],
        options: [...this.state.yarn[type].options]
      }
    };

    if (
      !(
        this.state.yarn[type].options.every((value, index) => {
          return value.value.data.name === propsList[index].data.name;
        }) && this.state.yarn[type].options.length === propsList.length
      )
    ) {
      const tempOptions = [];
      for (let value of propsList) {
        tempOptions.push({
          value: value,
          label: value.data.name
        });
      }
      tempObj[type].options = tempOptions;
      this.setState({
        yarn: tempObj
      });
    }
  };

  componentDidUpdate() {
    //Obtaining the props from redux store initially
    console.log("[In Yarn] Did update");

    //for updatingg buyername in state
    this.updatingBuyerSellerName("buyerName", this.props.buyerList);

    //for updating sellername in state
    this.updatingBuyerSellerName("sellerName", this.props.sellerList);
  }

  componentDidMount() {
    //Fetching the data while component is mounting

    //for updatingg buyername in state
    this.updatingBuyerSellerName("buyerName", this.props.buyerList);

    //for updating sellername in state
    this.updatingBuyerSellerName("sellerName", this.props.sellerList);
  }

  onChangeHandler = (event, id) => {
    const temp = {
      ...this.state.yarn,
      [id]: {
        ...this.state.yarn[id]
      }
    };

    temp[id].value = event.target ? event.target.value.toUpperCase() : event;
    if (temp[id].validation.isRequired) {
      temp[id].error = validationFunction(
        temp[id].validation,
        event.target ? event.target.value : event
      );
    }

    this.setState({ yarn: temp });
  };

  dataHandler = date => {
    this.setState({
      date: date
    });
  };

  yarnModalData = () => {
    const totalCommission =
      +this.state.yarn.totalBags.value *
      (+this.state.yarn.commissionBuyer.value +
        +this.state.yarn.commissionSeller.value);

    return {
      date: this.state.date.toDateString(),
      time: this.state.date.toTimeString().substring(0, 9),
      buyerName: this.state.yarn.buyerName.value.label,
      sellerName: this.state.yarn.sellerName.value.label,
      type: this.state.yarn.type.value.value,
      count: this.state.yarn.count.value,
      totalBags: this.state.yarn.totalBags.value,
      commissionBuyer: this.state.yarn.commissionBuyer.value,
      commissionSeller: this.state.yarn.commissionSeller.value,
      totalCommission: totalCommission
    };
  };

  yarnData = () => {
    const yarnModalData = this.yarnModalData();
    return {
      ...yarnModalData,
      buyerPaidCommission: 0,
      sellerPaidCommission: 0,
      totalPaidCommission: 0,
      buyerKey: this.state.yarn.buyerName.value.value.key,
      sellerKey: this.state.yarn.sellerName.value.value.key,
      timeStamp: this.state.date.getTime(),
      paymentStatus: "PENDING"
    };
  };

  yarnDataObjToArray = () => {
    const data = this.yarnModalData();
    let dataArr = [];
    for (let key in data) {
      dataArr.push({
        id: key,
        value: data[key]
      });
    }
    return dataArr;
  };

  modalHandler = () => {
    this.setState((prevState, props) => {
      return {
        modal: !prevState.modal
      };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    console.log("Submit", this.yarnData());

    this.props.storingYarnData(
      this.yarnData(),
      this.props.history.replace,
      this.props.userId
    );
  };

  render() {
    // console.log("In [Yarn] render", this.props);
    //Converting the object into array for looping purposes

    let formArr = [];
    for (let key in this.state.yarn) {
      formArr.push(this.state.yarn[key]);
    }

    //Mapping each element to Input Component

    const yarnForm = formArr.map(individualFormElement => {
      return (
        <Input
          key={individualFormElement.id}
          onChangeHandler={event =>
            this.onChangeHandler(event, individualFormElement.id)
          }
          id={individualFormElement.id}
          options={individualFormElement.options}
          elementType={individualFormElement.elementType}
          elementConfig={individualFormElement.elementConfig}
          error={individualFormElement.error}
          validation={individualFormElement.validation}
          touched={individualFormElement.touched}
          value={individualFormElement.value}
          errorMsg={individualFormElement.errorMsg}
          isAsyncSelect={individualFormElement.isAsyncSelect}
        />
      );
    });

    //Adding the information in the modal

    const modalData = (
      <React.Fragment>
        <p className={classes.modaltitle}>CONSIGNMENT INFORMATION</p>
        {this.yarnDataObjToArray().map(individualData => {
          return (
            <p>
              {individualData.id.toUpperCase()}:{" "}
              <strong>{individualData.value}</strong>
            </p>
          );
        })}

        <p className={classes.modaltitle}>Do you want to save ?</p>
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

    let modal = null;

    if (this.state.modal) {
      modal = (
        <React.Fragment>
          <Modal open>{this.props.loading ? <Spinner /> : modalData}</Modal>
          <BackDrop clicked={this.modalHandler} />
        </React.Fragment>
      );
    }

    // It contains all elements of form
    let form = (
      <form onSubmit={this.submitHandler} className={classes.yarn}>
        <label className={classes.label}>Date</label>
        <DatePicker
          selected={this.state.date}
          onChange={this.dataHandler}
          className={classes.calender}
        />
        {yarnForm}
        <button
          onClick={this.modalHandler}
          type="button"
          className={classes.button}
          disabled={!disablingFunction(this.state.yarn)}
        >
          Add
        </button>
        {modal}
      </form>
    );

    if (this.props.errorMsg) {
      form = (
        <p className={[classes.yarn, classes.center].join(" ")}>
          {this.props.errorMsg}
        </p>
      );
    }

    // console.log("In yarn render", this.props);
    return <React.Fragment>{form}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.addYarn.loading,
    errorMsg: state.addYarn.errorMsg,
    buyerList: state.viewInfo.buyerList,
    sellerList: state.viewInfo.sellerList,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storingYarnData: (yarnData, replaceFn, userId) =>
      dispatch(actionCreators.storingYarnData(yarnData, replaceFn, userId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Yarn));
