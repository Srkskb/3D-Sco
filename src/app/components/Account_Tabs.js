import { View, Text,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import color from '../assets/themes/Color';

export default function Account_Tabs({imgsrc,title,...props}) {
  return (
    <TouchableOpacity {...props}>
    <View style={styles.container}>
      <Image style={{height:30,resizeMode:'contain'}} source={imgsrc}/>
      <Text style={{fontSize:10,color:color.black,marginTop:5,fontFamily:'Montserrat-Regular'}}>{title}</Text>
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