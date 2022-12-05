import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { Remove, ViewButton, Edit } from "../buttons";

export default function MyProjectCard({
  title,
  date,
  duration,
  description,
  viewPress,
  removePress,
  pressEdit,
}) {
  return (
    <View style={styles.blogList}>
      <Text style={styles.blogTitle}>{title}</Text>
      <View>
        <Text style={styles.blogDate}>
          <Text style={styles.bold}>Date : </Text>
          {date}
        </Text>
        <Text style={styles.blogDate}>
          <Text style={styles.bold}>Duration : </Text>
          {duration}
        </Text>
      </View>

      <Text style={styles.blogDes} numberOfLines={1}>
        {description}
      </Text>
      <View style={styles.button_container}>
        <Edit onPress={pressEdit} />
        <View style={{ width: 20 }}></View>
        <ViewButton onPress={viewPress} />
        <View style={{ width: 20 }}></View>
        <Remove onPress={removePress} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  blogList: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth:1,
    borderColor:color.light_skyblue
  },
  blogTitle: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  bold: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  blogDate: {
    fontSize: 14,
    color: color.dark_gray,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  blogDes: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Montserrat-Regular",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  button_container: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "flex-end",
  },
});
