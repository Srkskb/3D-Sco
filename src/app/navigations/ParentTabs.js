import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import color from "../assets/themes/Color";

import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import { PAccountStack } from "./parentstack";
import { PCalenderStack } from "./parentstack";
import { PEducationStack } from "./parentstack";
import { PStudentStack } from "./parentstack";
import { PHomeStack } from "./parentstack";
const ParentTab = createBottomTabNavigator();
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes("ParentMail") ||
    routeName?.includes("ParentAddEvent") ||
    routeName?.includes("ParentEditEvent") ||
    routeName?.includes("ParentViewEventDetails") ||
    routeName?.includes("ParentLearnerList") ||
    routeName?.includes("ParentInstructorList") ||
    routeName?.includes("ParentLibrary") ||
    routeName?.includes("ParentFinancialAssistance") ||
    routeName?.includes("ParentAddFinancial") ||
    routeName?.includes("ParentEditFinancial") ||
    routeName?.includes("ParentMailPage") ||
    routeName?.includes("ViewMail") ||
    routeName?.includes("Reply") ||
    routeName?.includes("ComposeMail") ||
    routeName?.includes("ParentEvent") ||
    routeName?.includes("ParentCabinet") ||
    routeName?.includes("ParentAddFileCabinet") ||
    routeName?.includes("ParentViewContent") ||
    routeName?.includes("ParentEditFileCabinet") ||
    routeName?.includes("ParentLibrary") ||
    routeName?.includes("ParentStoreFavoriteLinks") ||
    routeName?.includes("ParentAddLinks") ||
    routeName?.includes("ParentEditStoreFavoriteLinks") ||
    routeName?.includes("ParentViewStoreFavoriteLinks") ||
    routeName?.includes("ParentBlogs") ||
    routeName?.includes("ParentViewBlogs") ||
    routeName?.includes("ParentSuggestLinks") ||
    routeName?.includes("ParentAddBlogs") ||
    routeName?.includes("ParentEditBlogs") ||
    routeName?.includes("ParentPhotoAlbum") ||
    routeName?.includes("ParentExportContent") ||
    routeName?.includes("ParentAddPhoto") ||
    routeName?.includes("ParentViewPhoto") ||
    routeName?.includes("ParentEditPhoto")
  ) {
    return "none";
  }
  return "flex";
};
export default function ParentTabs() {
  return (
    <ParentTab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeTintColor: color.purple,
      }}
    >
      <ParentTab.Screen
        name="PHomeStack"
        component={PHomeStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={30} />
          ),
        })}
      />

      <ParentTab.Screen
        name="PCalenderStack"
        component={PCalenderStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" type="entypo" color={color} size={25} />
          ),
        })}
      />

      <ParentTab.Screen
        name="PEducationStack"
        component={PEducationStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Education",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="menu-book" type="material" color={color} size={size} />
            <Ionicons name="book" color={color} size={25} />
          ),
        })}
      />

      <ParentTab.Screen
        name="PStudentStack"
        component={PStudentStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Student",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome5 name="user-graduate" color={color} size={25} />
          ),
        })}
      />

      <ParentTab.Screen
        name="PAccountStack"
        component={PAccountStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome name="user" color={color} size={25} />
          ),
        })}
      />
    </ParentTab.Navigator>
  );
}
