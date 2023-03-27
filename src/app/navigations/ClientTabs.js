import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import color from "../assets/themes/Color";
import {
  Home,
  Calendar,
  Education,
  Student,
  Account,
} from "../screens/students";
import { FontAwesome5, Ionicons,FontAwesome } from "@expo/vector-icons";
import { HomeStack,AccountStack,CalendarStack,StudentStack,EducationStack} from "./bottomstack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const ClientTab = createBottomTabNavigator();
const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes("JoinNewCourse") ||
    routeName?.includes("InstituteInfo") ||
    routeName?.includes("Mail") ||
    routeName?.includes("AddEvent") ||
    routeName?.includes("EditEvent") ||
    routeName?.includes("ViewEventDetails") ||
    routeName?.includes("LearnerList") ||
    routeName?.includes("InstructorList") ||
    routeName?.includes("Library") ||
    routeName?.includes("FinancialAssistance") ||
    routeName?.includes("AddFinancial") ||
    routeName?.includes("EditFinancial") ||
    routeName?.includes("Student") ||
    routeName?.includes("ComposeMail") ||
    routeName?.includes("ViewMail") ||
    routeName?.includes("Reply") ||
    routeName?.includes("FileCabinet") ||
    routeName?.includes("AddFileCabinet") ||
    routeName?.includes("EditFileCabinet") ||
    routeName?.includes("ViewContent") ||
    routeName?.includes("LibraryAccess") ||
    routeName?.includes("MyResources") ||
    routeName?.includes("AddResources") ||
    routeName?.includes("ManageResources") ||
    routeName?.includes("EditResources") ||
    routeName?.includes("CourceRoomAccess") ||
    routeName?.includes("AddEditStudentCorner") ||
    routeName?.includes("ClassRoom") ||
    routeName?.includes("MyJournal") ||
    routeName?.includes("AddMyJournal") ||
    routeName?.includes("ViewJournal") ||
    routeName?.includes("EditMyJournal") ||
    routeName?.includes("StoreFavoriteLinks") ||
    routeName?.includes("AddLink") ||
    routeName?.includes("EditStoreFavoriteLinks") ||
    routeName?.includes("MyProjects") ||
    routeName?.includes("AddProject") ||
    routeName?.includes("ViewMyProject") ||
    routeName?.includes("EditMyProjects") ||
    routeName?.includes("Blogs") ||
    routeName?.includes("EditBlogs") ||
    routeName?.includes("AddBlog") ||
    routeName?.includes("ViewBlogs") ||
    routeName?.includes("StudentMailPage")
   


  ) {
    return "none";
  }
  return "flex";
};
export default function ClientTabs() {
  return (
    <ClientTab.Navigator
    screenOptions={{ headerShown: false }}
    tabBarOptions={{
      activeTintColor: color.purple,
    }}
    >
      <ClientTab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={30} />
          ),
        })}
      />

      <ClientTab.Screen
        name="CalendarStack"
        component={CalendarStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" type="entypo" color={color} size={25} />
            
          ),
        })}
      />

      <ClientTab.Screen
        name="EducationStack"
        component={EducationStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Education",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="menu-book" type="material" color={color} size={size} />
            <Ionicons name ="book" color={color} size={25}/>
          ),
        })}
      />

      <ClientTab.Screen
        name="StudentStack"
        component={StudentStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Student",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome5 name="user-graduate" color={color} size={25}/>
          ),
        })}
      />

      <ClientTab.Screen
        name="AccountStack"
        component={AccountStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome name ="user" color={color} size={25}/>
          ),
        })}
      />

    </ClientTab.Navigator>
  );
}
