import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";

export default function View_Document({ title, description }) {
  return (
    <View style={styles.container}>
      <View style={{ textAlign: "left", marginBottom: 20, marginTop: 10 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.light_skyblue,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginBottom:6,
    color:color.purple,
    textAlign:'left'
  },
  description: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
    textAlign:'left'
  },
});
