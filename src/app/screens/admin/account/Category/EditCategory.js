import { View, Text, ScrollView, StyleSheet } from "react-native";
import React , { useState }from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import Input from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import axios from "axios";
import * as qs from "qs";
export default function EditCategory({navigation,route}) {
  const [title, setTitle]=useState(route.params.title.Name)

  const EditCategory =()=>{
    var data = qs.stringify({
      'update_category': '1',
      'name': title,
      'id': route.params.title.id
    });
    var config = {
      method: 'post',
      url: 'https://3dsco.com/3discoapi/studentregistration.php',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  if(response.data.success==1){
    setTitle('')
    navigation.navigate("Category")
  }
})
.catch(function (error) {
  console.log(error);
});
  }
  return (
    <View style={{backgroundColor:color.white,flex:1}}>
      <HeaderBack title={"Edit Category"} onPress={()=>navigation.goBack()} />
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
             onPress={()=>console.log(route.params.title.Name)}
          />
          <SmallButton
            title="Update"
            color={color.white}
            backgroundColor={color.purple}
            fontFamily={"Montserrat-Bold"}
            onPress={EditCategory}
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
