import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    AdminEducation,
    AdminLearnerList,
    AdminInstructorList,
    AdminLibrary,
    AdminFinancialAssistance,
    AdminAddFinancial,
    AdminEditFinancial,
} from "./";
import { AdminMail } from "../AAccount";
const Stack = createStackNavigator();

export default function AEducationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminEducation" component={AdminEducation} />
      <Stack.Screen name="AdminLearnerList" component={AdminLearnerList} />
      <Stack.Screen name="AdminInstructorList" component={AdminInstructorList} />
      <Stack.Screen name="AdminLibrary" component={AdminLibrary} />
      <Stack.Screen
        name="AdminFinancialAssistance"
        component={AdminFinancialAssistance}
      />
      <Stack.Screen name="AdminAddFinancial" component={AdminAddFinancial} />
      <Stack.Screen name="AdminEditFinancial" component={AdminEditFinancial} />
      <Stack.Screen name="AdminMail" component={AdminMail} />
    </Stack.Navigator>
  );
}