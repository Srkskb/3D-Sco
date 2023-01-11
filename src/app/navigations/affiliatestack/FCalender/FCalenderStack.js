import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { AffiliateCalender, AffiliateAddEvent, AffiliateEditEvent, AffiliateViewEventDetails } from "./";
import { AffiliateMail } from "../FAccount";

export default function FCalenderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AffiliateCalender" component={AffiliateCalender} />
      <Stack.Screen name="AffiliateAddEvent" component={AffiliateAddEvent} />
      <Stack.Screen name="AffiliateEditEvent" component={AffiliateEditEvent} />
      <Stack.Screen name="AffiliateViewEventDetails" component={AffiliateViewEventDetails} />
      <Stack.Screen name="AffiliateMail" component={AffiliateMail} />
    </Stack.Navigator>
  );
}