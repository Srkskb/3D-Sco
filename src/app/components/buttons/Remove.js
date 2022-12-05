import { View, Text, TouchableOpacity } from "react-native";
import { buttonStyle } from "./buttonStyle";
import React from "react";
import color from "../../assets/themes/Color";
import { AntDesign } from "@expo/vector-icons";

export default function Remove({ ...props }) {
  return (
    <View style={{width:'30%'}}>
      <TouchableOpacity {...props}>
        <View style={[buttonStyle.container,{borderColor:color.red}]}>
          <AntDesign name="delete" size={20} color={color.red}/>
          <Text style={[buttonStyle.edit_text,{color:color.red}]}>Remove</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

