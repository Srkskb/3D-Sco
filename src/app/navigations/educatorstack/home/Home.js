import { View, Text } from "react-native";
import React from "react";
import { EducatorHomes, EducatorJoinNewCourse, EducatorInstituteInfo, } from "./";
import { createStackNavigator } from "@react-navigation/stack";
import { EducatorMail } from "../account";
const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EducatorHomes" component={EducatorHomes} />
      <Stack.Screen name="EducatorJoinNewCourse" component={EducatorJoinNewCourse} />
      <Stack.Screen name="EducatorInstituteInfo" component={EducatorInstituteInfo} />
      <Stack.Screen name="EducatorMail" component={EducatorMail} />
    </Stack.Navigator>
  );
}