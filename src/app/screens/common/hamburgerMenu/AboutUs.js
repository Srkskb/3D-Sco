import { View, Text, StyleSheet, ScrollView,StatusBar } from "react-native";
import React from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "./../../../components/header/Header";
import aboutUs from "./../../../documents/aboutUs";
import HomeHeader from "../../../components/header/HomeHeader";

export default function AboutUs({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      {/* <HeaderBack title={"About us"} onPress={()=>navigation.navigate("HomeScreen")}/> */}
      <HomeHeader navigation={navigation} title={"About Us"}/>
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.headline}>Team Member</Text>
            <Text style={styles.datalines}>{aboutUs}</Text>
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
  datalines:{
    fontFamily:'Montserrat-Regular',
    fontSize:12,
    color:color.black,
    textAlign:"justify"
  }
});
