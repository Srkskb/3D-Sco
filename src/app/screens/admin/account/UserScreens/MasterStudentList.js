import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import color from '../../../../assets/themes/Color';
import Student_Card from '../../../../components/card/Student_Card';
export default function MasterStudentList() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.data}>No User found</Text> */}
      <Student_Card name={"Rohit"} editable/>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:color.white,
    // justifyContent: 'center',
    // alignItems:'center',
    padding:15
  },
  data:{
    fontFamily:'Montserrat-Regular'
  }
});