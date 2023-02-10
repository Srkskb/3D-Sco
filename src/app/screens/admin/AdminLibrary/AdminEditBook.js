import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import { Image } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Edit, Remove, ViewButton } from "../../../components/buttons";
import CommonDropdown from "../../../components/dropdown/CommonDropdown";
import Input from "../../../components/inputs/Input";
import { UploadDocument } from "../../../components";
import SmallButton from "../../../components/buttons/SmallButton";

export default function AdminEditBook({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBack title={"Edit Book"} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scroll_view}>
          <CommonDropdown label={"Course"} marginBottom={10}/>
          <Input label={"Book Title"} placeholder={"Enter Book Name"} />
          <Input label={"Author"} placeholder={"Enter Author Name"} />
          <Input label={"Publisher"} placeholder={"Enter Publisher Name"} />
          <UploadDocument type={"Book (pdf,doc,ppt,xls)"} />
          <UploadDocument type={"Book Image"} />
          <Input
            label={"Description"}
            placeholder={"Enter your book description"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
          />
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
          />
        </View>
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
  detail_box: {
    backgroundColor: color.gray_light,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 3,
    height: "100%",
  },
  head_text: {
    color: color.purple,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
    marginTop: 20,
  },
  bold_text: {
    textTransform: "capitalize",
    fontFamily: "Montserrat-SemiBold",
  },
  data: {
    fontFamily: "Montserrat-Regular",
  },
  description_text: {
    fontFamily: "Montserrat-Regular",
    textAlign: "justify",
  },
  description: {
    marginTop: 20,
  },
  scroll_view: {
    padding: 15,
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
  },
});
