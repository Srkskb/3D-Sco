import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
export default function Mail_Card({title,description}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
      {description}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: color.white,
    borderColor: color.light_gray,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginBottom:20,
    marginTop:5
  },
  title: {
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  description: {
    fontFamily: "Montserrat-Regular",
    textAlign: "justify",
    height: 30,
    fontSize: 12,
    color: color.black,
  },
});
