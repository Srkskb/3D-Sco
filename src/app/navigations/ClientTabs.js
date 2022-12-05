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

const ClientTab = createBottomTabNavigator();

export default function ClientTabs() {
  return (
    <ClientTab.Navigator
    screenOptions={{headerShown:false,}}
      tabBarOptions={{
        activeTintColor: color.purple,
      }}
    >
      <ClientTab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={30} />
          ),
        }}
      />

      <ClientTab.Screen
        name="CalendarStack"
        component={CalendarStack}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" type="entypo" color={color} size={25} />
            
          ),
        }}
      />

      <ClientTab.Screen
        name="EducationStack"
        component={EducationStack}
        options={{
          tabBarLabel: "Education",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="menu-book" type="material" color={color} size={size} />
            <Ionicons name ="book" color={color} size={25}/>
          ),
        }}
      />

      <ClientTab.Screen
        name="StudentStack"
        component={StudentStack}
        options={{
          tabBarLabel: "Student",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome5 name="user-graduate" color={color} size={25}/>
          ),
        }}
      />

      <ClientTab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome name ="user" color={color} size={25}/>
          ),
        }}
      />

    </ClientTab.Navigator>
  );
}
