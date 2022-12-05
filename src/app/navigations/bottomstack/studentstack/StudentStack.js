import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Student } from "./";
import { Mail } from "../accountstack";
const Stack = createStackNavigator();

export default function StudentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Student" component={Student} />
      <Stack.Screen name="Mail" component={Mail} />
    </Stack.Navigator>
  );
}
