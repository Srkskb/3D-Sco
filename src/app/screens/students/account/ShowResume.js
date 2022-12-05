import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";


export default function ShowResume({ route, navigation }) {
  const { resume, resumeParam } = route.params;


  return (
    <View style={styles.container}>
      <HeaderBack title={"Your Resume"} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
            <Text>Som</Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
  main: {
    paddingHorizontal: 10,
  },
  detail_box: {
    backgroundColor: color.gray_light,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 20,
    borderRadius: 3,
  },
  head_text: {
    color: color.purple,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
    marginBottom: 20,
  },
  bold_text: {
    textTransform: "capitalize",
    fontFamily: "Montserrat-SemiBold",
  },
  data: {
    fontFamily: "Montserrat-Regular",
  },
  description_text: {
    fontFamily: "Montserrat-Regular",
    textAlign: "justify",
  },
  description: {
    marginTop: 20,
  },
  comment_section: {
    marginTop: 10,
  },
  comment_text: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: color.black,
    textTransform: "capitalize",
    marginVertical: 10,
  },
  button_container: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 40,
  },
});
