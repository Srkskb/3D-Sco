import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { CheckBoxC } from "..";
import { MaterialIcons } from "react-native-vector-icons";
import JoinButton from "../buttons/JoinButton";

export default function ManageProjectCard({ status, title,onPress,description}) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.left_side}>
          <CheckBoxC />
        </View>
        <View style={styles.right_side}>
          <View style={styles.arrow_container}>
            <Text style={styles.head_text}>{title}</Text>
          </View>
          <Text style={styles.status_text}>{status}</Text>
        </View>
      </View>
      <View style={styles.text_container}>
        <Text style={styles.description_text}>
          {description}
        </Text>
      </View>
      <View style={styles.viewbutton}>
        <JoinButton
          title={"View File"}
          color={color.white}
          backgroundColor={color.purple}
          fontFamily={'Montserrat-Bold'}
          onPress={onPress}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.light_skyblue,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  left_side: {
    width: "10%",
  },
  right_side: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  text_container: {
    width: "90%",
    alignSelf: "flex-end",
    paddingHorizontal: 10,
  },
  description_text: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    width: "100%",
  },
  head_text: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
  },
  status_text: {
    color: color.purple,
    fontSize: 14,
    alignSelf: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  viewbutton: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
});
