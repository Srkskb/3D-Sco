import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import MediumButton from "../../../components/buttons/MediumButton";
import color from "../../../assets/themes/Color";
import JoinedCourse from "./JoinedCourse";
export default function CoursesJoined({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <JoinedCourse />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
