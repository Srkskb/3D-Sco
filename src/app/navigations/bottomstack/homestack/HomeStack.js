import { View, Text } from "react-native";
import React from "react";
import { Home, JoinNewCourse, InstituteInfo } from "./";
import { createStackNavigator } from "@react-navigation/stack";
import { Mail } from "../accountstack";
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="JoinNewCourse" component={JoinNewCourse} />
      <Stack.Screen name="InstituteInfo" component={InstituteInfo} />
      <Stack.Screen name="Mail" component={Mail} />
    </Stack.Navigator>
  );
}
