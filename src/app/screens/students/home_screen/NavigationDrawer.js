import { View, Text, DrawerLayoutAndroid, StyleSheet, TouchableOpacity, Image, Linking } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import color from "../../../assets/themes/Color";
import { List } from "react-native-paper";
import HomeScreen from "./HomeScreen";
import { useNavigation } from "@react-navigation/native";
import Profile from "./../../../assets/images/demo.png";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-community/async-storage";
export default function NavigationDrawer({ backPress }) {
  const drawer = useRef(null);
  const Drawer = createDrawerNavigator();
  const userId = localStorage.getItem("userID");
  const userFName = localStorage.getItem("userFName");
  const userRole = localStorage.getItem("userRole");
  console.log("0000", userFName);
  const navigation = useNavigation();
  const [drawerPosition, setDrawerPosition] = useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };
  const toggleDrawer = () => {
    drawer.current.openDrawer();
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem("loginUID");
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("userType");

    navigation.replace("UserType");
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <View style={styles.profileSec}>
        <View style={styles.profileData}>
          <Image style={styles.avatar} source={Profile} />
          <View style={styles.detailCon}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.logedName}>{userFName}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Montserrat-Regular",
                  fontSize: 14,
                  color: color.white,
                }}
              >
                {userId == 1 ? "Student" : null}
                {userId == 2 ? "Teacher" : null}
                {userId == 3 ? "Parent" : null}
                {userId == 4 ? "Admin" : null}
                {userId == 5 ? "Staff" : null}
              </Text>
              <Text style={styles.logedAs}></Text>
            </View>
          </View>
        </View>
      </View>

      <List.Item
        title="View Profile"
        left={(props) => <List.Icon {...props} icon="human-greeting-variant" color={color.purple} />}
        onPress={() => navigation.navigate("ViewProfile")}
      />
      <List.Item
        title="Change Password"
        left={(props) => <List.Icon {...props} icon="lock" color={color.purple} />}
        onPress={() => navigation.navigate("ChangePassword")}
      />
      <List.Item
        title="About Us"
        left={(props) => <List.Icon {...props} icon="information" color={color.purple} />}
        onPress={() => navigation.navigate("AboutUs")}
      />
      <List.Item
        title="Technical Support"
        left={(props) => <List.Icon {...props} icon="map-marker-question" color={color.purple} />}
        onPress={() => navigation.navigate("TechnicalSupport")}
      />
      <List.Item
        title="Terms & Conditions"
        left={(props) => <List.Icon {...props} icon="note-text" color={color.purple} />}
        onPress={() => navigation.navigate("TermsCondition")}
      />
      <List.Item
        title="Contact Us"
        left={(props) => <List.Icon {...props} icon="email" color={color.purple} />}
        onPress={() => navigation.navigate("ContactUs")}
      />
      <List.Item
        title="Log Out"
        left={(props) => <List.Icon {...props} icon="logout" color={color.purple} />}
        onPress={() => handleLogout()}
      />
      <View style={styles.icon_container}>
        <TouchableOpacity onPress={() => Linking.openURL(`http://www.facebook.com`)}>
          <Image style={styles.social_icon} source={require("../../../assets/images/social_icons/facebook.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`http://www.instagram.com`)}>
          <Image style={styles.social_icon} source={require("../../../assets/images/social_icons/instagram.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`http://www.twitter.com`)}>
          <Image style={styles.social_icon} source={require("../../../assets/images/social_icons/twitter.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`http://www.youtube.com`)}>
          <Image style={styles.social_icon} source={require("../../../assets/images/social_icons/youtube.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
      >
        <View style={styles.header}>
          <View style={styles.head_container}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <TouchableOpacity onPress={() => toggleDrawer()}>
                <Image style={styles.menu_button} source={require("../../../assets/images/menu.png")} />
              </TouchableOpacity>
              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity onPress={backPress}>
                  <Image style={styles.back_arrow} source={require("../../../assets/images/back.png")} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Mail")}>
              <View>
                <Image style={styles.head_img2} source={require("./../../../assets/images/message.png")} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerLayoutAndroid>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    zIndex: 1,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    zIndex: 1,
  },
  menuButton: {
    backgroundColor: "transparent",
    color: "#000",
    fontSize: 18,
  },

  header: {
    backgroundColor: color.white,
    height: 50,
    justifyContent: "center",
  },
  head_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileSec: {
    backgroundColor: color.purple,
    height: 160,
    justifyContent: "center",
  },
  head_img: {
    height: 23,
    width: 30,
    marginHorizontal: 10,
    marginTop: 10,
  },
  avatar: {
    border: 5,
    borderColor: color.white,
    width: 90,
    height: 90,
    borderRadius: 50,
  },

  handle: {
    marginRight: 3,
    lineHeight: 12,
  },
  content: {
    marginTop: 25,
    fontSize: 20,
    lineHeight: 30,
  },
  image: {
    borderWidth: 70,
    marginTop: 25,
    borderRadius: 20,
    width: "100%",
    height: 280,
  },
  head_img2: {
    height: 27,
    width: 33,
    marginHorizontal: 10,
    marginTop: 2,
  },
  profileData: {
    flexDirection: "row",
    marginTop: 20,
    padding: 20,
  },
  detailCon: {
    marginLeft: 10,
  },
  welcome: {
    color: "#efefef",
    // marginBottom: 5,
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Montserrat-Regular",
    textTransform: "uppercase",
  },
  logedName: {
    color: "#fff",
    marginBottom: 5,
    fontSize: 22,
    textTransform: "capitalize",
    fontFamily: "Montserrat-Bold",
  },
  logedAs: {
    color: "#fff",
    // marginBottom: 10,
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
  },
  menu_button: {
    height: 35,
    width: 35,
    marginLeft: 10,
    marginTop: 0,
  },
  social_icon: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  icon_container: {
    flexDirection: "row",
    justifyContent: "center",
    height: "10%",
    alignItems: "flex-end",
  },
  back_arrow: {
    height: 25,
    width: 25,
  },
});
