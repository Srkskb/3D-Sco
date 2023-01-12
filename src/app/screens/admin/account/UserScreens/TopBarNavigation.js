import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import HeaderBack from "../../../../components/header/Header";
import color from "../../../../assets/themes/Color";
import HeaderText from "../../../../components/HeaderText";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Users,InstructorRequest,MasterStudentList,EmailUser} from "./";
const Tab = createMaterialTopTabNavigator();
export default function TopBarNavigation({navigation}) {
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = React.useState(false);
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"User"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main_box}>
        <View style={{paddingHorizontal:10}}>
        <HeaderText title={"User"} />
        </View>

        <TopBar/>
      </View>
    </View>
  );
}

function TopBar() {
  return (
    <Tab.Navigator
      initialRouteName="Users"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: color.purple, height: 2},
        // tabBarActiveTintColor: color.white,
        tabBarInactiveTintColor: color.purple,
        tabBarPressColor: "transparent",
        tabBarStyle: {
          elevation: 2,
          backgroundColor:color.white,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          textTransform: "capitalize",
          fontFamily: "Montserrat-SemiBold",
        },
      }}
    >
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarLabel: "Users",
          paddingHorizontal: 10,
        }}
      />
      <Tab.Screen
        name="InstructorRequest"
        component={InstructorRequest}
        options={{ tabBarLabel: "Create New User" }}
      />
      <Tab.Screen
        name="MasterStudentList"
        component={MasterStudentList}
        options={{ tabBarLabel: "Master Student List" }}
      />
      <Tab.Screen
        name="EmailUser"
        component={EmailUser}
        options={{ tabBarLabel: "Email User" }}
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
