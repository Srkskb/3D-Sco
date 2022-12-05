import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Education,
  LearnerList,
  InstructorList,
  Library,
  FinancialAssistance,
  AddFinancial,
  EditFinancial,
} from "./";
import { Mail } from "../accountstack";
const Stack = createStackNavigator();

export default function EducationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Education" component={Education} />
      <Stack.Screen name="LearnerList" component={LearnerList} />
      <Stack.Screen name="InstructorList" component={InstructorList} />
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen
        name="FinancialAssistance"
        component={FinancialAssistance}
      />
      <Stack.Screen name="AddFinancial" component={AddFinancial} />
      <Stack.Screen name="EditFinancial" component={EditFinancial} />
      <Stack.Screen name="Mail" component={Mail} />
    </Stack.Navigator>
  );
}
