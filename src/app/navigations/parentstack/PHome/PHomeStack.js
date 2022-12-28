
import React from "react";
import { ParentHomes, } from "./";
import { createStackNavigator } from "@react-navigation/stack";
import { ParentMail } from "../PAccount";
const Stack = createStackNavigator();

export default function PHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentHomes" component={ParentHomes} />
      <Stack.Screen name="ParentMail" component={ParentMail} />
    </Stack.Navigator>
  );
}