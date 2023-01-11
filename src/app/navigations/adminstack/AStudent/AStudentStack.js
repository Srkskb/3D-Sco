import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AdminStudent } from "./";
import { AdminMail } from "../AAccount";
const Stack = createStackNavigator();

export default function StudentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminStudent" component={AdminStudent} />
      <Stack.Screen name="AdminMail" component={AdminMail} />
    </Stack.Navigator>
  );
}
