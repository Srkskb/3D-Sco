import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import color from "../../assets/themes/Color";

const AppButton = ({ onPress, title, btnColor, ...props }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: btnColor,
      borderRadius: 6,
      paddingVertical: 12,
      // paddingHorizontal: 12,
    }}
    {...props}
  >
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
export default AppButton;
const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    textTransform: "capitalize",
    fontFamily: "Montserrat-Bold",
  },
});
