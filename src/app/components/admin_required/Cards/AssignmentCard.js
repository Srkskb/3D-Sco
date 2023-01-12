import { View, Text, StyleSheet } from "react-native";
import React from "react";
// import NewCheckbox from "../../NewCheckbox";
import color from "../../../assets/themes/Color";
import Edit from "../../buttons/Edit";
import Remove from "../../buttons/Remove";
import { ViewButton } from "../../buttons";

export default function Assignment_Card({ title,editPress,removePress,viewPress,description }) {
  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
      {/* <NewCheckbox /> */}
      <Text style={styles.head_text}>{title}</Text>
      </View>
      <Text style={{fontFamily:'Montserrat-Regular'}}>{description}</Text>
      <View style={styles.btn_container}>
        <ViewButton onPress={viewPress}/>
        <Edit onPress={editPress}/>
        {/* <View style={{width:20}}></View> */}
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
    justifyContent: 'space-between',
    marginTop:10
  },
  sub_container: {
    flexDirection: "row",

    // paddingHorizontal:10
  },
  course_name:{
    fontFamily:'Montserrat-SemiBold',
    color:color.black
  },
  course:{
    flexDirection:'row',
    marginVertical:5
  }
});
