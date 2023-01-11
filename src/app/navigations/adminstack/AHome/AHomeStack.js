import { View, Text } from "react-native";
import React from "react";
import { AdminHomes, AdminJoinNewCourse, AdminInstituteInfo, } from "./";
import { createStackNavigator } from "@react-navigation/stack";
import { AdminMail } from "../AAccount";
const Stack = createStackNavigator();

export default function AHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHomes" component={AdminHomes} />
      <Stack.Screen name="AdminJoinNewCourse" component={AdminJoinNewCourse} />
      <Stack.Screen name="AdminInstituteInfo" component={AdminInstituteInfo} />
      <Stack.Screen name="AdminMail" component={AdminMail} />
    </Stack.Navigator>
  );
}