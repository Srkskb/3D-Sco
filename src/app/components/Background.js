import { View,Image,StyleSheet, Dimensions,KeyboardAvoidingView,ImageBackground} from 'react-native'
import React from 'react'
const newLocal = '../assets/images/background/Background.png'
var bg=require(newLocal)
const {height,width}=Dimensions.get('window')
export default function Background({ children }) {
  return (
    <ImageBackground
      source={bg}
      resizeMode="cover"
      style={styles.image}
    >
      {/* <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView> */}
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    image:{
        height:height,
        width:width,
    }
})