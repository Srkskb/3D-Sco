import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import { Snackbar } from "react-native-paper";
import color from "../assets/themes/Color";
import { Splash } from "./../components";
import AsyncStorage from "@react-native-community/async-storage";
import AppButton from "./../components/buttons/AppButton";
import { myHeadersData, useTogglePasswordVisibility } from "../api/helper";
import Input from "../components/inputs/Input";
const { height, width } = Dimensions.get("window");
import { Formik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import * as Yup from "yup";
import * as qs from "qs";
import { SafeAreaView } from "react-native-safe-area-context";
import { clockRunning } from "react-native-reanimated";
import { resetStack } from "../utils/ResetStack";
// import { showMessage, hideMessage } from "react-native-flash-message";
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
};
export default function Login({ navigation }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const newLocal_1 = "../assets/images/background/login_background.png";
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [isVisibleEntry, setIsVisibleEntry] = useState(true);
  const [loading, setloading] = useState(false);
  const user_id = localStorage.getItem("userID");
  const obj = {
    email: "",
    password: "",
  };

  const [initialObj, setInitialObj] = useState(obj);
  useEffect(() => {
    return () => {
      setInitialObj(obj);
    };
  }, []);
  const handleSignup = () => {
    if (user_id == 1) {
      navigation.navigate("RegistrationForAll");
    } else if (user_id == 2) {
      navigation.navigate("Signup_Educator");
    } else if (user_id == 3) {
      navigation.navigate("Signup_Parent");
    } else if (user_id == 4) {
      navigation.navigate("Signup_Admin");
    } else if (user_id == 5) {
      navigation.navigate("Signup_Affiliate");
    } else {
      alert("Invalid Selection");
    }
  };
  const loginUser = async (values) => {
    setloading(true);
    var role_data = user_id;

    var adminFormData = new FormData();
    adminFormData.append("login", "1");
    adminFormData.append("email", values.email);
    adminFormData.append("password", values.password);
    adminFormData.append("type", role_data);
    adminFormData.append("username", values.email);

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: adminFormData,
    };
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.success == 0) {
          //add alert here
          console.log(response);
          setloading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(response?.message);
        } else {
          setloading(false);
          localStorage.setItem("loginUID", response.data.id);
          localStorage.setItem("loginData", JSON.stringify(response.data));
          storeData("userType", response.data.type);
          storeData("userData", response.data);
          if (response.data.type == "student") {
            resetStack(navigation, "DrawerNavigator");
          }
          if (response.data.type == "tutor") {
            resetStack(navigation, "TutorDrawerNavigator");
          }
          if (response.data.type == "parent") {
            resetStack(navigation, "ParentDrawerNavigator");
          }
          if (response.data.type == "admin") {
            resetStack(navigation, "AdminDrawerNavigator");
          }
          if (response.data.type == "affiliate") {
            resetStack(navigation, "AffiliateDrawerNavigator");
          }
          setInitialObj(obj);
        }
      })
      .catch((error) => {
        setloading(false);
        setSnackVisibleFalse(true);
        setMessageFalse(error.response?.data?.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <StatusBar backgroundColor="#82027D" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true} style={{ flex: 1 }}>
            <ImageBackground style={{ height: "100%" }} source={require(newLocal_1)}>
              <View style={{ flex: 1 }}>
                <View style={{ height: height / 2.2, width: width }}>
                  <Splash />
                </View>

                <Snackbar
                  visible={snackVisibleTrue}
                  onDismiss={() => setSnackVisibleTrue(false)}
                  action={{ label: "Close" }}
                  theme={{ colors: { accent: "#82027D" } }}
                >
                  {getMessageTrue}
                </Snackbar>
                <Snackbar
                  visible={snackVisibleFalse}
                  onDismiss={() => setSnackVisibleFalse(false)}
                  action={{ label: "Close" }}
                  theme={{ colors: { accent: "red" } }}
                >
                  {getMessageFalse}
                </Snackbar>
                <View style={styles.inputfields}>
                  <Formik
                    initialValues={initialObj}
                    validationSchema={Yup.object().shape({
                      password: Yup.string().required("Password is required").min(5, "Your password is too short."),
                      // .matches(
                      //   /[a-zA-Z]/,
                      //   "Password can only contain Latin letters."
                      // ),
                    })}
                    onSubmit={(values) => loginUser(values)}
                  >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                      // <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
                      <View>
                        <View>
                          <Input
                            label={"Username"}
                            placeholder={"Username"}
                            name="email"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            keyboardType="email-address"
                          />
                          {errors.email && (
                            <Text
                              style={{
                                fontSize: 14,
                                color: "red",
                                marginBottom: 10,
                              }}
                            >
                              {errors.email}
                            </Text>
                          )}
                          <View>
                            <TouchableOpacity style={styles.icon} onPress={() => setIsVisibleEntry(!isVisibleEntry)}>
                              <MaterialCommunityIcons
                                name={isVisibleEntry === false ? "eye-outline" : "eye-off-outline"}
                                size={24}
                                color={isVisibleEntry === false ? color.dark_gray : color.purple}
                              />
                            </TouchableOpacity>
                            <Input
                              label={"Password"}
                              placeholder={"Password"}
                              name="password"
                              onChangeText={handleChange("password")}
                              onBlur={handleBlur("password")}
                              value={values.password}
                              keyboardType="default"
                              autoCapitalize="none"
                              secureTextEntry={isVisibleEntry}
                            />
                          </View>
                          {errors.password && (
                            <Text
                              style={{
                                fontSize: 14,
                                color: "red",
                                marginBottom: 10,
                              }}
                            >
                              {errors.password}
                            </Text>
                          )}

                          <View style={{ marginTop: 20, marginBottom: 10 }}>
                            <AppButton
                              title={"Login"}
                              onPress={handleSubmit}
                              loading={loading}
                              // onPress={()=>navigation.navigate("AdminDrawerNavigator")}
                              disabled={!isValid}
                              btnColor={!isValid ? "#6c757d" : color.purple}
                            />
                          </View>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
                          <Text style={styles.forget}>Forget Password</Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            marginTop: 15,
                          }}
                        >
                          <Text style={styles.account}>Don't have an account? </Text>
                          <TouchableOpacity title="RegistrationForAll" onPress={handleSignup}>
                            <Text style={styles.signup}>Sign Up</Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            marginTop: 15,
                          }}
                        >
                          <Text style={styles.account}>Change User Type </Text>
                          <TouchableOpacity title="RegistrationForAll" onPress={() => navigation.navigate("UserType")}>
                            <Text style={styles.signup}>Change</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </Formik>
                </View>
              </View>
            </ImageBackground>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputfields: {
    padding: 30,
    flex: 2,
  },
  forget: {
    alignSelf: "center",
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    color: color.dark_gray,
  },
  account: {
    fontSize: 14,
    color: "#79787E",
    fontFamily: "Montserrat-Regular",
  },
  signup: {
    fontSize: 15,
    color: "#82027D",
    textDecorationLine: "underline",
    fontFamily: "Montserrat-Bold",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: "43%",
    zIndex: 1,
  },
});
