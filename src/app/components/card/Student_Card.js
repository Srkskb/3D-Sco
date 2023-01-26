import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { FontAwesome } from "@expo/vector-icons";
import CardButton from "../buttons/CardButton";
import { Edit } from "../buttons";

export default function Student_Card({ name, editable, email, deleteButton,onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.main_box}>
        <FontAwesome name="user" size={20} color="#82027D" />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.names}>{name}</Text>
        </View>
      </View>
      <View style={styles.main_box}>
        <FontAwesome name="envelope-o" size={20} color="#82027D" />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.names}>{email}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        {editable && (
          <CardButton
            borderColor={color.purple}
            label={"Edit"}
            textColor={color.purple}
          />
        )}
        {deleteButton && (
          <CardButton
            borderColor={color.red}
            label={"Delete"}
            textColor={color.red}
            onPress={onPress}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.light_skyblue,
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
  },
  main_box: {
    flexDirection: "row",
    padding: 10,
  },
  names: {
    color: color.purple,
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
});
