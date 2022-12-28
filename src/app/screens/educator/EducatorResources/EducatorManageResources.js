import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import TextWithButton from "../../../components/TextWithButton";
import Event_Card from "../../../components/card/Event_Card";

export default function ManageResources({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");
  return (
    <View style={styles.main}>
      <HeaderBack title={"Manage Resources"} onPress={()=>navigation.goBack()}/>
      <ScrollView style={styles.container}>
        <TextWithButton
          label={"Post"}
          title={"Post Your Question"}
          onPress={() => navigation.navigate("EducatorAddResources")}
        />
        <Event_Card
          title={"My Question"}
          description={"My Answer"}
          date={"24/05/2023"}
          editPress={() => navigation.navigate("EducatorEditResources")}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  main: {
    backgroundColor: color.white,
    flex: 1,
  },
});
