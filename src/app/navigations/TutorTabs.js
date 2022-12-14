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
import { Home } from "./educatorstack";

const TutorTab = createBottomTabNavigator();

export default function TutorTabs() {
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
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={30} />
          ),
        }}
      />

      <TutorTab.Screen
        name="Calender"
        component={Calender}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" type="entypo" color={color} size={25} />
            
          ),
        }}
      />

      <TutorTab.Screen
        name="Education"
        component={Education}
        options={{
          tabBarLabel: "Education",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="menu-book" type="material" color={color} size={size} />
            <Ionicons name ="book" color={color} size={25}/>
          ),
        }}
      />

      <TutorTab.Screen
        name="Student"
        component={Student}
        options={{
          tabBarLabel: "Student",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome5 name="user-graduate" color={color} size={25}/>
          ),
        }}
      />

      <TutorTab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" type="material" color={color} size={size} />
            <FontAwesome name ="user" color={color} size={25}/>
          ),
        }}
      />

    </TutorTab.Navigator>
  );
}
