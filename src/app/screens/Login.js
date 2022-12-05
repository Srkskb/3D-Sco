import React, { useState } from "react";
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
import AppButton from "./../components/buttons/AppButton";
import { myHeadersData, useTogglePasswordVisibility } from "../api/helper";
import Input from "../components/inputs/Input";
const { height, width } = Dimensions.get("window");
import { Formik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Login({ navigation }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const newLocal_1 = "../assets/images/background/login_background.png";
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [isVisibleEntry, setIsVisibleEntry] = useState(true);
  const user_id = localStorage.getItem("userID");
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
    var role_data = user_id;
    const myHeaders = myHeadersData();
    var urlencoded = new FormData();
    urlencoded.append("login", "1");
    urlencoded.append("email", values.email);
    urlencoded.append("password", values.password);
    urlencoded.append("type", role_data);
    console.log(urlencoded);
    const result = await fetch(
      "https://3dsco.com/3discoapi/3dicowebservce.php",
      {
        method: "POST",
        body: urlencoded,
        headers: {
          myHeaders,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          localStorage.setItem("loginUID", res.data.id);
          localStorage.setItem("userFName", res.data.name);
          localStorage.setItem("userMobile", res.data.contact);
          localStorage.setItem("userEmail", res.data.email);
          localStorage.setItem("userGender", res.data.gender);
          localStorage.setItem("userCategory", res.data.category);
          navigation.navigate("DrawerNavigator");
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar backgroundColor="#82027D" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            style={{ flex: 1 }}
          >
            <ImageBackground
              style={{ height: "100%" }}
              source={require(newLocal_1)}
            >
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
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={Yup.object().shape({
                      password: Yup.string()
                        .required("Password is required")
                        .min(5, "Your password is too short.")
                        .matches(
                          /[a-zA-Z]/,
                          "Password can only contain Latin letters."
                        ),
                    })}
                    onSubmit={(values) => loginUser(values)}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      isValid,
                    }) => (
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
                            <TouchableOpacity
                              style={styles.icon}
                              onPress={() => setIsVisibleEntry(!isVisibleEntry)}
                            >
                              <MaterialCommunityIcons
                                name={
                                  isVisibleEntry === false
                                    ? "eye-outline"
                                    : "eye-off-outline"
                                }
                                size={24}
                                color={
                                  isVisibleEntry === false
                                    ? color.dark_gray
                                    : color.purple
                                }
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
                              // onPress={()=>navigation.navigate("DrawerNavigator")}
                              disabled={!isValid}
                              btnColor={!isValid ? "#6c757d" : color.purple}
                            />
                          </View>
                        </View>

                        <TouchableOpacity
                          onPress={() => navigation.navigate("ForgetPassword")}
                        >
                          <Text style={styles.forget}>Forget Password</Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            marginTop: 15,
                          }}
                        >
                          <Text style={styles.account}>
                            Don't have an account?{" "}
                          </Text>
                          <TouchableOpacity
                            title="RegistrationForAll"
                            onPress={handleSignup}
                          >
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
                          <TouchableOpacity
                            title="RegistrationForAll"
                            onPress={() => navigation.goBack()}
                          >
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
