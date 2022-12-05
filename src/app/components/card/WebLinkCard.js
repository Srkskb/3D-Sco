import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { ViewButton, Remove, Edit } from "../buttons";
export default function WebLinkCard({
  title,
  link,
  category,
  description,
  viewPress,
  removePress,
  pressEdit,
}) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.right_view}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.link}>{link}</Text>
          <Text style={{ marginBottom: 5 }}>
            <Text style={styles.category}>Category: </Text>
            <Text style={styles.category_data}>{category}</Text>
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        </View>
      </View>
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
  container: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 10,
    borderWidth:1,
    borderColor:color.light_skyblue
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: color.black,
    textTransform: "capitalize",
  },
  posted_by: {
    fontFamily: "Montserrat-Medium",
    color: color.dark_gray,
    fontSize: 13,
    textTransform: "capitalize",
  },
  link: {
    fontFamily: "Montserrat-Regular",
    color: color.purple,
    fontSize: 13,
  },
  category: {
    fontFamily: "Montserrat-SemiBold",
  },
  category_data: {
    fontFamily: "Montserrat-Medium",
    textTransform: "capitalize",
  },
  description: {
    fontFamily: "Montserrat-Regular",
  },
  left_view: {
    width: "10%",
  },
  right_view: {
    width: "90%",
  },
  button_container: {
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "flex-end",
  },
});
