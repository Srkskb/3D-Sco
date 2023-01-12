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
