import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import HomeHeader from "../../../components/header/HomeHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBack from "../../../components/header/Header";
// import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
let course = require("../../../assets/images/account_courses/courses.png");
let announcement = require("../../../assets/images/account_courses/announcement.png");
let backup = require("../../../assets/images/account_courses/backup.png");
let category = require("../../../assets/images/account_courses/category.png");
let assignment = require("../../../assets/images/account_courses/assignment.png");
let presentation = require("../../../assets/images/account_courses/presentation.png");
let forums = require("../../../assets/images/account_courses/forums.png");

export default function CourseTab({ navigation }) {
  //   const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* <HomeHeader navigation={navigation} /> */}
      <HeaderBack title={"Courses"} onPress={() => navigation.goBack()} />
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <HeaderText title={"Courses"} />
        <View style={styles.container_boxes}>
          <View style={styles.container_items}>
            <TouchableOpacity onPress={() => navigation.navigate("Course")}>
              <View style={styles.inside_items}>
                <Image style={styles.img_res} source={course} />
                <Text style={styles.box_text}>Course</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("Assignment")}>
              <View style={styles.inside_items}>
                <Image style={styles.img_res} source={assignment} />
                <Text style={[styles.box_text, { color: color.white }]}>
                  Assignments
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Announcement")}
            >
              <View style={styles.inside_items}>
                <Image style={styles.img_res} source={announcement} />
                <Text style={styles.box_text}>Announcements</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container_items}>
            <TouchableOpacity onPress={() => navigation.navigate("Forum")}>
              <View style={styles.inside_items}>
                <Image style={styles.img_res} source={forums} />
                <Text style={styles.box_text}>Forum</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container_items}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Presentation")}
            >
              <View style={styles.inside_items}>
                <Image style={styles.img_res} source={presentation} />
                <Text style={styles.box_text}>Presentation</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container_items}>
            <TouchableOpacity onPress={() => navigation.navigate("Backup")}>
              <View style={styles.inside_items}>
                <Image style={styles.img_res} source={backup} />
                <Text style={styles.box_text}>Backup</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container_items}>
          <TouchableOpacity onPress={() => navigation.navigate("Category")}>
            <View style={styles.inside_items}>
              <Image style={styles.img_res} source={category} />
              <Text style={styles.box_text}>Category</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
