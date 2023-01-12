import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import HeaderBack from "../../../components/header/Header";
import TextWithButton from "../../../components/TextWithButton";
import color from "../../../assets/themes/Color";

export default function EnrollStudent({navigation}) {
  return (
    <View style={styles.container}>
      <HeaderBack title={"Enroll a student"} onPress={()=>navigation.goBack()}/>
      <View style={styles.main}>
      <TextWithButton title={"Enrollment Lists"} label={"Enroll a Student"} />
      <View style={styles.title_container}>
        <Text style={styles.title_text}>Student</Text>
        <View style={styles.inner_view}>
<Text style={styles.no_student}>No students left for enrollment.</Text>
        </View>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title_text}>Course</Text>
        <View style={styles.inner_view}>
<Text style={styles.no_student}>No students left for enrollment.</Text>
        </View>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title_text}>Enrollment Status</Text>
        <View style={styles.inner_view}>

        </View>
      </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:color.white
    },
    main:{
        paddingHorizontal:10,
        flex:1,
    },
    title_text:{
        fontFamily:'Montserrat-SemiBold',
        color:color.purple,
        textDecorationLine:'underline'
    },
    title_container:{
        flex:1
    },
    inner_view:{
        justifyContent: 'center',
        alignItems:'center',
        flex:1
    },
    no_student:{
        fontFamily:'Montserrat-Regular'
    }
});