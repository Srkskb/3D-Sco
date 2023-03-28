import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import color from "../../assets/themes/Color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Add_Button = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
export default Add_Button;
const styles = StyleSheet.create({
  appButtonContainer: {
    backgroundColor: color.purple,
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: wp(5),
  },
  appButtonText: {
    fontSize: wp(4),
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Montserrat-SemiBold",
  },
});
