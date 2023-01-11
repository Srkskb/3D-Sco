import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { AdminCalender, AdminAddEvent, AdminEditEvent, AdminViewEventDetails } from "./";
import { AdminMail } from "../AAccount";

export default function ACalenderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminCalender" component={AdminCalender} />
      <Stack.Screen name="AdminAddEvent" component={AdminAddEvent} />
      <Stack.Screen name="AdminEditEvent" component={AdminEditEvent} />
      <Stack.Screen name="AdminViewEventDetails" component={AdminViewEventDetails} />
      <Stack.Screen name="AdminMail" component={AdminMail} />
    </Stack.Navigator>
  );
}