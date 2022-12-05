import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import color from '../../assets/themes/Color';
export default function CourseHeader() {
  return (
    <View style={styles.table_header}>
    <View style={styles.head}>
      <Text style={styles.head_text}>Course</Text>
    </View>
    <View style={[styles.head,{flex:1.5}]}>
      <Text style={styles.head_text}>Institute Name</Text>
    </View>
    <View style={styles.head}>
      <Text style={styles.head_text}>Joining Date</Text>
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
    head: {
        flex: 1,
        borderWidth: 1,
        borderColor: color.light_skyblue,
        paddingVertical:5,
        paddingHorizontal:2
      },
      head_text:{
        fontFamily:'Montserrat-SemiBold'
      },
      table_header: {
        flexDirection: "row",
        backgroundColor:color.gray_white
      },
});