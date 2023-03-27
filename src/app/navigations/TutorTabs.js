import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import color from "../assets/themes/Color";

import { FontAwesome5, Ionicons,FontAwesome } from "@expo/vector-icons";
import {Account} from "./educatorstack"
import {Calender} from "./educatorstack"
import { Education } from "./educatorstack";
import { Student } from "./educatorstack";
import {Home} from "./educatorstack"
import { HomeStack } from "./bottomstack";
const TutorTab = createBottomTabNavigator();

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes("EducatorJoinNewCourse") ||
    routeName?.includes("EducatorInstituteInfo") ||
    routeName?.includes("EducatorMail") ||
    routeName?.includes("EducatorAddEvent") ||
    routeName?.includes("EducatorEditEvent") ||
    routeName?.includes("EducatorViewEventDetails") ||
    routeName?.includes("EducatorLearnerList") ||
    routeName?.includes("EducatorInstructorList") ||
    routeName?.includes("EducatorLibrary") ||
    routeName?.includes("EducatorFinancialAssistance") ||
    routeName?.includes("EducatorAddFinancial") ||
    routeName?.includes("EducatorEditFinancial") ||
    routeName?.includes("EducatorMailPage") ||
    routeName?.includes("ComposeMail") ||
    routeName?.includes("ViewMail") ||
    routeName?.includes("Reply") ||
    routeName?.includes("EducatorEvent") ||
    routeName?.includes("EducatorCabinet") ||
    routeName?.includes("EducatorAddFileCabinet") ||
    routeName?.includes("EducatorViewContent") ||
    routeName?.includes("EducatorEditFileCabinet") ||
    routeName?.includes("EducatorLibrary") ||
    routeName?.includes("EducatorResources") ||
    routeName?.includes("EducatorStoreFavoriteLinks") ||
    routeName?.includes("EducatorAddLinks") ||
    routeName?.includes("EducatorEditStoreFavoriteLinks") ||
    routeName?.includes("EducatorViewStoreFavoriteLinks") ||
    routeName?.includes("EducatorBlogs") ||
    routeName?.includes("EducatorViewBlogs") ||
    routeName?.includes("EducatorSuggestLinks") ||
    routeName?.includes("EducatorAddBlogs") ||
    routeName?.includes("EducatorEditBlogs") ||
    routeName?.includes("EducatorPhotoAlbum") ||
    routeName?.includes("EducatorExportContent") ||
    routeName?.includes("AddPhoto") ||
    routeName?.includes("ViewPhoto") ||
    routeName?.includes("EditPhoto") ||
    routeName?.includes("EducatorAddResources") ||
    routeName?.includes("EducatorEditResources") ||
    routeName?.includes("EducatorManageResources") ||
    routeName?.includes("EducatorMyJournal") ||
    routeName?.includes("EducatorEditMyJournal") ||
    routeName?.includes("EducatorViewJournal") ||
    routeName?.includes("EducatorAddMyJournal")
   


  ) {
    return "none";
  }
  return "flex";
};

export default function TutorTabs(routeName) {
  console.log("route",routeName)
  return (
    <TutorTab.Navigator
    screenOptions={{headerShown:false,}}
      tabBarOptions={{
        activeTintColor: color.purple,
      }}
    >
      <TutorTab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={30} />
          ),
        })}
      />

      <TutorTab.Screen
        name="Calender"
        component={Calender}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" type="entypo" color={color} size={25} />
            
          ),
        })}
      />

      <TutorTab.Screen
        name="Education"
        component={Education}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Education",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="menu-book" type="material" color={color} size={size} />
            <Ionicons name ="book" color={color} size={25}/>
          ),
        })}
      />

      <TutorTab.Screen
        name="Student"
        component={Student}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Student",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome5 name="user-graduate" color={color} size={25}/>
          ),
        })}
      />

      <TutorTab.Screen
        name="Account"
        component={Account}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome name ="user" color={color} size={25}/>
          ),
        })}
      />

    </TutorTab.Navigator>
  );
}
