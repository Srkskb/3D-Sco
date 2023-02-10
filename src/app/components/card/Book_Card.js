import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import color from "../../assets/themes/Color"
let book_img=require('../../assets/images/book.png')
export default function Book_Card({title,author,onPress}) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={onPress}>
      <View style={styles.upper_portion}>
    <Image style={styles.bookimg} source={book_img}/>
      </View>
      <View style={styles.bottom_portion}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.author_box}>

        <Text style={styles.author}>Author: </Text>
        <Text style={styles.author_name}>{author}</Text>
        </View>
            <Text style={styles.download_btn}>View Book</Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#DDE3E8',
        width:'48%',
        borderWidth:2,
        borderColor:color.gray_light,
        justifyContent: 'center',
        borderRadius:5,
        marginBottom:15

    
    },
    bookimg:{
        width:'50%',
        height:100,
        alignSelf:'center'
    },
    upper_portion:{
        padding:10
    },
    bottom_portion:{
        backgroundColor:color.white,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
        padding:10

    },
    title:{
        fontFamily:'Montserrat-Medium',
        fontSize:11,
        // alignSelf:'center',
        marginBottom:5,
        textTransform:'uppercase',
        height:15,
    },
    author_box:{
        flexDirection:'row',
        marginBottom:10
    },
    author:{
        fontFamily:'Montserrat-Medium',
        fontSize:9,
        color:color.black
    },
    author_name:{
        fontFamily:'Montserrat-Regular',
        fontSize:9,
        textTransform:'uppercase',
        height:10
    },
    download_btn:{
        alignSelf:'center',
        fontFamily:'Montserrat-Bold',
        fontSize:10,
        color:color.purple
    }
})