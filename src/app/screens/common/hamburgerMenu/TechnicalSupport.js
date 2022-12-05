import { View, Text, StyleSheet, ScrollView,StatusBar } from "react-native";
import React from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "./../../../components/header/Header";
import technical_support from "./../../../documents/technical_support";
import HomeHeader from "../../../components/header/HomeHeader";
export default function TechnicalSupport({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      {/* <HeaderBack title={"technical support"} onPress={()=>navigation.navigate("HomeScreen")}/> */}
      <HomeHeader navigation={navigation} title={"Technical Support"}/>
      <View style={styles.main}>
        <ScrollView>
          <View>
            <Text style={styles.dataline}>{technical_support}</Text>
            
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
