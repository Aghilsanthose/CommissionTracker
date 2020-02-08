import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Spinner from "../../../../Components/UI/Spinner/Spinner";

import * as actionCreators from "../../../../Store/ActionCreators/detailsYarn";
import classes from "./Details.module.css";
class Details extends Component {
  state = {
    loading: true,
    buyerInfo: false,
    sellerInfo: false,
    consignmentInfo: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.consignmentInfo &&
      (!this.props.buyerInfo ||
        this.props.buyerInfo.key !== this.props.consignmentInfo.buyerKey)
    ) {
      this.props.retrivingBuyerInfo(
        this.props.consignmentInfo.buyerKey,
        this.props.userId
      );
    }

    if (!this.state.buyerInfo && this.props.buyerInfo) {
      this.setState({ buyerInfo: true });
    }

    if (
      this.props.consignmentInfo &&
      (!this.props.sellerInfo ||
        this.props.sellerInfo.key !== this.props.consignmentInfo.sellerKey)
    ) {
      this.props.retrivingSellerInfo(
        this.props.consignmentInfo.sellerKey,
        this.props.userId
      );
    }

    if (!this.state.sellerInfo && this.props.sellerInfo) {
      this.setState({ sellerInfo: true });
    }

    if (
      this.state.buyerInfo &&
      this.state.sellerInfo &&
      this.state.consignmentInfo &&
      this.state.loading
    ) {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    // console.log();
    this.props.retrivingConsignmentInfo(
      this.props.match.params.id,
      this.props.userId
    );
    this.setState({ consignmentInfo: true });
  }

  render() {
    let details = <Spinner />;

    if (!this.state.loading) {
      details = (
        <div className={classes.details}>
          <div className={classes.header}>Details</div>
          <div className={classes.template}>
            <div className={classes.buyerseller}>
              {/* Buyer Details */}
              <div>
                <div className={classes.titleheader}>Buyer Info</div>
                <div className={classes.body}>
                  <div>
                    <span>Name : </span>
                    {this.props.buyerInfo.name}
                  </div>
                  <div>
                    <span>GSTIN : </span>
                    {this.props.buyerInfo.gstin}
                  </div>
                  <div>
                    <span>sellar: </span>
                    {this.props.buyerInfo.address}
                  </div>
                  <div>
                    <span>Mobile : </span>
                    {this.props.buyerInfo.mobile_no}
                  </div>
                </div>
              </div>
              {/* SellerDetails */}
              <div>
                <div className={classes.titleheader}>Seller Info</div>
                <div className={classes.body}>
                  <div>
                    <span>Name:</span> {this.props.sellerInfo.name}
                  </div>
                  <div>
                    <span>GSTIN:</span> {this.props.sellerInfo.gstin}
                  </div>
                  <div>
                    <span>Add:</span> {this.props.sellerInfo.address}
                  </div>
                  <div>
                    <span>Mobile : </span>
                    {this.props.sellerInfo.mobile_no}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consignment Information */}
          <div className={classes.template}>
            <div className={classes.titleheader}>Consignment Info</div>
            <div className={classes.body}>
              <div>
                <span>Total Bags : </span>
                {this.props.consignmentInfo.totalBags}
              </div>
              <div>
                <span>Count : </span> {this.props.consignmentInfo.count}'s
              </div>
              <div>
                <span>Billing time: </span>
                {this.props.consignmentInfo.time}
              </div>
              <div>
                <span> Billing Date : </span>
                {this.props.consignmentInfo.date}
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className={classes.template}>
            <div className={classes.titleheader}>Payment Info</div>
            <div className={classes.body}>
              {/* First container that contains status and amount */}
              <div className={classes.paymentfirstcontainer}>
                <div>
                  <span>Payment Status: </span>{" "}
                  <label
                    className={
                      this.props.consignmentInfo.paymentStatus === "PENDING"
                        ? classes.red
                        : classes.green
                    }
                  >
                    {this.props.consignmentInfo.paymentStatus}
                  </label>
                </div>
                <div>
                  <span>Total Commission : </span>{" "}
                  <span className={classes.symbol}>&#8377;</span>
                  {this.props.consignmentInfo.totalCommission}
                </div>
              </div>
              {/* Second container that contains all rest of information */}
              <div className={classes.paymentsecondcontainer}>
                <div>
                  <div>Per Bag Commission</div>
                  <div>
                    <span className={classes.seller}>Seller :</span>{" "}
                    {this.props.consignmentInfo.commissionSeller}
                  </div>
                  <div>
                    <span className={classes.buyer}>Buyer:</span>{" "}
                    {this.props.consignmentInfo.commissionBuyer}
                  </div>
                </div>
                <div>
                  <div>
                    Paid Commission :{" "}
                    <span className={classes.symbol}>&#8377;</span>
                    {this.props.consignmentInfo.totalPaidCommission}
                  </div>
                  <div>
                    <span className={classes.seller}>Seller: </span>
                    {this.props.consignmentInfo.sellerPaidCommission}{" "}
                  </div>
                  <div>
                    <span className={classes.buyer}>Buyer: </span>
                    {this.props.consignmentInfo.buyerPaidCommission}
                  </div>
                </div>
                <div>
                  <div>
                    Pending Commission :{" "}
                    <span className={classes.symbol}>&#8377;</span>
                    {this.props.consignmentInfo.totalCommission -
                      this.props.consignmentInfo.totalPaidCommission}
                  </div>
                  <div>
                    <div>
                      <span className={classes.seller}>Seller: </span>
                      {+this.props.consignmentInfo.totalBags *
                        +this.props.consignmentInfo.commissionSeller -
                        this.props.consignmentInfo.sellerPaidCommission}{" "}
                    </div>
                    <div>
                      <span className={classes.buyer}>Buyer: </span>
                      {+this.props.consignmentInfo.totalBags *
                        +this.props.consignmentInfo.commissionBuyer -
                        this.props.consignmentInfo.buyerPaidCommission}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipt button */}
          <div className={classes.reciptcontainer}>
            <button
              onClick={() =>
                this.props.history.push(
                  `/history/${this.props.match.params.id}/details/buyer/recipt`
                )
              }
            >
              Print Buyer Recipt
            </button>
            <button
              onClick={() =>
                this.props.history.push(
                  `/history/${this.props.match.params.id}/details/seller/recipt`
                )
              }
            >
              Print Seller Recipt
            </button>
          </div>
        </div>
      );
    }

    //When error occurs on loading details page

    if (this.props.error) {
      details = (
        <p className={classes.error}>
          Thanks for patience! Details cannot be loaded at the time !!!
        </p>
      );
    }

    return (
      <React.Fragment>
        <div className={classes.fixed}></div>
        {details}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    buyerInfo: state.detailsPage.buyerInfo,
    sellerInfo: state.detailsPage.sellerInfo,
    consignmentInfo: state.detailsPage.consignmentInfo,
    userId: state.auth.userId,
    error: state.detailsPage.errMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrivingBuyerInfo: (buyerKey, userId) =>
      dispatch(actionCreators.retrivingBuyerDataForDetails(buyerKey, userId)),
    retrivingSellerInfo: (sellerKey, userId) =>
      dispatch(actionCreators.retrivingSellerDataForDetails(sellerKey, userId)),
    retrivingConsignmentInfo: (consignmentKey, userId) =>
      dispatch(
        actionCreators.retrivingConsignmentForDetails(consignmentKey, userId)
      )
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Details)
);
