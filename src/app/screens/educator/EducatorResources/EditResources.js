import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import Input from "../../../components/inputs/Input";
import SmallButton from "../../../components/buttons/SmallButton";
export default function EditResources({navigation}) {
  return (
    <View style={styles.main}>
      <HeaderBack title={"Edit Resources"} />
      <ScrollView style={styles.container}>
    <Input label={"Question"} placeholder={"Enter Your Question"}/>
        <Input label={"Answer"} placeholder={"Enter Your Answer"}/>
        <View style={styles.button}>
          <SmallButton
            title={"Cancel"}
            color={color.purple}
            fontFamily={"Montserrat-Medium"}
          />
          <SmallButton
            title="Update"
            color={color.white}
            backgroundColor={color.purple}
            fontFamily={"Montserrat-Bold"}
            onPress={() => navigation.navigate("ManageResources")}
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
