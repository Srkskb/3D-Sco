import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import Category_Card from "../../../../components/admin_required/Cards/Category_Card";
import Backup_Card from "../../../../components/admin_required/Cards/Backup_Card";

export default function Backup({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");
  const DeleteBackup=()=>{
    var data = new FormData();
data.append('delete_backup', '1');
data.append('id', '52');

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
      <HeaderBack title={"Backup"} onPress={()=>navigation.goBack()} />
      <ScrollView style={styles.container}>
        <TextWithButton label={"+Add"} title={"Backup"} onPress={()=>navigation.navigate("AddBackup")}/>
        <SelectCourse
          onSelect={(selectedItem, index) => {
            setSelectCourse(selectedItem);
          }}
        />
        <Backup_Card
          title={"Backup"}
          editPress={() => navigation.navigate("EditBackup")}
          course_name={"Power Management"}
          description={"Dolore nisi consequat nulla commodo."}
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
