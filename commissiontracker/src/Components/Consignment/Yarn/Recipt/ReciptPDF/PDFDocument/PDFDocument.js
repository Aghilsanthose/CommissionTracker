import React, { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import Signature from "./Signature/Signature";
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import ConsignmentInfo from "./ConsignmentInfo/ConsignmentInfo";
import BuyerSellerInfo from "./BuyerSellerInfo/BuyerSellerInfo";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  border: {
    border: "1pt solid black"
  }
});

// Create Document Component

class PDFDocument extends Component {
  state = {};
  render() {
    let info = null;
    if (this.props.data) {
      info = (
        <React.Fragment>
          <BuyerSellerInfo
            buyerInfo={this.props.data.buyerInfo}
            sellerInfo={this.props.data.sellerInfo}
            consignmentInfo={this.props.data.consignmentInfo}
          />
          <ConsignmentInfo
            type={this.props.type}
            consignmentInfo={this.props.data.consignmentInfo}
          />
        </React.Fragment>
      );
    }
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.border}>
              <CompanyInfo />
              {info}
              <Signature />
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}

export default PDFDocument;
