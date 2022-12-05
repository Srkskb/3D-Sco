import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import color from '../../assets/themes/Color';

export default function MediumButton({title,...props}) {
  return (
    <View>
      <TouchableOpacity style={styles.container} {...props}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:color.purple,
        paddingHorizontal:12,
        paddingVertical:8,
        borderRadius:2,
        justifyContent: 'center',
        alignItems:'center'
    },
    title:{
        fontFamily:'Montserrat-SemiBold',
        color:color.white,
        fontSize:13
    }
});