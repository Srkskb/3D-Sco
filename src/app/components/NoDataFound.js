import { View, Text,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import color from '../assets/themes/Color';

export default function NoDataFound({imgsrc,title,...props}) {
  return (
    <TouchableOpacity {...props}>
    <View style={styles.container}>
      <Image style={{height:300,resizeMode:'contain'}} source={require('../../app/assets/images/nodatafound.png')}/>
   
    </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:30
    }
});