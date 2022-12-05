import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";

export default function CourseCard({ course, university,language}) {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.course_name}>{course}</Text>
        <Text style={styles.place_name}>( {university} )</Text>
        <Text style={{}}>
          <Text style={styles.language_style}>Language : </Text>
          <Text style={styles.language}>{language.substring(0,10)}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 10,
    elevation: 2,
    borderRadius: 10,
    color: color.white,
  },
  course_name: {
    fontFamily: "Montserrat-Bold",
    color: color.purple,
    fontSize: 16,
  },
  place: {
    fontFamily: "Montserrat-Regular",
    color: color.black,
    fontSize: 14,
  },
  language_style: {
    fontSize: 14,
    color: color.light_gray,
    fontFamily: "Montserrat-Bold",
  },
  language: {
    fontFamily: "Montserrat-Medium",
    fontSize:14,
  },
});
