import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
export default function Detail({ title, data,selectable }) {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.bold}> : </Text>
        <Text style={styles.description} selectable={selectable}>{data}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    // paddingHorizontal:10
  },
  title: {
    width: "30%",
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
    textTransform: "capitalize",
  },
  description: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: color.black,
    textTransform: "capitalize",
    flexWrap: "wrap",
    width: "65%",
    textAlign: "justify",
  },
  bold: {
    fontFamily: "Montserrat-SemiBold",
  },
  container: {
    marginBottom: 10,
  },
});