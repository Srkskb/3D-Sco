import { View, Text,StyleSheet,Dimensions,Image } from 'react-native'
import React from 'react'
const {height, width} = Dimensions.get('window');
export default function BackButton() {
  return (
    <View>
     <View style={styles.backbar}>
        <Image style={styles.back} source={require('../../assets/images/back.png')}/>
     </View>
    </View>
  )
}
const styles = StyleSheet.create({
    backbar: {
        height: 40,
        width: width,
        justifyContent: 'flex-end',
        paddingLeft:20
      },
      back:{
        height:25,
        width:25,
        
      }
})