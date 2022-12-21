import React, { useState } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  // SafeAreaView,
  Dimensions,
} from "react-native";
import color from "../../../assets/themes/Color";
import HomeHeader from "../../../components/header/HomeHeader";
const banner = require("../../../assets/images/banner_home.png");
import { SafeAreaView } from "react-native-safe-area-context";
// import { EducatorJoin } from "../../students/account";
const { height, width } = Dimensions.get("window");
export default function EducatorHomes({ navigation }) {
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
        {/* <EducatorJoin /> */}
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
