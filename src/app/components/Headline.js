import { View,StyleSheet,Text } from 'react-native'
import React from 'react'
import color from '../assets/themes/Color';

export default function Headline({title}) {
  return (
    <View>
       <Text style={styles.heading_line}>{title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    heading_line: {
        color: color.purple,
        marginVertical: 20,
        textTransform:'uppercase',
        fontFamily:'Montserrat-Bold',
        fontSize:15
      },
});