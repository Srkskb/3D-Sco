import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import Category_Card from "../../../../components/admin_required/Cards/Category_Card";
import Forum_Card from "../../../../components/admin_required/Cards/Forum_Card";
export default function Forum({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");

  const DeleteForum=()=>{
    var data = new FormData();
data.append('delete_courses_form', '1');
data.append('id', '36');
data.append('user_id', '52');

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
    <View style={{backgroundColor:color.white,flex:1}}>
      <HeaderBack title={"Forums"} onPress={()=>navigation.goBack()}/>
      <ScrollView style={styles.container}>
        <TextWithButton label={"+Add"} title={"Forum Lists"} onPress={()=>navigation.navigate("AddForum")}/>
        <SelectCourse
          onSelect={(selectedItem, index) => {
            setSelectCourse(selectedItem);
          }}
        />
        <Forum_Card
          title={"Forum"}
          editPress={() => navigation.navigate("EditForum")}
          // viewPress={() => navigation.navigate("ViewForum")}
          status={"Active"}
         posted_by={"Deepak"}
         date={"24/07/2000"}
         viewPress={()=>navigation.navigate("ViewForum")}
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
