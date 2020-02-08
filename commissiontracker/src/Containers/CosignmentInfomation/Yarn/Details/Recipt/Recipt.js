import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CompanyInfo from "../../../../../Components/Consignment/Yarn/Recipt/CompanyInfo/CompanyInfo";
import BuyerSellerInfo from "../../../../../Components/Consignment/Yarn/Recipt/BuyerSellerInfo/BuyerSellerInfo";
import ConsignmentInfo from "../../../../../Components/Consignment/Yarn/Recipt/ConsignmentInfo/ConsignmentInfo";
import Signature from "../../../../../Components/Consignment/Yarn/Recipt/Signature/Signature";

import classes from "./Recipt.module.css";

class Recipt extends Component {
  state = {
    details: null
  };

  componentDidMount() {
    const localStorage = window.localStorage;
    if (this.props.details.buyerInfo) {
      this.setState({ details: this.props.details });
      localStorage.setItem("data", JSON.stringify(this.props.details));
    } else {
      this.setState({ details: JSON.parse(localStorage.getItem("data")) });
    }
  }

  render() {
    console.log("In Recipt", this.props);
    let info = null;
    if (this.state.details) {
      info = (
        <React.Fragment>
          <BuyerSellerInfo
            buyerInfo={this.state.details.buyerInfo}
            sellerInfo={this.state.details.sellerInfo}
            consignmentInfo={this.state.details.consignmentInfo}
          />
          <ConsignmentInfo
            type={this.props.type}
            consignmentInfo={this.state.details.consignmentInfo}
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className={classes.reciptcontainer}>
          <button
            onClick={() =>
              this.props.history.push(
                `/history/${this.props.match.params.id}/details/recipt/${this.props.type}PDF`
              )
            }
            className={classes.pdfbutton}
          >
            Save as PDF
          </button>
          <div className={classes.recipt}>
            <CompanyInfo />
            {info}
            <Signature />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    details: state.detailsPage
  };
};

export default withRouter(connect(mapStateToProps)(Recipt));
