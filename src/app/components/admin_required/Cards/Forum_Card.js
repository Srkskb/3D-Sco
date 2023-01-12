import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
// import NewCheckbox from "../../NewCheckbox";
import color from "../../../assets/themes/Color";
import Edit from "../../buttons/Edit";
import Remove from "../../buttons/Remove";
import { ViewButton } from "../../buttons";

export default function Forum_Card({
  title,
  editPress,
  removePress,
  viewPress,
  posted_by,
  date,
  status,
  commentPress
}) {
  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        {/* <NewCheckbox /> */}
        <Text style={styles.head_text}>{title}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
      <View style={styles.course}>
        <Text style={styles.course_name}>Posted By: </Text>
        <Text
          style={[styles.course_name, { fontFamily: "Montserrat-Regular" }]}
        >
          {posted_by}
        </Text>
      </View>
      <View style={styles.course}>
        <Text style={styles.course_name}>Date: </Text>
        <Text
          style={[styles.course_name, { fontFamily: "Montserrat-Regular" }]}
        >
          {date}
        </Text>
      </View>
      <View style={styles.btn_container}>
        <ViewButton onPress={viewPress} />
        <Edit onPress={editPress} />

        <Remove onPress={removePress} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 3,
    borderColor: color.light_skyblue,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor:color.white,
  },
  head_text: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    // marginLeft:20
  },
  btn_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  sub_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal:10
  },
  course_name: {
    fontFamily: "Montserrat-SemiBold",
    color: color.black,
  },
  course: {
    flexDirection: "row",
    marginVertical: 5,
  },
  status: {
    fontFamily: "Montserrat-Medium",
    color: color.purple,
  },
});
