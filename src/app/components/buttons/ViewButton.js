import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { buttonStyle } from "./buttonStyle";
import { Ionicons } from '@expo/vector-icons';

export default function ViewButton({ ...props }) {
  return (
    <View style={{ width: "30%" }}>
      <TouchableOpacity {...props}>
        <View style={buttonStyle.container}>
        <Ionicons name="play-outline" size={20} color={color.purple} />
          <Text style={buttonStyle.edit_text}>View</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}