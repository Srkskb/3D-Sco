import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import Input from "../../../components/inputs/Input";
import SmallButton from "../../../components/buttons/SmallButton";
import { myHeadersData } from "../../../api/helper";
import * as qs from "qs";
import axios from "axios";
export default function EditResources({route,navigation}) {
  const { lastQuestion, lastQuestionParam } = route.params;
  const { lastAnswer, lastAnswerParam } = route.params;
 const [answer,setAnswer]=useState("")
 const [question,setQuestion]=useState("")
 const loginUID = localStorage.getItem("loginUID");
 // const { eventID, eventIDParam } = route.params; // ! Current Event ID
 const updateEvent = () => {
  const myHeaders = myHeadersData();
  var data = qs.stringify({
    'update_faq': '1',
    'Question': question,
    'Answer': answer,
    'catID': '5',
    'id': route.params.list.id,
    'user_id': loginUID
  });
  var config = {
    method: 'post',
    url: 'https://3dsco.com/3discoapi/studentregistration.php',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    if(response.data.success==1){
      navigation.navigate("ManageResources")
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
      name="lastQuestion"
    />
        <Input label={"Answer"} placeholder={"Enter Your Answer"}
          onChangeText={(text) => setAnswer(text)}
          value={answer}
          keyboardType="text"
          name="lastAnswer"
        />
        <View style={styles.button}>
          <SmallButton
            title={"Cancel"}
            color={color.purple}
            fontFamily={"Montserrat-Medium"}
            // onPress={()=>console.log(loginUID)}
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
