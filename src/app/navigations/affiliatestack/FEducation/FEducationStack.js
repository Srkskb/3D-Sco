import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    AffiliateEducation,
    AffiliateLearnerList,
    AffiliateInstructorList,
    AffiliateLibrary,
    AffiliateFinancialAssistance,
    AffiliateAddFinancial,
    AffiliateEditFinancial,
} from "./";
import { AffiliateMail } from "../FAccount";
const Stack = createStackNavigator();

export default function FEducationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AffiliateEducation" component={AffiliateEducation} />
      <Stack.Screen name="AffiliateLearnerList" component={AffiliateLearnerList} />
      <Stack.Screen name="AffiliateInstructorList" component={AffiliateInstructorList} />
      <Stack.Screen name="AffiliateLibrary" component={AffiliateLibrary} />
      <Stack.Screen
        name="AffiliateFinancialAssistance"
        component={AffiliateFinancialAssistance}
      />
      <Stack.Screen name="AffiliateAddFinancial" component={AffiliateAddFinancial} />
      <Stack.Screen name="AffiliateEditFinancial" component={AffiliateEditFinancial} />
      <Stack.Screen name="AffiliateMail" component={AffiliateMail} />
    </Stack.Navigator>
  );
}