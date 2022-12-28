import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ParentStudent } from "./";
import { ParentMail } from "../PAccount";
const Stack = createStackNavigator();

export default function PStudentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentStudent" component={ParentStudent} />
      <Stack.Screen name="ParentMail" component={ParentMail} />
    </Stack.Navigator>
  );
}