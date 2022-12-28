import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import color from "../assets/themes/Color";

import { FontAwesome5, Ionicons,FontAwesome } from "@expo/vector-icons";
import {PAccountStack} from "./parentstack"
import {PCalenderStack} from "./parentstack"
import { PEducationStack } from "./parentstack";
import { PStudentStack } from "./parentstack";
import {PHomeStack} from "./parentstack"
const ParentTab = createBottomTabNavigator();

export default function ParentTabs() {
  return (
    <ParentTab.Navigator
    screenOptions={{headerShown:false,}}
      tabBarOptions={{
        activeTintColor: color.purple,
      }}
    >
      <ParentTab.Screen
        name="PHomeStack"
        component={PHomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={30} />
          ),
        }}
      />

      <ParentTab.Screen
        name="PCalenderStack"
        component={PCalenderStack}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" type="entypo" color={color} size={25} />
            
          ),
        }}
      />

      <ParentTab.Screen
        name="PEducationStack"
        component={PEducationStack}
        options={{
          tabBarLabel: "Education",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="menu-book" type="material" color={color} size={size} />
            <Ionicons name ="book" color={color} size={25}/>
          ),
        }}
      />

      <ParentTab.Screen
        name="PStudentStack"
        component={PStudentStack}
        options={{
          tabBarLabel: "Student",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome5 name="user-graduate" color={color} size={25}/>
          ),
        }}
      />

      <ParentTab.Screen
        name="PAccountStack"
        component={PAccountStack}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome name ="user" color={color} size={25}/>
          ),
        }}
      />

    </ParentTab.Navigator>
  );
}
