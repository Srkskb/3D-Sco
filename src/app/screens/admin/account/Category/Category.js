import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import Category_Card from "../../../../components/admin_required/Cards/Category_Card";

export default function Category({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");
  return (
    <View style={{backgroundColor:color.white,flex:1}}>
      <HeaderBack title={"Category"} onPress={()=>navigation.goBack()}/>
      <ScrollView style={styles.container}>
        <TextWithButton label={"+Add"} title={"Categories"} onPress={()=>navigation.navigate("AddCategory")}/>
        <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {
            setSelectCourse(selectedItem);
          }}
        />
        
        <Category_Card
          title={"Backup"}
          editPress={() => navigation.navigate("EditCategory")}
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
