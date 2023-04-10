import * as React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import color from "../assets/themes/Color";
import { Icon } from "react-native-elements";
import ClientTabs from "./ClientTabs";
import {
  ChangePassword,
  ContactUs,
  AboutUs,
  TechnicalSupport,
  TermsCondition,
  ViewProfile,
  UpdateProfile
} from "../screens/common/hamburgerMenu";
import DrawerContent from "../components/DrawerContent";
const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="ClientTabs"
        component={ClientTabs}
        options={{
          title: "Home",
          drawerLabelStyle: { fontFamily: "Montserrat-SemiBold" },
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="font-awesome"
              name="home"
              color={focussed ? color.gray : color.purple}
              size={25}
              style={styles.icons}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{
          title: "View Profile",
          drawerLabelStyle: { fontFamily: "Montserrat-SemiBold" },
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="font-awesome"
              name="user"
              color={focussed ? color.gray : color.purple}
              size={25}
              style={styles.icons}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          title: "Update Profile",
          drawerLabelStyle: { fontFamily: "Montserrat-SemiBold" },
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="font-awesome"
              name="user"
              color={focussed ? color.gray : color.purple}
              size={25}
              style={styles.icons}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: "Change Password",
          drawerLabelStyle: { fontFamily: "Montserrat-SemiBold" },
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="font-awesome"
              name="lock"
              color={focussed ? color.gray : color.purple}
              size={25}
              style={styles.icons}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="TechnicalSupport"
        component={TechnicalSupport}
        options={{
          title: "Technical Support",
          drawerLabelStyle: { fontFamily: "Montserrat-SemiBold" },
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="material"
              name="support-agent"
              color={focussed ? color.gray : color.purple}
              size={25}
              style={styles.icons}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{
          title: "Terms & Conditions",
          drawerLabelStyle: { fontFamily: "Montserrat-SemiBold" },
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="foundation"
              name="clipboard-notes"
              color={focussed ? color.gray : color.purple}
              size={25}
              style={styles.icons}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          title: "Contact Us",
          drawerLabelStyle: { fontFamily: "Montserrat-SemiBold" },
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="material-community"
              name="phone"
              color={focussed ? color.gray : color.purple}
              size={25}
              style={styles.icons}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: "About Us",
          drawerLabelStyle: { fontFamily: "Montserrat-SemiBold" },
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="material-community"
              name="information"
              color={focussed ? color.gray : color.purple}
              size={25}
              style={styles.icons}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  icons: {
    width: 30,
  },
});
