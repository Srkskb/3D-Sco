import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Splash } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
const newLocal_1 = "../assets/images/background/Background.png";
import AsyncStorage from "@react-native-community/async-storage";
const { height, width } = Dimensions.get("window");
import AppButton from "../components/buttons/AppButton";
import color from "../assets/themes/Color";
import User from "../components/dropdown/User";
import "localstorage-polyfill";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
};

export default function UserType({ navigation }) {
  const [userID, setUserID] = useState();
  const [isDisabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleApi = () => {
    setDisabled(true);
    localStorage.setItem("userID", userID);
    navigation.navigate("Login");
  };
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("userType")
      .then((res) => JSON.parse(res))
      .then((data) => {
        setLoading(false);
        if (data == null) {
        } else {
          // localStorage.setItem("loginUID", JSON.parse(data).id);
          if (data == "student") {
            navigation.replace("DrawerNavigator");
            localStorage.setItem("userID", 1);
          }
          if (data == "tutor") {
            navigation.replace("TutorDrawerNavigator");
            localStorage.setItem("userID", 2);
          }
          if (data == "parent") {
            navigation.replace("ParentDrawerNavigator");
            localStorage.setItem("userID", 3);
          }
          console.log("enter");
          if (data == "admin") {
            navigation.replace("AdminDrawerNavigator");
            localStorage.setItem("userID", 4);
          }
          if (data == "affiliate") {
            navigation.replace("AffiliateDrawerNavigator");
            localStorage.setItem("userID", 5);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#82027D" />
      <ImageBackground style={{ height: height }} source={require(newLocal_1)}>
        {loading ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#ffffffcc",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : null}
        <View style={{ flex: 1 }}>
          <View>
            <View style={{ height: height / 2.2, width: width }}>
              <Splash />
            </View>
          </View>
          <View style={styles.inputfields}>
            <View style={{ padding: hp(4), marginTop: 20 }}>
              <Text style={styles.signup_text}>SIGN UP/LOGIN AS</Text>
              <User
                onSelect={(selectedItem, index) => {
                  setUserID(index);
                  // storeData('userType',JSON.stringify(index))
                  console.log(selectedItem, index);
                }}
              />
              <View style={styles.button_container}>
                <AppButton
                  title={"Continue    "}
                  onPress={handleApi}
                  btnColor={!userID ? "#6c757d" : color.purple}
                  disabled={!userID}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  signup_text: {
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
  },
  container: {
    flex: 1,
  },
  button_container: {
    marginTop: 30,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    textTransform: "capitalize",
    fontFamily: "Montserrat-Bold",
  },
});
