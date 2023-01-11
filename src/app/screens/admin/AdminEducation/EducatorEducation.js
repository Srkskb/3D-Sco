import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import color from "./../../../assets/themes/Color";
  import HeaderText from "./../../../components/HeaderText";
  import HomeHeader from "../../../components/header/HomeHeader";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useNavigation } from "@react-navigation/native";
  
  const { width } = Dimensions.get("window");
  let learner = require("../../../assets/images/education/learner.png");
  let financial = require("../../../assets/images/education/financial.png");
  let library = require("../../../assets/images/education/library.png");
  let instructor = require("../../../assets/images/education/instructor.png");
  
  export default function EducatorEducation() {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
     <HomeHeader navigation={navigation}/>
        <View style={{ paddingHorizontal: 10 }}>
          <HeaderText title={'STUDENT RESOURCES'}/>
          <View style={styles.container_boxes}>
            <View style={styles.container_items}>
              <TouchableOpacity onPress={() => navigation.navigate("EducatorLearnerList")}>
                <View style={styles.inside_items}>
                  <Image style={styles.img_res} source={learner} />
                  <Text style={styles.box_text}>Learner's List</Text>
                </View>
              </TouchableOpacity>
            </View>
  
            <View
              style={[
                styles.container_items,
                {
                  backgroundColor: color.purple,
                  borderBottomWidth: 0,
                  borderLeftWidth: 0,
                },
              ]}
            >
              <TouchableOpacity onPress={() => navigation.navigate("EducatorInstructorList")}>
                <View style={styles.inside_items}>
                  <Image style={styles.img_res} source={instructor} />
                  <Text style={[styles.box_text, { color: color.white }]}>
                    Instructor’s List
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
  
  
            <View
              style={[
                styles.container_items,
                { borderTopWidth: 0, borderRightWidth: 0 },
              ]}
            >
              <TouchableOpacity onPress={() => navigation.navigate("EducatorLibrary")}>
              <View style={styles.inside_items}>
                <Image style={styles.img_res} source={library} />
                <Text style={styles.box_text}>Library</Text>
              </View>
              </TouchableOpacity>
            </View>
  
  
            <View style={styles.container_items}>
              <TouchableOpacity onPress={() => navigation.navigate("EducatorFinancialAssistance")}>
              <View style={styles.inside_items}>
                <Image style={styles.img_res} source={financial} />
                <Text style={styles.box_text}>Financial Assistance</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white,
    },
    container_boxes: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      width: "100%",
    },
    container_items: {
      width: "50%",
      height: width / 2.2,
      borderWidth: 1,
      borderColor: color.light_skyblue,
    },
    header_text: {
      color: color.purple,
      fontSize: 24,
      marginVertical: 20,
    },
    img_res: {
      height: "35%",
      resizeMode: "contain",
    },
    inside_items: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    box_text: {
      fontSize: 16,
      color: color.purple,
      marginTop: 20,
    },
  });
  