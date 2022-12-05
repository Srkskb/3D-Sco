import React from 'react'
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import color from '../../assets/themes/Color';

const JoinButton = ({ onPress,title,...props}) => (
    <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer,{...props}]}>
      <Text style={styles.appButtonText}>{title}</Text>
      
    </TouchableOpacity>
  )
export default JoinButton
  const styles = StyleSheet.create({
    appButtonContainer: {
      borderRadius: 3,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor:color.purple,
    },
    appButtonText: {
      fontSize: 12,
      color: color.white,
      alignSelf: "center",
      textTransform: "uppercase",
      fontFamily:'Montserrat-Bold',
    }
  });