import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import color from "../../../assets/themes/Color";
import CoursesJoined from "./CoursesJoined";
import ClassRoom from "./courses_list/ClassRoom";
import CourseData from "../../../components/courselist/CourseData";
import CourseDetail from "./courses_list/CourseDetail";
export default function EnrolledCourses({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <CourseDetail />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: 10,
  },
  tab: {
    backgroundColor: color.purple,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: "Montserrat-SemiBold",
    color: color.white,
    borderRadius: 3,
  },
});
