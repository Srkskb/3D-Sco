import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { EducatorCalender, EducatorAddEvent, EducatorEditEvent, EducatorViewEventDetails } from "./";
import { EducatorMail } from "../account";

export default function Calender() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EducatorCalender" component={EducatorCalender}  />
      <Stack.Screen name="EducatorAddEvent" component={EducatorAddEvent} />
      <Stack.Screen name="EducatorEditEvent" component={EducatorEditEvent} />
      <Stack.Screen name="EducatorViewEventDetails" component={EducatorViewEventDetails} />
      <Stack.Screen name="EducatorMail" component={EducatorMail} />
    </Stack.Navigator>
  );
}