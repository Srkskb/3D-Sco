import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { Feather } from "@expo/vector-icons";

export default function View_Resume({ ViewPress, showResume }) {
  return (
    <View>
      <Text style={styles.head_text}>Resume</Text>
      <TouchableOpacity>
        <View style={styles.box}>
          <TouchableOpacity
            disabled
            style={styles.left_content}
            onPress={ViewPress}
          >
            <View>
              <Text style={styles.view}>View Current Resume</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.upload_box}>
            <TouchableOpacity
              
              style={{ alignItems: "center", justifyContent: "center" }}
              onPress={showResume}
            >
              <Feather name="play" size={20} color={color.purple} />
              <Text style={styles.upload_text}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  head_text: {
    fontFamily: "Montserrat-Medium",
    textTransform: "uppercase",
    fontSize: 14,
    marginBottom: 10,
  },
  box: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 5,
    elevation: 1,
    marginBottom: 5,
  },
  left_content: {
    width: "80%",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  upload_box: {
    width: "20%",
    paddingVertical: 10,
  },
  uplaod_img: {
    height: 22,
    width: 22,
  },
  upload_text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: color.purple,
  },
  view: {
    fontFamily: "Montserrat-Bold",
    color: color.purple,
    fontSize: 15,
  },
});
