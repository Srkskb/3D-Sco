import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import color from '../../assets/themes/Color';

export default function CommentCard() {
  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.name}>Deepak Singh{': '} </Text>
        <Text style={styles.time}>Mon 23rd May, 2022 01:22 pm</Text>
      </Text>
        <Text style={styles.comment}>Hello</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:color.gray_white,
        padding:20,
        marginBottom:10
    },
    name:{
        color:color.purple,
        fontFamily:'Montserrat-SemiBold',
        fontSize:14

    },
    comment:{
        fontFamily:'Montserrat-Medium',
        marginTop:10
        
    },
    time:{
        fontSize:13,
        fontFamily:'Montserrat-Regular'
    }
});