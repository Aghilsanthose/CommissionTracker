import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../../Components/Spinner/Spinner";
import IndividualCustomerView from "../../../Components/CustomerAddView/CustomerView/IndividualCustomerView/IndividualCustomerView";
import * as actionCreators from "../../../Store/ActionCreators/customerView";
import classes from "./ViewInfo.module.css";

class ViewInfo extends Component {
  state = {};

  render() {
    // Let the spinner revolves while fetching the data from the server
    let spinner = null;
    if (this.props.loading) {
      spinner = <Spinner />;
    }

    // Retriving the buyer seller data from server

    let buyerSeller = [];

    let error = null;

    const listType =
      this.props.type === "buyer"
        ? this.props.buyerList
        : this.props.sellerList;

    if (!spinner) {
      buyerSeller = listType.map(element => {
        return (
          <IndividualCustomerView
            key={element.key}
            data={element.data}
            type={this.props.type}
          />
        );
      });

      //Showing the custom error message when error occured while fetching the data from the server

      if (this.props.error && buyerSeller.length === 0) {
        error = (
          <p className={classes.error}>Some thing went Wrong!Please Hang on</p>
        );
      }
    }

    return (
      <div className={classes.viewinfo}>
        <p className={classes.title}>{this.props.type.toUpperCase()} DETAILS</p>
        {error}
        {spinner}
        {buyerSeller}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.viewInfo.loading,
    buyerList: state.viewInfo.buyerList,
    sellerList: state.viewInfo.sellerList,
    error: state.viewInfo.errorMsg,
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps)(ViewInfo);
