import React from "react";

import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  companyname: {
    margin: 0,
    textAlign: "center"
  },
  bankAddress: {
    marginTop: "3mm",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  font: {
    fontSize: "4mm"
  },
  border: {
    padding: "1mm 0",
    borderBottom: "1pt solid black"
  }
});

const companyInfo = () => {
  return (
    <View>
      <View>
        <Text style={styles.companyname}>SAKTHI YARNS</Text>
        <Text style={[styles.companyname, styles.font]}>
          (A quality yarn Provider)
        </Text>
      </View>

      {/* Address and bank container */}

      <View style={styles.bankAddress}>
        {/* Address Information */}
        <View style={styles.font}>
          <Text>2/144 B vadugapalayam</Text>
          <Text>Kittampalayam</Text>
          <Text>Coimbatore - 641659</Text>
          <Text>Mobile: 9566632872, 9976193047</Text>
        </View>

        {/* Bank Information */}
        <View style={styles.font}>
          <Text>Bank Name : HDFC Bank</Text>
          <Text>Branch: Keeranatham</Text>
          <Text>IFSC Code : HDF000464</Text>
        </View>
      </View>
      <View style={styles.border}></View>
    </View>
  );
};

export default companyInfo;
