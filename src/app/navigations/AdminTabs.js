import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import color from "../assets/themes/Color";

import { FontAwesome5, Ionicons,FontAwesome } from "@expo/vector-icons";
import {AAccountStack} from "./adminstack"
import {ACalenderStack} from "./adminstack"
import { AEducationStack } from "./adminstack";
import { AStudentStack } from "./adminstack"
import {AHomeStack} from "./adminstack"
import { HomeStack } from "./bottomstack";
const AdminTab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <AdminTab.Navigator
    screenOptions={{headerShown:false,}}
      tabBarOptions={{
        activeTintColor: color.purple,
      }}
    >
      <AdminTab.Screen
        name="AHomeStack"
        component={AHomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={30} />
          ),
        }}
      />

      <AdminTab.Screen
        name="ACalenderStack"
        component={ACalenderStack}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" type="entypo" color={color} size={25} />
            
          ),
        }}
      />

      <AdminTab.Screen
        name="AEducationStack"
        component={AEducationStack}
        options={{
          tabBarLabel: "Education",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="menu-book" type="material" color={color} size={size} />
            <Ionicons name ="book" color={color} size={25}/>
          ),
        }}
      />

      <AdminTab.Screen
        name="AStudentStack"
        component={AStudentStack}
        options={{
          tabBarLabel: "Student",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome5 name="user-graduate" color={color} size={25}/>
          ),
        }}
      />

      <AdminTab.Screen
        name="AAccountStack"
        component={AAccountStack}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome name ="user" color={color} size={25}/>
          ),
        }}
      />

    </AdminTab.Navigator>
  );
}
