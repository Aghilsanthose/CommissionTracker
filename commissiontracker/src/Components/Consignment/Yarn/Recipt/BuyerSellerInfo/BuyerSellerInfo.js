import React, { Component } from "react";

import classes from "./BuyerSellerInfo.module.css";

class BuyerSellerInfo extends Component {
  state = {};

  render() {
    let buyerSellerInfo = null;
    if (this.props.buyerInfo && this.props.sellerInfo) {
      const buyerAddress = this.props.buyerInfo.address.split(",");

      const sellerAddress = this.props.sellerInfo.address.split(",");

      buyerSellerInfo = (
        <React.Fragment>
          <div className={classes.buyersellerinfo}>
            {/* Buyer Information */}
            <div>
              <p className={classes.name}>
                <span>Buyer Name: </span>
                {this.props.buyerInfo.name}
              </p>
              <p>
                <span>GSTIN :</span>
                {this.props.buyerInfo.gstin}
              </p>
              <p>
                <span>Add: </span>
                {buyerAddress[0]} {buyerAddress[1]}
              </p>
              <p>{buyerAddress[2]}</p>
              <p>Mob_No. :{this.props.buyerInfo.mobile_no}</p>
            </div>
            {/* Seller Information */}
            <div>
              <p className={classes.name}>
                <span>Seller Name: </span>
                {this.props.sellerInfo.name}
              </p>
              <p>
                <span>GSTIN : </span>
                {this.props.sellerInfo.gstin}
              </p>
              <p>
                <span>Add: </span>
                {sellerAddress[0]} {sellerAddress[1]}
              </p>
              <p>{sellerAddress[2]}</p>
              <p>Mob_No. :{this.props.sellerInfo.mobile_no}</p>
            </div>

            {/* Date information */}
            <div>
              <p>Date: {this.props.consignmentInfo.date} </p>
              <p>Time: {this.props.consignmentInfo.time}</p>
            </div>
          </div>
          <hr />
        </React.Fragment>
      );
    }
    return <React.Fragment>{buyerSellerInfo}</React.Fragment>;
  }
}

export default BuyerSellerInfo;
