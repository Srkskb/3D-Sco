import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import Category_Card from "../../../../components/admin_required/Cards/Category_Card";
import Forum_Card from "../../../../components/admin_required/Cards/Forum_Card";
import Assignment_Card from "../../../../components/admin_required/Cards/AssignmentCard";
export default function Announcement({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack title={"Announcement"} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <TextWithButton
          label={"+Add"}
          title={"Announcements"}
          onPress={() => navigation.navigate("AddAnnouncement")}
        />
        <SelectCourse
          onSelect={(selectedItem, index) => {
            setSelectCourse(selectedItem);
          }}
        />
        <Assignment_Card
          title={"Announcement"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
          editPress={()=>navigation.navigate("EditAnnouncement")}
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
