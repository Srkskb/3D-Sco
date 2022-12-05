import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import color from "../../assets/themes/Color";

function ReadMore({ children = 1000 }) {
  const text = children;
  const [isShow, setIsShowLess] = useState(true);
  const result = isShow ? text.substring(0, 135) : text;
  function toggleIsShow() {
    setIsShowLess(!isShow);
  }
  return (
    <Text style={styles.description_text}>
      {result}
      <TouchableOpacity onPress={toggleIsShow} style={{marginLeft:20}}>
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            textDecorationLine: "underline",
            color:color.purple
          }}
        >
          {isShow ? "Read More" : "Read Less"}
        </Text>
      </TouchableOpacity>
    </Text>
  );
}

export default function StudentCornerCard({ title, forEdit,description }) {
  return (
    <View style={styles.container}>
      <View style={styles.title_box}>
        <Text style={styles.title}>{title}</Text>
        
      </View>
      <View style={styles.details}>
        <Text style={styles.description_text}>
          {description}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title_box: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Montserrat-Bold",
    textTransform: "uppercase",
    marginBottom:10,
    fontSize:16,
  },
  edit_img: {
    height: 20,
    width: 20,
  },
  edit: {
    flexDirection: "row",
  },
  edit_text: {
    fontFamily: "Montserrat-Regular",
  },
  details: {
    backgroundColor: color.white,
    elevation: 1,
    padding: 20,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  description_text: {
    fontFamily: "Montserrat-Regular",
    textAlign: "justify",
  },
});
