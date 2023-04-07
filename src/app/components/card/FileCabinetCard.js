import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { Remove, Edit, ViewButton } from "../buttons";
export default function FileCabinetCard({ access, title, description, removePress, onPress, onPressEdit }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.right_side}>
          <View style={styles.arrow_container}>
            <Text style={styles.head_text}>{title}</Text>
            <Text style={styles.status_text}>{access}</Text>
          </View>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.viewbutton}>
        <Edit onPress={onPressEdit} />
        <View style={{ width: 20 }}></View>
        <ViewButton
          title={"View Document"}
          color={color.white}
          backgroundColor={color.purple}
          fontFamily={"Montserrat-Bold"}
          onPress={onPress}
        />
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
  text_container: {
    width: "90%",
    alignSelf: "flex-end",
    paddingHorizontal: 10,
  },
  description_text: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    width: "100%",
  },
  head_text: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
  },
  status_text: {
    color: color.dark_gray,
    fontSize: 14,
    alignSelf: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  viewbutton: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    flexDirection: "row",
  },
  arrow_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
