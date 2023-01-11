
import React from "react";
import { AffiliateHomes, } from "./";
import { createStackNavigator } from "@react-navigation/stack";
import { AffiliateMail } from "../FAccount";
const Stack = createStackNavigator();

export default function FHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AffiliateHomes" component={AffiliateHomes} />
      <Stack.Screen name="AffiliateMail" component={AffiliateMail} />
    </Stack.Navigator>
  );
}