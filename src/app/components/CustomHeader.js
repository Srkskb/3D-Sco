import { View, Text, StyleSheet, Image,  } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react'
import color from '../assets/themes/Color';

export default function CustomHeader() {
  return (
    <View style={styles.header}>
     <View style={styles.head_container}>
      <TouchableOpacity>
        <View>
      <Image style={styles.head_img} source={require('../assets/images/menu.png')}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
      <Image style={styles.head_img2} source={require('../assets/images/message.png')}/>
      </View>
      </TouchableOpacity>
     </View>
    </View>
  )
}
const styles = StyleSheet.create({
    header:{
      backgroundColor:color.white,
      height:50,
      justifyContent: 'center',
    },
    head_container:{
      flexDirection:'row',
      justifyContent: 'space-between',
    },
    head_img:{
      height:23,
      width:30,
      marginHorizontal:10,
      marginTop:5
    },
    head_img2:{
      height:27,
      width:33,
      marginHorizontal:10
    }
});