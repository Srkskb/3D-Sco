import { View, Text, StyleSheet, ScrollView,StatusBar } from "react-native";
import React from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "./../../../components/header/Header";
import terms from "../../../documents/terms";
import HomeHeader from "../../../components/header/HomeHeader";
export default function TermsCondition({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      {/* <HeaderBack title={"Terms & Conditions"} onPress={()=>navigation.navigate("HomeScreen")}/> */}
      <HomeHeader title={"Terms & Conditions"} navigation={navigation}/>
      <View style={styles.main}>
        <ScrollView>
          <View>
            <Text style={styles.dataline}>{terms}</Text>
            
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:color.white
  },
  main:{
    flex:1,
    backgroundColor:color.gray_white,
    margin:20,
    padding:20
  },
  headline:{
    fontFamily:'Montserrat-Bold',
    color:color.purple,
    textTransform:"uppercase",
    marginBottom:20,
    fontSize:14
  },
  dataline:{
    fontFamily:'Montserrat-Regular',
    fontSize:12,
    color:color.black
  }
});
