import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StudentCorner, CoursesJoined, EnrolledCourses } from "./";
const {height}=Dimensions.get('window')
const Tab = createMaterialTopTabNavigator();
const calculate=height;
export default function CourceRoomAccess() {
  const navigation = useNavigation();
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Course Room"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main_box}>
        <View style={{ paddingHorizontal: 10 }}>
          <HeaderText title={"Course Room"} />
        </View>
        <TopBar />
      </View>
    </View>
  );
}

function TopBar() {
  return (
    <Tab.Navigator
      initialRouteName="CoursesJoined"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: color.purple, height: (height>=800)?49:61 },
        tabBarActiveTintColor: color.white,
        tabBarInactiveTintColor: color.purple,
        tabBarPressColor: "transparent",
        tabBarStyle: {
          elevation: 2,
          backgroundColor: color.white,
        },

        tabBarLabelStyle: {
          fontSize: 13,
          textTransform: "capitalize",
          fontFamily: "Montserrat-SemiBold",
        },
        // swipeEnabled: false,
      }}
    >
      <Tab.Screen
        name="CoursesJoined"
        component={CoursesJoined}
        options={{
          tabBarLabel: "Courses Joined",
          paddingHorizontal: 10,
        }}
      />
      <Tab.Screen
        name="StudentCorner"
        component={StudentCorner}
        options={{ tabBarLabel: "Student Corner" }}
      />
      <Tab.Screen
        name="EnrolledCourses"
        component={EnrolledCourses}
        options={{ tabBarLabel: "Course Enrolled" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main_box: {
    flex: 1,
  },
  subhead_text: {
    fontSize: 14,
    color: color.black,
    textTransform: "uppercase",
    marginBottom: 30,
    fontFamily: "Montserrat-Bold",
  },
  book_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
