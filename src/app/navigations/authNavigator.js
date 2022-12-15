import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import {
  Login,
  UserType,
  OTPVerification,
  RegistrationForAll,
  ForgetPassword,
} from "../screens";
import ClientTabs from "./ClientTabs";
import DrawerNavigator from "./DrawerNavigator";
import TutorDrawerNavigator from "./TutorDrawerNavigator";
import ParentDrawerNavigator from "./ParentDrawerNavigator"
import { Signup_Educator } from "../screens/educator";
import { Signup_Admin } from "../screens/admin";
import Signup_Affiliate from "../screens/affiliate/Signup_Affiliate";
import Signup_Parent from "../screens/parents/Signup_Parent";

const AuthStack = createStackNavigator();
export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="UserType"
        component={UserType}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <AuthStack.Screen
        name="RegistrationForAll"
        component={RegistrationForAll}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <AuthStack.Screen
        name="Signup_Educator"
        component={Signup_Educator}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <AuthStack.Screen
        name="Signup_Parent"
        component={Signup_Parent}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <AuthStack.Screen
        name="Signup_Admin"
        component={Signup_Admin}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <AuthStack.Screen
        name="Signup_Affiliate"
        component={Signup_Affiliate}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <AuthStack.Screen
        name="OTPVerification"
        component={OTPVerification}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <AuthStack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <AuthStack.Screen
        name="TutorDrawerNavigator"
        component={TutorDrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
         <AuthStack.Screen
        name="ParentDrawerNavigator"
        component={ParentDrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </AuthStack.Navigator>
  );
}
