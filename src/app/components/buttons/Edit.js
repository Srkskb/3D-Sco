import { View, Text, Image, TouchableOpacity } from "react-native";
import { buttonStyle } from "./buttonStyle";
import React from "react";
import color from "../../assets/themes/Color";
import { Feather } from '@expo/vector-icons';

export default function Edit({ ...props }) {
  return (
    <View style={{ width: "30%" }}>
      <TouchableOpacity {...props}>
        <View style={buttonStyle.container}>
        <Feather name="edit" size={20} color={color.purple} />
          <Text style={buttonStyle.edit_text}>Edit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
