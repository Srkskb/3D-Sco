import React, { useState,useEffect } from "react";
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
  Alert
} from "react-native";
import color from "../../assets/themes/Color";
import HomeHeader from "../../components/header/HomeHeader";
const banner = require("../../assets/images/banner_home.png");
import { SafeAreaView } from "react-native-safe-area-context";
import { JoinedCourse } from "./account";
const { height, width } = Dimensions.get("window");
export default function Home({ navigation }) {
  const homeBackPress = () => {
    if (navigation.isFocused()) {
      Alert.alert(
        "3DSCO",
        "Do you want to exit 3dsco?",
        [
          {
            text: "No",
            onPress: () => console.log("No"),
            style: "cancel",
          },
          { text: "Yes", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    } else if (!navigation.isFocused()) {
      // navigation.goBack();
      return false;
    }
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", homeBackPress);
    return () =>
    BackHandler.removeEventListener("hardwareBackPress", homeBackPress);
}, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader navigation={navigation} />
      <StatusBar backgroundColor={color.purple} />
      <Image style={styles.banner} source={banner} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.slider_container}>{/* <ImageSlide /> */}</View>
        <JoinedCourse />
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
