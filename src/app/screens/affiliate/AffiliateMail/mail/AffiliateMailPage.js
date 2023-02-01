import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import HeaderBack from "../../../../components/header/Header";
import color from "../../../../assets/themes/Color";
import HeaderText from "../../../../components/HeaderText";
import TextWithButton from "../../../../components/TextWithButton";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Inbox, Spam, Archive, Sent } from "./";
const Tab = createMaterialTopTabNavigator();
export default function AffiliateMailPage({ navigation }) {
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = React.useState(false);
  return (
    <View style={styles.container}>
      <HeaderBack title={"Mail"} onPress={() => navigation.goBack()} />
      <View style={styles.main_box}>
        <View style={{ padding: 15 }}>
          <TextWithButton
            title={"Mails"}
            label={"Compose Mail"}
            onPress={() => navigation.navigate("ComposeMail")}
          />
        </View>

        <TopBar />
      </View>
    </View>
  );
}

function TopBar() {
  return (
    <Tab.Navigator
      initialRouteName="Inbox"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: color.purple, height: 2 },
        // tabBarActiveTintColor: color.white,
        tabBarInactiveTintColor: color.purple,
        tabBarPressColor: "transparent",
        tabBarStyle: {
          elevation: 2,
          backgroundColor: color.white,
        },

        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: "capitalize",
          fontFamily: "Montserrat-SemiBold",
        },
      }}
    >
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarLabel: "Inbox",
          paddingHorizontal: 10,
        }}
      />
      <Tab.Screen
        name="Sent"
        component={Sent}
        options={{ tabBarLabel: "Sent" }}
      />
      <Tab.Screen
        name="Spam"
        component={Spam}
        options={{ tabBarLabel: "Spam" }}
      />
      <Tab.Screen
        name="Archive"
        component={Archive}
        options={{ tabBarLabel: "Archive" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main_box: {
    flex: 1,
  },
  subhead_text: {
    fontSize: 14,
    color: color.black,
    textTransform: "uppercase",
    marginBottom: 30,
    fontFamily: "Montserrat-Bold",
  },
  book_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
