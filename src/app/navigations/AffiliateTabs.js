import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import color from "../assets/themes/Color";
import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import { FAccountStack } from "./affiliatestack";
import { FCalenderStack } from "./affiliatestack";
import { FEducationStack } from "./affiliatestack";
import { FStudentStack } from "./affiliatestack";
import { FHomeStack } from "./affiliatestack";
import { HomeStack } from "./bottomstack";
const AffiliateTab = createBottomTabNavigator();
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes("AffiliateMail") ||
    routeName?.includes("AffiliateAddEvent") ||
    routeName?.includes("AffiliateEditEvent") ||
    routeName?.includes("AffiliateViewEventDetails") ||
    routeName?.includes("AffiliateLearnerList") ||
    routeName?.includes("AffiliateInstructorList") ||
    routeName?.includes("AffiliateLibrary") ||
    routeName?.includes("AffiliateFinancialAssistance") ||
    routeName?.includes("AffiliateAddFinancial") ||
    routeName?.includes("AffiliateEditFinancial") ||
    routeName?.includes("AffiliateMailPage") ||
    routeName?.includes("ComposeMail") ||
    routeName?.includes("ViewMail") ||
    routeName?.includes("Reply") ||
    routeName?.includes("AffiliateEvent") ||
    routeName?.includes("AffiliateCabinet") ||
    routeName?.includes("AffiliateAddFileCabinet") ||
    routeName?.includes("AffiliateViewContent") ||
    routeName?.includes("AffiliateEditFileCabinet") ||
    routeName?.includes("AffiliateLibrary") ||
    routeName?.includes("AffiliateStoreFavoriteLinks") ||
    routeName?.includes("AffiliateAddLinks") ||
    routeName?.includes("AffiliateEditStoreFavoriteLinks") ||
    routeName?.includes("AffiliateViewStoreFavoriteLinks") ||
    routeName?.includes("EducatorViewStoreFavoriteLinks") ||
    routeName?.includes("AffiliateBlogs") ||
    routeName?.includes("AffiliateViewBlogs") ||
    routeName?.includes("AffiliateSuggestLinks") ||
    routeName?.includes("AffiliateAddBlogs") ||
    routeName?.includes("AffiliateEditBlogs") ||
    routeName?.includes("AffiliatePhotoAlbum") ||
    routeName?.includes("AffiliateExportContent") ||
    routeName?.includes("AffiliateAddMyJournal") ||
    routeName?.includes("AffiliateViewPhoto") ||
    routeName?.includes("AffiliateEditMyJournal") ||
    routeName?.includes("AffiliateMyJournal") ||
    routeName?.includes("AffiliateAddPhoto") ||
    routeName?.includes("AffiliateEditPhoto") ||
    routeName?.includes("AffiliateViewJournal")
  ) {
    return "none";
  }
  return "flex";
};
export default function AffiliateTabs() {
  return (
    <AffiliateTab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeTintColor: color.purple,
      }}
    >
      <AffiliateTab.Screen
        name="FHomeStack"
        component={FHomeStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={30} />
          ),
        })}
      />

      <AffiliateTab.Screen
        name="FCalenderStack"
        component={FCalenderStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" type="entypo" color={color} size={25} />
          ),
        })}
      />

      <AffiliateTab.Screen
        name="FEducationStack"
        component={FEducationStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Education",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="menu-book" type="material" color={color} size={size} />
            <Ionicons name="book" color={color} size={25} />
          ),
        })}
      />

      <AffiliateTab.Screen
        name="FStudentStack"
        component={FStudentStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Student",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome5 name="user-graduate" color={color} size={25} />
          ),
        })}
      />

      <AffiliateTab.Screen
        name="FAccountStack"
        component={FAccountStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome name="user" color={color} size={25} />
          ),
        })}
      />
    </AffiliateTab.Navigator>
  );
}
