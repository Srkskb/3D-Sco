import React from 'react'
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import color from '../../assets/themes/Color';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const SmallButton = ({ onPress,fontFamily, color,title,...props}) => (
    <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer,{...props}]}>
      <Text style={[styles.appButtonText,{color},{fontFamily}]}>{title}</Text>
      
    </TouchableOpacity>
  )
export default SmallButton
  const styles = StyleSheet.create({
    appButtonContainer: {
      borderRadius: 3,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width:'30%',
      marginRight:20,
      borderWidth:1,
      borderColor:color.purple
    },
    appButtonText: {
      fontSize: wp(4),
      color: "#fff",
      alignSelf: "center",
      textTransform: "uppercase",
      fontFamily:'Montserrat-Medium',
    }
  });