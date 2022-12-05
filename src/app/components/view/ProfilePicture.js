import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { Edit, Remove } from "../buttons";


export default function ProfilePicture() {
  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image
          style={styles.profile_picture}
          source={require("../../assets/images/demo_profile.png")}
        />
      </View>
      <View style={styles.button_style}>
     <Edit/>
     <Remove/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image_container: {
    width: 125,
    height: 125,
    alignSelf: "center",
  },
  profile_picture: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    borderWidth: 5,
    borderColor: color.purple,
    alignSelf: "center",
  },
  button_style: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
});