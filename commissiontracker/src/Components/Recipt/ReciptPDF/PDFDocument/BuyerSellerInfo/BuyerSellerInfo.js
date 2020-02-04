import React, { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  border: {
    padding: "1mm 0",
    borderBottom: "1pt solid black"
  },
  buyerSeller: {
    fontSize: "4mm",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  title: {
    padding: "1mm 0",
    fontSize: "4.2mm",
    textAlign: "center"
  }
});

class BuyerSellerInfo extends Component {
  state = {};

  render() {
    let buyerSellerInfo = null;
    if (this.props.buyerInfo && this.props.sellerInfo) {
      const buyerAddress = this.props.buyerInfo.address.split(",");

      const sellerAddress = this.props.sellerInfo.address.split(",");

      buyerSellerInfo = (
        <React.Fragment>
          <Text style={styles.title}>CUSTOMER INFO</Text>
          <View style={styles.buyerSeller}>
            {/* Buyer Information */}
            <View>
              <Text>Buyer Name :{this.props.buyerInfo.name}</Text>
              <Text>GSTIN :{this.props.buyerInfo.gstin}</Text>
              <Text>
                Add :{buyerAddress[0]} {buyerAddress[1]}
              </Text>
              <Text>{buyerAddress[2]}</Text>
              <Text>Mob_No. :{this.props.buyerInfo.mobile_no}</Text>
            </View>
            {/* Seller Information */}
            <View>
              <Text>Seller Name :{this.props.sellerInfo.name}</Text>
              <Text>GSTIN :{this.props.sellerInfo.gstin}</Text>
              <Text>
                Add :{sellerAddress[0]} {sellerAddress[1]}
              </Text>
              <Text>{sellerAddress[2]}</Text>
              <Text>Mob_No. :{this.props.sellerInfo.mobile_no}</Text>
            </View>

            {/* Date information */}
            <View>
              <Text>Date: {this.props.consignmentInfo.date} </Text>
              <Text>Time: {this.props.consignmentInfo.time}</Text>
            </View>
          </View>

          <View style={styles.border}></View>
        </React.Fragment>
      );
    }
    return <React.Fragment>{buyerSellerInfo}</React.Fragment>;
  }
}

export default BuyerSellerInfo;
