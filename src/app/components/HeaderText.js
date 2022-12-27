import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import color from '../assets/themes/Color';

export default function HeaderText({title}) {
  return (
    <View>
      <Text style={styles.header_text}>{title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    header_text: {
        color: color.purple,
        fontSize: 18,
        marginVertical: 20,
        textTransform:'uppercase',
        fontFamily:'Montserrat-Bold'
      },
});