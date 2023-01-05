import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Linking,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar, Button, Icon } from "react-native-elements";
import color from "../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HomeHeader from "../components/header/HomeHeader";
import { myHeadersData } from "./../api/helper";
import Detail from "../components/view/Detail";
import Headline from "../components/Headline";

export default function DrawerContent(props) {
    const navigation = useNavigation();
    const loginUID = localStorage.getItem("loginUID"); // ! loged user type
  const userId = localStorage.getItem("userID");
  const userFName = localStorage.getItem("userFName");
  const userRole = localStorage.getItem("userRole");
  const [getName, setUpName] = useState();
  const showUserDetails = () => {
    // console.log('loginUID',loginUID);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?profile=1&student_id=${loginUID}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setUpName(res.Profile_Detail.name);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    showUserDetails();
  }, []);
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawer}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              //   avatarStyle={styles.avatar}
              source={require("../assets/images/demo.png")}
              size={80}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.user_name}>{getName}</Text>
            <Text style={styles.login}>
              Log In As{" "}
              <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
                {" "}
                {userId == 1 ? "Student" : null}
                {userId == 2 ? "Teacher" : null}
                {userId == 3 ? "Parent" : null}
                {userId == 4 ? "Admin" : null}
                {userId == 5 ? "Staff" : null}
              </Text>
            </Text>
          </View>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
        label={"Log Out"}
        onPress={() => navigation.navigate("Login")}
        labelStyle={{fontFamily: "Montserrat-SemiBold"}}
        icon={({color,size})=>(
            <Icon
            type="material-community"
            name="logout"
            color="#82027D"
            size={24}
            style={styles.icons}
            />
        )}/>
      </DrawerContentScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  drawer: {
    flexDirection: "row",
    paddingVertical: 20,
    backgroundColor: color.purple,
    marginTop: -5,
  },
  welcome: {
    color: color.white,
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Montserrat-Regular",
    textTransform: "uppercase",
  },
  user_name: {
    color: color.white,
    fontSize: 20,
    textTransform: "capitalize",
    fontFamily: "Montserrat-SemiBold",
    marginVertical: 1,
  },
  login: {
    color: color.white,
    fontSize: 14,
    textTransform: "capitalize",
    fontFamily: "Montserrat-Regular",
  },
  avatar: {
    marginHorizontal: 10,
  },
  icons: {
    width: 30,
  },
});
