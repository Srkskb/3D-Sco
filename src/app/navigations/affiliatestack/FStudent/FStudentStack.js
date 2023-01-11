import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AffiliateStudent } from "./";
import { AffiliateMail } from "../FAccount";
const Stack = createStackNavigator();

export default function FStudentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AffiliateStudent" component={AffiliateStudent} />
      <Stack.Screen name="AffiliateMail" component={AffiliateMail} />
    </Stack.Navigator>
  );
}