import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EducatorStudent } from "./";
import { EducatorMail } from "../account";
const Stack = createStackNavigator();

export default function StudentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EducatorStudent" component={EducatorStudent} />
      <Stack.Screen name="EducatorMail" component={EducatorMail} />
    </Stack.Navigator>
  );
}
