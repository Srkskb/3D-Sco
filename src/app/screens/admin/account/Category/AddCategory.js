import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import Input from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import axios from "axios";
import * as qs from "qs";

export default function AddCategory({navigation}) {
  const [title, setTitle]=useState("")

  const AddCategory =()=>{
  var data = qs.stringify({
  'add_category': '1',
  'name': title 
});
var config = {
  method: 'post',
  url: 'https://3dsco.com/3discoapi/studentregistration.php',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'PHPSESSID=ab1fs2nn1pe8m40pg788jo8c53'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  navigation.navigate("Category")
})
.catch(function (error) {
  console.log(error);
});
  }
  return (
    <View style={{backgroundColor:color.white,flex:1}}>
      <HeaderBack title={"Add Category"} onPress={()=>navigation.goBack()}/>
      <ScrollView style={styles.container}>
        <Input label={"Title"} placeholder={"Title"}
        onChangeText={(Text)=>{setTitle(Text)}}
        value={title}
        />
        <View style={styles.button}>
          <SmallButton
            title={"Cancel"}
            color={color.purple}
            fontFamily={"Montserrat-Medium"}
          />
          <SmallButton
            title="Save"
            color={color.white}
            backgroundColor={color.purple}
            fontFamily={"Montserrat-Bold"}
            onPress={AddCategory}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
  },
});
