import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import color from "../../assets/themes/Color";

export default function Project_Card({
  title,
  date,
  duration,
  description,
  manageProject,
}) {
  return (
    <View style={styles.container}>
      
      <View style={styles.details}>
        <View style={styles.blogList}>
          <Text style={styles.blogTitle}>{title}</Text>
          <View>
            <Text style={styles.blogDate}>
              <Text style={styles.bold}>Date : </Text>
              {date}
            </Text>
            <Text style={styles.blogDate}>
              <Text style={styles.bold}>Duration : </Text>
              {duration}
            </Text>
          </View>

          <Text style={styles.blogDes} numberOfLines={1}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  details: {
    backgroundColor: color.white,
    // elevation: 5,
    borderWidth:1,
    borderColor:color.light_skyblue,
    padding: 20,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  description_text: {
    fontFamily: "Montserrat-Regular",
    textAlign: "justify",
  },
  blogList: {
    marginBottom: 20,

  },
  blogTitle: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  bold: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  blogDate: {
    fontSize: 14,
    color: color.dark_gray,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  blogDes: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Montserrat-Regular",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  button_container: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "flex-end",
  },
});
