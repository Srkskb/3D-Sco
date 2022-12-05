import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
export default function CourseData({ course, institute, date, time,onPress }) {
  return (
    <View style={styles.table_header}>
      <View style={styles.head}>
        <Text style={styles.head_text}>{course}</Text>
      </View>
      <View style={[styles.head, { flex: 1.5 }]}>
        <TouchableOpacity onPress ={onPress}>
          <Text
            style={[
              styles.head_text,
              { color: color.purple, fontFamily: "Montserrat-Medium" },
            ]}
          >
            {institute}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.head}>
        <Text style={styles.head_text}>{date}</Text>
        <Text style={styles.head_text}>{time}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  head: {
    flex: 1,
    borderWidth: 1,
    borderColor: color.light_skyblue,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  head_text: {
    fontFamily: "Montserrat-Regular",
  },
  table_header: {
    flexDirection: "row",
  },
});
