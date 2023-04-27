import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import color from "../assets/themes/Color";

const EmptyInput = ({ value, setToggle, name }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 12,
        paddingRight: 20,
        borderWidth: 2,
        borderColor: color.gray,
        borderRadius: 8,
      }}
    >
      <Text>{value}</Text>
      <TouchableOpacity
        onPress={() => {
          setToggle((prev) => ({ ...prev, [name]: false }));
        }}
      >
        <Text>close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyInput;
