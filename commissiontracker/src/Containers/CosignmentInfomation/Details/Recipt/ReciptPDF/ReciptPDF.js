import React, { Component } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PDFDocument from "../../../../../Components/Recipt/ReciptPDF/PDFDocument/PDFDocument";
import classes from "./ReciptPDF.module.css";

class ReciptPDF extends Component {
  state = {
    details: null
  };

  componentDidMount() {
    const localStorage = window.localStorage;
    if (this.props.details.buyerInfo) {
      this.setState({ details: this.props.details });
      localStorage.setItem("dataPDF", JSON.stringify(this.props.details));
    } else {
      this.setState({ details: JSON.parse(localStorage.getItem("dataPDF")) });
    }
  }
  render() {
    return (
      <div className={classes.pdf}>
        {this.state.details ? (
          <PDFViewer>
            <PDFDocument data={this.state.details} />
          </PDFViewer>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    details: state.detailsPage
  };
};

export default withRouter(connect(mapStateToProps)(ReciptPDF));
