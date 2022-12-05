import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import color from "../assets/themes/Color";
import { FontAwesome } from "@expo/vector-icons";

export default function WeblinkSearch({ ...props }) {
  return (
    <View style={styles.container}>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          placeholder={"Search Url..."}
          {...props}
        />
        <TouchableOpacity style={styles.search_button}>
          <FontAwesome name="search" size={24} color={color.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input_container: {
    width: "60%",
    flexDirection: "row",
  },
  input: {
    width: "70%",
    borderWidth: 1,
    borderColor: color.purple,
    padding: 5,
    paddingHorizontal:10,
    fontSize: 14,
    borderRadius: 50,
    fontFamily: "Montserrat-Regular",
    marginRight: "2%",
    marginLeft:10
  },
  search_button: {
    backgroundColor: color.purple,
    width: "28%",
    borderRadius: 100,
    alignItems:'center',
    justifyContent: 'center',
  },
});
