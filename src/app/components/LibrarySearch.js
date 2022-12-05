import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import color from "../assets/themes/Color";
export default function Library_Search() {
  return (
    <View style={styles.search_box}>
      <View style={styles.icon_box}>
        <Image
          style={styles.icon}
          source={require("../assets/images/Search.png")}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.text_input}
          placeholder={"Search title, author..."}
        />
      </View>
      <TouchableOpacity style={styles.search_button}>
        <View>
          <Text style={styles.search_text}>SEARCH</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  search_box: {
    borderWidth: 1,
    borderColor: color.purple,
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: 20,
    height: 40,
  },
  text_input: {
    fontFamily: "Montserrat-Regular",
    padding: 5,
    flex: 3,
    flexDirection: "row",
    width: "100%",
  },
  search_button: {
    backgroundColor: color.purple,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  input: {
    width: "60%",
  },
  search_text: {
    fontFamily: "Montserrat-Bold",
    color: color.white,
    fontSize: 12,
  },
  icon: {
    height: 25,
    width: 25,
    justifyContent: "center",
  },
  icon_box: { width: "10%", justifyContent: "center", alignItems: "center" },
});
