import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import Category_Card from "../../../../components/admin_required/Cards/Category_Card";
import Forum_Card from "../../../../components/admin_required/Cards/Forum_Card";
import Assignment_Card from "../../../../components/admin_required/Cards/AssignmentCard";
export default function Presentation({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");
  const DeletePresentation=()=>{
    var data = qs.stringify({
      'delete_courses_presentation': '1',
      'id': '8',
      'user_id': '52' 
    });
    var config = {
      method: 'post',
      url: 'https://3dsco.com/3discoapi/studentregistration.php',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'PHPSESSID=hc3kbqpelmbu5cl5em37e2j4j7'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack title={"Presentation"} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <TextWithButton
          label={"+Add"}
          title={"Presentation"}
          onPress={() => navigation.navigate("AddPresentation")}
        />
        <SelectCourse
          onSelect={(selectedItem, index) => {
            setSelectCourse(selectedItem);
          }}
        />
        <Assignment_Card
          title={"Presentation"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
          editPress={()=>navigation.navigate("EditPresentation")}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
