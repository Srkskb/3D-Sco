import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import Input from "../../../components/inputs/Input";
import SmallButton from "../../../components/buttons/SmallButton";
import { myHeadersData } from "../../../api/helper";
import * as qs from "qs";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
export default function EducatorEditResources({ route, navigation }) {
  const [answer, setAnswer] = useState(route.params.list.Answer);
  const [question, setQuestion] = useState(route.params.list.Question);
  const [loading, setloading] = useState(false);
  const loginUID = localStorage.getItem("loginUID");
  // const { eventID, eventIDParam } = route.params; // ! Current Event ID
  const updateEvent = async () => {
    setloading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const myHeaders = myHeadersData();
    var data = qs.stringify({
      update_faq: "1",
      Question: question,
      Answer: answer,
      catID: "5",
      id: route.params.list.id,
      user_id: myData.id,
    });
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.success == 1) {
          setloading(false);
          setAnswer("");
          setQuestion("");
          navigation.navigate("EducatorManageResources");
        }
      })
      .catch(function (error) {
        setloading(false);
        console.log(error);
      });
  };
  return (
    <View style={styles.main}>
      <HeaderBack title={"Edit Resources"} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <Input
          label={"Question"}
          placeholder={"Enter Your Question"}
          onChangeText={(text) => setQuestion(text)}
          value={question}
          keyboardType="text"
        />
        <Input
          label={"Answer"}
          placeholder={"Enter Your Answer"}
          onChangeText={(text) => setAnswer(text)}
          value={answer}
          keyboardType="text"
        />
        <View style={styles.button}>
          <SmallButton
            title={"Cancel"}
            color={color.purple}
            fontFamily={"Montserrat-Medium"}
            onPress={()=>navigation.goBack()}
          />
          <SmallButton
            title="Update"
            color={color.white}
            backgroundColor={color.purple}
            fontFamily={"Montserrat-Bold"}
            onPress={updateEvent}
            loading={loading}
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
  main: {
    backgroundColor: color.white,
    flex: 1,
  },
});
