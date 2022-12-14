import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    EducatorEducation,
    EducatorLearnerList,
    EducatorInstructorList,
    EducatorLibrary,
    EducatorFinancialAssistance,
    EducatorAddFinancial,
    EducatorEditFinancial,
} from "./";
import { EducatorMail } from "../account";
const Stack = createStackNavigator();

export default function EducationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EducatorEducation" component={EducatorEducation} />
      <Stack.Screen name="EducatorLearnerList" component={EducatorLearnerList} />
      <Stack.Screen name="EducatorInstructorList" component={EducatorInstructorList} />
      <Stack.Screen name="EducatorLibrary" component={EducatorLibrary} />
      <Stack.Screen
        name="EducatorFinancialAssistance"
        component={EducatorFinancialAssistance}
      />
      <Stack.Screen name="EducatorAddFinancial" component={EducatorAddFinancial} />
      <Stack.Screen name="EducatorEditFinancial" component={EducatorEditFinancial} />
      <Stack.Screen name="EducatorMail" component={EducatorMail} />
    </Stack.Navigator>
  );
}