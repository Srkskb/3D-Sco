import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import color from "../assets/themes/Color";

import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import { AAccountStack } from "./adminstack";
import { ACalenderStack } from "./adminstack";
import { AEducationStack } from "./adminstack";
import { AStudentStack } from "./adminstack";
import { AHomeStack } from "./adminstack";
import { HomeStack } from "./bottomstack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
const AdminTab = createBottomTabNavigator();
const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes("AdminJoinNewCourse") ||
    routeName?.includes("AdminInstituteInfo") ||
    routeName?.includes("AdminMail") ||
    routeName?.includes("AdminAddEvent") ||
    routeName?.includes("AdminEditEvent") ||
    routeName?.includes("AdminViewEventDetails") ||
    routeName?.includes("AdminLearnerList") ||
    routeName?.includes("AdminInstructorList") ||
    routeName?.includes("AdminLibrary") ||
    routeName?.includes("AdminFinancialAssistance") ||
    routeName?.includes("AdminAddFinancial") ||
    routeName?.includes("AdminEditFinancial") ||
    routeName?.includes("AdminStudent") ||
    routeName?.includes("AdminEvent") ||
    routeName?.includes("AdminCabinet") ||
    routeName?.includes("AdminAddFileCabinet") ||
    routeName?.includes("AdminViewContent") ||
    routeName?.includes("AdminEditFileCabinet") ||
    routeName?.includes("AdminResources") ||
    routeName?.includes("AdminStoreFavoriteLinks") ||
    routeName?.includes("AdminAddLinks") ||
    routeName?.includes("AdminEditStoreFavoriteLinks") ||
    routeName?.includes("AdminViewStoreFavoriteLinks") ||
    routeName?.includes("AdminBlogs") ||
    routeName?.includes("AdminViewBlogs") ||
    routeName?.includes("AdminSuggestLinks") ||
    routeName?.includes("AdminAddBlogs") ||
    routeName?.includes("AdminEditBlogs") ||
    routeName?.includes("AdminExportContent") ||
    routeName?.includes("AdminAddResources") ||
    routeName?.includes("AdminEditResources") ||
    routeName?.includes("AdminManageResources") ||
    routeName?.includes("AdminMyJournal") ||
    routeName?.includes("AdminEditMyJournal") ||
    routeName?.includes("AdminViewJournal") ||
    routeName?.includes("AdminAddMyJournal") ||
    routeName?.includes("TopBarNavigation") ||
    routeName?.includes("Enrollment") ||
    routeName?.includes("EnrollStudent") ||
    routeName?.includes("CourseTab") ||
    routeName?.includes("InstructorRequest") ||
    routeName?.includes("Course") ||
    routeName?.includes("CreateCourse") ||
    routeName?.includes("EditCourse") ||
    routeName?.includes("Assignment") ||
    routeName?.includes("EditAssignment") ||
    routeName?.includes("AddAssignment") ||
    routeName?.includes("Announcement") ||
    routeName?.includes("EditAnnouncement") ||
    routeName?.includes("AddAnnouncement") ||
    routeName?.includes("Forum") ||
    routeName?.includes("AddForum") ||
    routeName?.includes("EditForum") ||
    routeName?.includes("ViewForum") ||
    routeName?.includes("Presentation") ||
    routeName?.includes("AddPresentation") ||
    routeName?.includes("EditPresentation") ||
    routeName?.includes("Backup") ||
    routeName?.includes("AddBackup") ||
    routeName?.includes("EditBackup") ||
    routeName?.includes("Category") ||
    routeName?.includes("AddCategory") ||
    routeName?.includes("EditCategory") ||
    routeName?.includes("AdminMailPage") ||
    routeName?.includes("ViewMail") ||
    routeName?.includes("Reply") ||
    routeName?.includes("ComposeMail") ||
    routeName?.includes("AdminAddPhoto") ||
    routeName?.includes("AdminEditPhoto") ||
    routeName?.includes("AdminViewPhoto") ||
    routeName?.includes("AdminPhotoAlbum") ||
    routeName?.includes("AdminManageLibrary") ||
    routeName?.includes("AdminAddBook") ||
    routeName?.includes("AdminEditBook") ||
    routeName?.includes("ViewBook")

  ) {
    return "none";
  }
  return "flex";
};
export default function AdminTabs() {
  return (
    <AdminTab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeTintColor: color.purple,
      }}
    >
      <AdminTab.Screen
        name="AHomeStack"
        component={AHomeStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={30} />
          ),
        })}
      />

      <AdminTab.Screen
        name="ACalenderStack"
        component={ACalenderStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" type="entypo" color={color} size={25} />
          ),
        })}
      />

      <AdminTab.Screen
        name="AEducationStack"
        component={AEducationStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Education",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="menu-book" type="material" color={color} size={size} />
            <Ionicons name="book" color={color} size={25} />
          ),
        })}
      />

      <AdminTab.Screen
        name="AStudentStack"
        component={AStudentStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Student",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome5 name="user-graduate" color={color} size={25} />
          ),
        })}
      />

      <AdminTab.Screen
        name="AAccountStack"
        component={AAccountStack}
        options={({ route }) => ({
          tabBarStyle: { display: getRouteName(route) },
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome name="user" color={color} size={25} />
          ),
        })}
      />
    </AdminTab.Navigator>
  );
}
