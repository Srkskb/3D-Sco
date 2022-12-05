import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { Calendar, AddEvent, EditEvent, ViewEventDetails } from "./";
import { Mail } from "../accountstack";

export default function CalendarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="AddEvent" component={AddEvent} />
      <Stack.Screen name="EditEvent" component={EditEvent} />
      <Stack.Screen name="ViewEventDetails" component={ViewEventDetails} />
      <Stack.Screen name="Mail" component={Mail} />
    </Stack.Navigator>
  );
}
