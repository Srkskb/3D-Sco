import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HeaderBack from "../../../components/header/Header";
import TextWithButton from "../../../components/TextWithButton";
import color from "../../../assets/themes/Color";
import CommonDropdown from "../../../components/dropdown/CommonDropdown";
import AppButton from "../../../components/buttons/AppButton";

export default function EnrollStudent({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Enroll a student"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <CommonDropdown label={"Select Student"} />

        <CommonDropdown label={"Select Course"} />
      </View>
      <View style={styles.title_container}>
        <AppButton title={"Enroll"} btnColor={color.purple} />
        <View style={styles.inner_view}></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main: {
    paddingHorizontal: 10,
    flex: 1,
  },
  title_text: {
    fontFamily: "Montserrat-SemiBold",
    color: color.purple,
    textDecorationLine: "underline",
  },
  title_container: {
    // flex: 1,
    padding:15
  },
  inner_view: {
    justifyContent: "center",
    alignItems: "center",
    // flex:1
  },
  no_student: {
    fontFamily: "Montserrat-Regular",
  },
});
