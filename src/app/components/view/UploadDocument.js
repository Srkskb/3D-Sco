import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";

export default function UploadDocument({type, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label_text}>Upload {type}</Text>
      <View style={styles.outline}>
        <TouchableOpacity {...props}>
          <View style={styles.upload_box}>
            <Image
              style={styles.upload_icon}
              source={require("../../assets/images/icons/upload-icon.png")}
            />
            <Text style={styles.upload_text}>Upload files</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  outline: {
    borderWidth: 2,
    borderColor: color.gray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  upload_icon: {
    height: 50,
    width: 50,
  },
  upload_text: {
    color: color.purple,
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
  upload_box: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  label_text: {
    color: color.black,
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
    marginBottom: 5,
  },
});
