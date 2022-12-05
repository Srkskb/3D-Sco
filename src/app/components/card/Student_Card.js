import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import color from '../../assets/themes/Color'
import CheckBoxC from '../CheckBoxC'
import { FontAwesome } from '@expo/vector-icons'

export default function Student_Card({name}) {
  return (
    <View style={styles.container}>
      <View style={styles.main_box}>
      <FontAwesome name="user" size={20} color='#82027D'/>
        <View style={{marginLeft:15}}>
            <Text style={styles.names}>{name}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:color.white
    },
    main_box:{
        borderWidth:1,
        borderColor:color.light_skyblue,
        flexDirection:'row',
        padding:15,
        borderRadius:8,
        marginBottom:10
    },
    names:{
        color:color.purple,
        fontSize:16,
        fontFamily:'Montserrat-Bold'
    }
});