import React from "react";

import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  consignment: {
    fontSize: "4mm",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  title: {
    padding: "1mm 0",
    fontSize: "4.2mm",
    textAlign: "center"
  },
  border: {
    padding: "1mm 0",
    borderBottom: "1pt solid black"
  }
});

const consignmentInfo = props => {
  console.log("Props", props);
  return (
    <View>
      <Text style={styles.title}>COMMISSION INFO</Text>
      <View style={styles.consignment}>
        <View>
          <Text>Count</Text>
          <Text>{props.consignmentInfo.count}</Text>
        </View>
        <View>
          <Text>Type</Text>
          <Text>{props.consignmentInfo.type}</Text>
        </View>
        <View>
          <Text>Total Bags</Text>
          <Text>{props.consignmentInfo.totalBags}</Text>
        </View>
        <View>
          <Text>{props.type} Commission/Bag</Text>
          <Text>{props.consignmentInfo.commissionBuyer}</Text>
        </View>
        <View>
          <Text>Total Commission</Text>
          <Text>
            {(props.type === "Buyer"
              ? props.consignmentInfo.commissionBuyer
              : props.consignmentInfo.commissionSeller) *
              props.consignmentInfo.totalBags}
          </Text>
        </View>
      </View>
      {/* <table>
        <tr>
          <th>Count</th>
          <th>Type</th>
          <th>Total Bags</th>
          <th>{props.type} Commission/Bag</th>
          <th>Total Commission</th>
        </tr> */}
      {/* <tr>
          <td>{props.consignmentInfo.count}</td>
          <td>{props.consignmentInfo.type}</td>
          <td>{props.consignmentInfo.totalBags}</td>
          <td>{props.consignmentInfo.commissionBuyer}</td>
          <td>
            {(props.type === "Buyer"
              ? props.consignmentInfo.commissionBuyer
              : props.consignmentInfo.commissionSeller) *
              props.consignmentInfo.totalBags}
          </td>
        </tr>
      </table> */}
      <View style={styles.border} />
    </View>
  );
};

export default consignmentInfo;
