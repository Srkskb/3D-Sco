import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Splash } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
const newLocal_1 = "../assets/images/background/Background.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get("window");
import AppButton from "../components/buttons/AppButton";
import color from "../assets/themes/Color";
import User from "../components/dropdown/User";
import "localstorage-polyfill";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value); 
  } catch (error) {
  }
};
export default function UserType({ navigation }) {
  const [userID, setUserID] = useState();
  const [isDisabled, setDisabled] = useState(false);
  const handleApi = () => {
    setDisabled(true);
    localStorage.setItem("userID", userID);
    navigation.navigate("Login");
  };
  useEffect(() => {
    AsyncStorage.getItem('userType')
    .then(data => {
      console.log(JSON.parse(data).type)
      if(data==null){
      }else{
        if (JSON.parse(data).type == "student") {
          navigation.navigate("DrawerNavigator");
        }
        if(JSON.parse(data).type=='tutor'){
          navigation.navigate("TutorDrawerNavigator");
        }
        if (JSON.parse(data).type == "parent") {
          navigation.navigate("ParentDrawerNavigator");
        }
        if (JSON.parse(data).type == "admin") {
          navigation.navigate("AdminDrawerNavigator");
        }
        if (JSON.parse(data).type == "affiliate") {
          navigation.navigate("AffiliateDrawerNavigator");
        }
      }
    })
    
  }, [])
  

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#82027D" />
      <ImageBackground style={{ height: height }} source={require(newLocal_1)}>
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
    fontFamily: "Montserrat-Bold" 
  },
});
