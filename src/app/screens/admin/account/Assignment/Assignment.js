import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import Category_Card from "../../../../components/admin_required/Cards/Category_Card";
import Forum_Card from "../../../../components/admin_required/Cards/Forum_Card";
import Assignment_Card from "../../../../components/admin_required/Cards/AssignmentCard";
export default function Assignment({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");
  const DeleteAssignment=()=>{
    var data = new FormData();
data.append('Delete_courses_assignment', '1');
data.append('id', '13');

var config = {
  method: 'post',
  url: 'https://3dsco.com/3discoapi/studentregistration.php',
  headers: { 
    'Cookie': 'PHPSESSID=hc3kbqpelmbu5cl5em37e2j4j7', 
    ...data.getHeaders()
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
      <HeaderBack title={"Assignments"} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <TextWithButton
          label={"+Add"}
          title={"Assignments"}
          onPress={() => navigation.navigate("AddAssignment")}
        />
        <SelectCourse
          onSelect={(selectedItem, index) => {
            setSelectCourse(selectedItem);
          }}
        />
        <Assignment_Card
          title={"Assignments"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
          editPress={()=>navigation.navigate("EditAssignment")}
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
