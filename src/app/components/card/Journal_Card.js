import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { ViewButton, Remove, Edit } from "../buttons";

export default function Journal_Card({
  title,
  date,
  access,
  description,
  removePress,
  viewPress,
  pressEdit,
}) {
  return (
    <View style={styles.junCon}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.access_level}>
        <View style={styles.con}>
          <Text style={styles.date}>
            Date : <Text style={styles.ans}> {date}</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.date}>
            Access : <Text style={styles.ans}>{access}</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        <Text style={styles.description_title}>Description:</Text>
        <Text style={styles.description_text}> {description}</Text>
      </Text>
      <View style={styles.button_container}>
        <ViewButton onPress={viewPress} />
        <View style={{ width: 20 }}></View>
        <Edit onPress={pressEdit} />
        <View style={{ width: 20 }}></View>
        <Remove onPress={removePress} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  junCon: {
    borderWidth: 1,
    borderColor: color.light_skyblue,
    padding: 10,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Montserrat-Normal",
    textTransform: "capitalize",

    textAlign: "justify",
  },
  access_level: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  date: {
    fontSize: 14,
    color: color.dark_gray,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  description_title: {
    fontSize: 14,
    color: color.dark_gray,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
    textDecorationLine: "underline",
  },
  ans: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  description_text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  button_container: {
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "flex-end",
  },
});
