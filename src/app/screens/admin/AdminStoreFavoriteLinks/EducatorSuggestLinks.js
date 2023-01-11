import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Input2 from "../../../components/inputs/Input2";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import Input from "../../../components/inputs/Input";
import SmallButton from "../../../components/buttons/SmallButton";
import AccessLevel from "../../../components/dropdown/AccessLevel";
import CategoryDropdown from "../../../components/dropdown/CategoryDropdown";

export default function EducatorSuggestLink({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Suggest Link"}
        onPress={() => navigation.navigate("StoreFavoriteLinks")}
      />

      <ScrollView style={styles.main}>
        <Input label={"Title"} placeholder={"Enter Title"} />
        <CategoryDropdown
          label={"Category"}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
        />
        <Input
          label={"URL"}
          placeholder={"Enter Title"}
          defaultValue={"http://"}
        />
        <AccessLevel
          label={"Access Level"}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
        />
        <Input2
          label={"Description"}
          placeholder={"Enter Description Here"}
          multiline={true}
          numberOfLines={6}
          textAlignVertical={"top"}
        />
        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 40 }}>
          <SmallButton
            title={"Cancel"}
            fontFamily={"Montserrat-Medium"}
            color={color.purple}
          />
          <SmallButton
            title={"Save"}
            fontFamily={"Montserrat-Bold"}
            color={color.white}
            backgroundColor={color.purple}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
  main: {
    padding: 10,
    marginTop: 10,
  },
});
