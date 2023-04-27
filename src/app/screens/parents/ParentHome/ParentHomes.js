import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  // SafeAreaView,
  Dimensions,
  BackHandler,
  Alert,
} from "react-native";
import color from "../../../assets/themes/Color";
import HomeHeader from "../../../components/header/HomeHeader";
const banner = require("../../../assets/images/banner_home.png");
import { SafeAreaView } from "react-native-safe-area-context";
// import { ParentJoin } from "../../students/account";
const { height, width } = Dimensions.get("window");

export default function ParentHomes({ navigation, backActionHandler }) {
  // const backActionHandler = () => {
  //   Alert.alert("Alert!", "Are you sure you want to go back?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel",
  //     },
  //     { text: "YES", onPress: () => BackHandler.exitApp()() },
  //   ]);
  //   return true;
  // };

  // useEffect(() => {
  //   // Add event listener for hardware back button press on Android
  //   BackHandler.addEventListener("hardwareBackPress", backActionHandler);

  //   return () =>
  //     // clear/remove event listener
  //     BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  // }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader navigation={navigation} mailPress={() => navigation.navigate("ParentMail")} />
      <StatusBar backgroundColor={color.purple} />
      <Image style={styles.banner} source={banner} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.slider_container}>{/* <ImageSlide /> */}</View>
        {/* <ParentJoin /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  banner: {
    height: height / 7.5,
    width: width,
  },

  button_container: {
    marginVertical: 20,
  },
});
