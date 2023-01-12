import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../../assets/themes/Color";
import Edit from "../../buttons/Edit";
import Remove from "../../buttons/Remove";

export default function Category_Card({ title,editPress,removePress }) {
  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
      {/* <NewCheckbox /> */}
      <Text style={styles.head_text}>{title}</Text>
      </View>
      <View style={styles.btn_container}>
        <Edit onPress={editPress}/>
        <View style={{width:20}}></View>
        <Remove onPress={removePress}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth:1,
    paddingVertical:10,
    borderRadius:3,
    borderColor:color.light_skyblue,
    paddingHorizontal:10,
    marginBottom:10
  },
  head_text: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    // marginLeft:20
  },
  btn_container:{
    flexDirection:'row',
    // justifyContent: 'space-between',
    marginTop:10
  },
  sub_container: {
    flexDirection: "row",

    // paddingHorizontal:10
  },
});
