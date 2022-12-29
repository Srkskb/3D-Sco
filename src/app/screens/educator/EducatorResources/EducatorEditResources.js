import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import Input from "../../../components/inputs/Input";
import SmallButton from "../../../components/buttons/SmallButton";
import { myHeadersData } from "../../../api/helper";
import axios from "axios";
export default function EducatorEditResources({route,navigation}) {
 const [answer,setAnswer]=useState("")
 const [question,setQuestion]=useState("")
 const loginUID = localStorage.getItem("loginUID");
 const { eventID, eventIDParam } = route.params; // ! Current Event ID
 const updateEvent = () => {
  const myHeaders = myHeadersData();
  var urlencoded = new FormData();
  urlencoded.append("update_faq", "1");
  urlencoded.append("Question", question);
  urlencoded.append("Answer", answer);
  urlencoded.append("id", eventID);
  urlencoded.append("user_id", loginUID);
  var data = qs.stringify({
    'update_faq': '1',
    'Question': question,
    'Answer': answer,
    'id': eventID,
    'user_id': loginUID
  });
  var config = {
    method: 'post',
    url: 'https://3dsco.com/3discoapi/studentregistration.php',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Cookie': 'PHPSESSID=8h8r2aeo9i56iqmko6mnvnfjj2'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    if(response.data.success==1){
      navigation.navigate("EducatorManageResources")
    }
  })
  .catch(function (error) {
    console.log(error);
  });
};
  return (
    <View style={styles.main}>
      <HeaderBack title={"Edit Resources"} 
      onPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
    <Input label={"Question"} placeholder={"Enter Your Question"}
      onChangeText={(text) => setQuestion(text)}
      value={question}
      keyboardType="text"
    />
        <Input label={"Answer"} placeholder={"Enter Your Answer"}
          onChangeText={(text) => setAnswer(text)}
          value={answer}
          keyboardType="text"
        
        />
        <View style={styles.button}>
          <SmallButton
            title={"Cancel"}
            color={color.purple}
            fontFamily={"Montserrat-Medium"}
          />
          <SmallButton
            title="Update"
            color={color.white}
            backgroundColor={color.purple}
            fontFamily={"Montserrat-Bold"}
            onPress={updateEvent}
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
  main:{
    backgroundColor:color.white,
    flex:1
  }
});
