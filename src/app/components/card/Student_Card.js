import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { FontAwesome } from "@expo/vector-icons";
import CardButton from "../buttons/CardButton";
import { Edit } from "../buttons";

export default function Student_Card({ name, editable }) {
  return (
    <View style={styles.container}>
      <View style={styles.main_box}>
        <FontAwesome name="user" size={20} color="#82027D" />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.names}>{name}</Text>
        </View>
       
      </View>
      {editable &&( <View style={{flexDirection:'row',marginTop:10}}>
        <CardButton borderColor={color.purple} label={"Edit"} textColor={color.purple}/>
      </View>)}
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

    
  },
  names: {
    color: color.purple,
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
});
