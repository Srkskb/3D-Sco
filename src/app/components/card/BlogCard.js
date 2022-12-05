import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";

import {  Remove, ViewButton } from "../buttons";
const hello = "user can interact with people using more power with help need";
export default function BlogCard({
  description,
  viewPress,
  title,
  date,
  removePress
}) {
  const loginUID = localStorage.getItem("loginUID");
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
      
        <View style={styles.right_side}>
          <View style={{ width: "100%" }}>
            <Text style={styles.head_text}>{title}</Text>
            <Text style={styles.date}>Last Updated - {date}</Text>
            <Text style={styles.description_text} numberOfLines={1}>{description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.button_container}>
        <ViewButton onPress={viewPress} />
        <View style={{ width: 20 }}></View>
        {/* <Edit onPress={editPress} /> */}
        <View style={{ width: 20 }}></View>

        <Remove onPress={removePress} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.light_skyblue,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  left_side: {
    width: "10%",
  },
  right_side: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  description_text: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    width: "100%",
    textAlign: "justify",
  },
  head_text: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
  },
  date: {
    fontFamily: "Montserrat-SemiBold",
    color: color.dark_gray,
    fontSize: 12,
  },
  button_container: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "center",
  },
});
