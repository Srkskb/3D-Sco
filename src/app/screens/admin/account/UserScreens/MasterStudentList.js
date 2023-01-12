import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import color from '../../../../assets/themes/Color';

export default function MasterStudentList() {
  return (
    <View style={styles.container}>
      <Text style={styles.data}>No User found</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:color.white,
    justifyContent: 'center',
    alignItems:'center'
  },
  data:{
    fontFamily:'Montserrat-Regular'
  }
});