import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import color from "../../assets/themes/Color";

export default function HeaderBack({ onPress, title }) {
  return (
    <View style={styles.header_box}>
      <TouchableOpacity style={styles.back_box} onPress={onPress}>
        <Image
          style={styles.back_arrow}
          source={require("../../assets/images/back.png")}
        />
      </TouchableOpacity>
      <Text style={styles.header_text}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header_box: {
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 2,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    backgroundColor: color.white,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    backgroundColor: color.white,
  },
  header_text: {
    color: color.purple,
    marginVertical: 5,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
  },
  back_arrow: {
    height: 20,
    width: 20,
  },
  back_box: {
    width: "20%",
    height: 20,
    position: "absolute",
    left: 10,
  },
  back_arrow: {
    height: 20,
    width: 20,
  },
  back_box: {
    width: "20%",
    height: 20,
    position: "absolute",
    left: 10,
  },
});
