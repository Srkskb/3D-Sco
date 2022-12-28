import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { ParentCalender, ParentAddEvent, ParentEditEvent, ParentViewEventDetails } from "./";
import { ParentMail } from "../PAccount";

export default function PCalenderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentCalender" component={ParentCalender} />
      <Stack.Screen name="ParentAddEvent" component={ParentAddEvent} />
      <Stack.Screen name="ParentEditEvent" component={ParentEditEvent} />
      <Stack.Screen name="ParentViewEventDetails" component={ParentViewEventDetails} />
      <Stack.Screen name="ParentMail" component={ParentMail} />
    </Stack.Navigator>
  );
}