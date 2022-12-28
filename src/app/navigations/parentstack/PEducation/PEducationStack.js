import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    ParentEducation,
    ParentLearnerList,
    ParentInstructorList,
    ParentLibrary,
    ParentFinancialAssistance,
    ParentAddFinancial,
    ParentEditFinancial,
} from "./";
import { ParentMail } from "../PAccount";
const Stack = createStackNavigator();

export default function PEducationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentEducation" component={ParentEducation} />
      <Stack.Screen name="ParentLearnerList" component={ParentLearnerList} />
      <Stack.Screen name="ParentInstructorList" component={ParentInstructorList} />
      <Stack.Screen name="ParentLibrary" component={ParentLibrary} />
      <Stack.Screen
        name="ParentFinancialAssistance"
        component={ParentFinancialAssistance}
      />
      <Stack.Screen name="ParentAddFinancial" component={ParentAddFinancial} />
      <Stack.Screen name="ParentEditFinancial" component={ParentEditFinancial} />
      <Stack.Screen name="ParentMail" component={ParentMail} />
    </Stack.Navigator>
  );
}