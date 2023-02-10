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

export default function ViewBook({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBack title={"Book Detail"} onPress={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll_view}
      >
        <View style={styles.detail_box}>
          <Image
            source={require("../../../assets/images/logo12.png")}
            style={{ width: wp(16), height: wp(16) }}
          />
          <Text style={styles.head_text}>Course</Text>
          <Text style={styles.detail_text}>Course Name</Text>
          <Text style={styles.head_text}>Book Title</Text>
          <Text style={styles.detail_text}>Book Title Name</Text>
          <Text style={styles.head_text}>Author</Text>
          <Text style={styles.detail_text}>Author Name</Text>
          <Text style={styles.head_text}>Publisher</Text>
          <Text style={styles.detail_text}>Publisher Name</Text>
          <Text style={styles.head_text}>Book Description</Text>
          <Text style={styles.detail_text}>
            Sit ea sit aliquip dolore ad laborum proident ea. Minim veniam sit
            minim voluptate culpa velit consequat. Laborum in voluptate ea id
            commodo magna aute in. Ipsum esse non laboris duis duis consequat
            aliquip in Lorem anim laborum. Minim est eiusmod dolore Lorem
            laboris. Culpa commodo aliqua reprehenderit nulla ea mollit
            excepteur nulla adipisicing voluptate ea. Aliquip labore ad ipsum
            officia adipisicing eiusmod aliqua est qui elit quis anim labore. Eu
            excepteur consequat pariatur irure. Adipisicing ea proident proident
            aliqua nisi anim non nulla sint Lorem. Proident nisi anim sunt
            deserunt anim anim dolore excepteur velit aliqua reprehenderit.
            Aliquip excepteur do culpa mollit reprehenderit ullamco cillum ex
            deserunt aliquip veniam. Enim eiusmod proident veniam eiusmod
            tempor. Enim exercitation dolor Lorem tempor.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ViewButton />
        <Edit onPress={()=>navigation.navigate("AdminEditBook")}/>
        <Remove />
      </View>
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
    margin: 10,
    backgroundColor: color.gray_light,
  },
  detail_text: {
    fontFamily: "Montserrat-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
});
