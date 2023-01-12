import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import HeaderBack from "../../../components/header/Header";
import TextWithButton from "../../../components/TextWithButton";
import color from "../../../assets/themes/Color";
import SearchEnroll from "../../../components/admin_required/SearchEnroll";
import SelectCourse from "../../../components/admin_required/SelectCourse";
import { Add_Button } from "../../../components/buttons";
const { width, height } = Dimensions.get("window");
export default function Enrollment({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBack title={"Enrollment"} onPress={() => navigation.goBack()} />
      <View style={styles.main}>
        <TextWithButton title={"Enrollment Lists"} label={"Enroll a Student"} onPress={()=>navigation.navigate("EnrollStudent")}/>
        <View style={styles.search_course}>
          <View style={{ flex: 1 }}>
            <SearchEnroll placeholder={"Search...."}/>
          </View>
          <View style={{ width: "50%" }}>
            <SelectCourse
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
            />
          </View>
        </View>
        <View style={styles.filter_button}>
          <Add_Button title={"Filter"} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.main_view}>
          <Text style={styles.not_enrolled}>No one is enrolled now.</Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main: {
    paddingHorizontal: 10,
  },
  search_course: {
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "space-between",
    // width:'50%',
    alignItems: "center",
  },
  filter_button: {
    paddingVertical: 10,
    width: "40%",
    alignSelf: "center",
  },
  main_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: height / 2,
  },
  not_enrolled: {
    fontFamily: "Montserrat-Regular",
  },
});
