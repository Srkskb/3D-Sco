import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    EducatorMail,
    EducatorAccount,
    EducatorEvent,
    EducatorCabinet,
    EducatorAddFileCabinet,
    EducatorViewContent,
    EducatorEditFileCabinet,
    EducatorLibrary,
    EducatorResources
  } from "./";
  const Stack = createStackNavigator();
export default function Account() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EducatorAccount" component={EducatorAccount} />
      <Stack.Screen name="EducatorMail" component={EducatorMail} />
      <Stack.Screen name="EducatorEvent" component={EducatorEvent} />
      <Stack.Screen name="EducatorCabinet" component={EducatorCabinet} />
      <Stack.Screen name="EducatorAddFileCabinet" component={EducatorAddFileCabinet} />
      <Stack.Screen name="EducatorViewContent" component={EducatorViewContent} />
      <Stack.Screen name="EducatorEditFileCabinet" component={EducatorEditFileCabinet} />
      <Stack.Screen name="EducatorLibrary" component={EducatorLibrary} />
      <Stack.Screen name="EducatorResources" component={EducatorResources} />
    </Stack.Navigator>
  );
}
