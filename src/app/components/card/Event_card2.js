import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { CheckBoxC } from "..";
import { MaterialIcons } from "react-native-vector-icons";
import { ViewButton, Edit, Remove } from "../buttons";

export default function Event_card2({ status, title, description, date, editPress, removePress, viewPress }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.right_side}>
          <View style={styles.arrow_container}>
            <Text style={styles.head_text}>{title}</Text>
          </View>
          <View>
            <Text style={styles.status_text}>{status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.text_container}>
        <Text style={styles.description_text}>{description}</Text>
      </View>
      <View style={styles.text_container}>
        <Text style={styles.description_text}>{date}</Text>
      </View>
      <View style={styles.button_container}>
        {/* <View style={{ width: 10 }}></View> */}
        {viewPress && <ViewButton onPress={viewPress} />}

        {/* <View style={{width:20}}></View> */}
        {/* <Edit onPress={editPress} /> */}
        {/* <View style={{width:20}}></View> */}
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
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    zIndex: 0,
  },
  right_side: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  arrow_container: {
    flexDirection: "row",
    width: "50%",
    flexWrap: "wrap",
  },
  text_container: {
    height: 38,
    width: "100%",
    alignSelf: "flex-end",
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
    width: "95%",
  },
  status_text: {
    color: color.purple,
    fontSize: 14,
    alignSelf: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  button_container: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-around",
  },
});
