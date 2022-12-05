import { View, Text,StyleSheet } from "react-native";
import React from "react";
import Add_Button from "./buttons/Add_Button";
import color from "../assets/themes/Color";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


export default function TextWithButton({title,onPress,label}) {
  return (
    <View>
      <View style={styles.add_box}>
        <Text style={styles.title}>{title}</Text>
        <Add_Button title={label} onPress={onPress}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  add_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  title:{
    fontFamily:'Montserrat-SemiBold',
    fontSize:wp(4),
    color:color.black,
    textTransform:'uppercase'
  }
});
