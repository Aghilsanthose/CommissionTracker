import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  signature: {
    padding: "5mm",
    fontSize: "4.5mm"
  },
  space: {
    paddingTop: "15mm"
  },
  name: {
    textAlign: "right"
  },
  center: {
    textAlign: "center"
  },
  border: {
    padding: "1mm 0",
    borderBottom: "1pt solid black"
  }
});

const signature = () => {
  return (
    <View style={styles.signature}>
      <View>
        <Text style={[styles.name, styles.space]}>Signature of proprietor</Text>
        <Text style={styles.name}>(T PREMKUMAR)</Text>
      </View>

      <Text style={styles.center}>*** End of Invoice***</Text>
    </View>
  );
};

export default signature;
