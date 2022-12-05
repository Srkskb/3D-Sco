import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { Ionicons } from '@expo/vector-icons';

export default function OpenButton({ ...props }) {
  return (
    <View style={{ width: "30%" }}>
      <TouchableOpacity {...props}>
        <View style={styles.container}>
        <Ionicons name="play-outline" size={20} color={color.purple} />
          <Text style={styles.edit_text}>Open</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.purple,
    flexDirection: "row",
    borderRadius: 3,
    alignItems: "center",
    padding: 5,
    justifyContent: 'center',
  },
  edit_text: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    color: color.purple,
    marginLeft: 5,
  },
});
