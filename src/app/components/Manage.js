import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "react-native-vector-icons";
import color from "../assets/themes/Color";

export default function Manage({ title }) {
  return (
    <View>
      <View style={styles.head}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome name="gears" size={13} color={color.purple} />
          <Text style={styles.manage}> Manage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    // marginTop:20,
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
  },
  manage: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: color.dark_gray,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: color.black,
    textTransform: "uppercase",
  },
});
