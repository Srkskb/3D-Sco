import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";

export default function CommentCard({ CommentDate, comments, name }) {
  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.name}>
          {name}
          {": "}{" "}
        </Text>
        <Text style={styles.time}>{CommentDate}</Text>
      </Text>
      <Text style={styles.comment}>{comments}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.gray_white,
    padding: 20,
    marginBottom: 10,
  },
  name: {
    color: color.purple,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
  },
  comment: {
    fontFamily: "Montserrat-Medium",
    marginTop: 10,
  },
  time: {
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
  },
});
