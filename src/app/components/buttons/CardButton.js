import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CardButton({
  icon,
  label,
  textColor,
  onPress,
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          elevation: 5,
          backgroundColor: color.white,
          borderRadius: 3,
          flex: 1,
          marginHorizontal: 5,
          borderWidth: 1,
          borderColor: "green",
        },
        { ...props },
      ]}
    >
      <View>
        <View style={[buttonStyle.container]}>
          <Ionicons name={icon} size={20} color={color.purple} />
          <Text style={[buttonStyle.edit_text, { color: textColor }]}>
            {label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const buttonStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 3,
    alignItems: "center",
    padding: 5,
    justifyContent: "center",
  },
  edit_text: {
    fontFamily: "Montserrat-Medium",
    fontSize: wp(3),

  },
});
