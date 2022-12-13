import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    EducatorMail,
    EducatorAccount,
  } from "./";
  const Stack = createStackNavigator();
export default function Account() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EducatorAccount" component={EducatorAccount} />
      <Stack.Screen name="EducatorMail" component={EducatorMail} />
    </Stack.Navigator>
  );
}
