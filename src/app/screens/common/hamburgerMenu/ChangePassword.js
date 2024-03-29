import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import SmallButton from "../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import AppButton from "../../../components/buttons/AppButton";
import { Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import HomeHeader from "../../../components/header/HomeHeader";
import Input2 from "../../../components/inputs/Input2";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ChangePassword() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [loading, setLoading] = useState(false);
  const [isVisibleEntry, setIsVisibleEntry] = useState(true);
  const [isVisibleEntry2, setIsVisibleEntry2] = useState(true);
  // Keys
  const changePasswordUID = async (values) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setLoading(true);
    const myHeaders = myHeadersData();
    var urlencoded = new FormData();
    urlencoded.append("Reset_password", "1");
    urlencoded.append("user_id", myData.id);
    urlencoded.append("email", myData.email);
    urlencoded.append("password", values.password);
    console.log("urlencoded", urlencoded);

    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: {
        myHeaders,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setLoading(false);
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("Home");
        } else {
          setLoading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      })
      .catch((error) => {
        alert("Invalid credential ");
        console.error(error);
      });
  };
  var defaultValue = new Date().toDateString;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      {/* <HeaderBack
        title={"Change Password"}
        onPress={() => navigation.navigate("HomeScreen")}
      /> */}
      <HomeHeader navigation={navigation} title={"Change Password"} />
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
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Formik
              initialValues={{
                // email: "",
                password: "",
                confirmpassword: "",
              }}
              validationSchema={Yup.object().shape({
                // email: Yup.string().email("Enter a valid email").required("Email is required"),
                password: Yup.string()
                  .required("Password is required")
                  .min(5, "Your password is too short.")
                  .matches(/[1-2-3]/, "Password can only contain Latin letters."),
                confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
              })}
              onSubmit={(values) => changePasswordUID(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                <View>
                  {/* <Input2
                    label={"Your Email ID"}
                    placeholder={"Your Email ID"}
                    name="email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="text"
                  />
                  {errors.email && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.email}</Text>} */}
                  <View>
                    <TouchableOpacity style={styles.icon} onPress={() => setIsVisibleEntry((prev) => !prev)}>
                      <MaterialCommunityIcons
                        name={isVisibleEntry === false ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color={isVisibleEntry === false ? color.dark_gray : color.purple}
                      />
                    </TouchableOpacity>
                    <Input2
                      label={"New Password"}
                      placeholder={"New Password"}
                      name="password"
                      secureTextEntry={isVisibleEntry}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      keyboardType="text"
                    />
                  </View>
                  {errors.password && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.password}</Text>
                  )}
                  <View>
                    <TouchableOpacity style={styles.icon} onPress={() => setIsVisibleEntry2((prev) => !prev)}>
                      <MaterialCommunityIcons
                        name={isVisibleEntry2 === false ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color={isVisibleEntry2 === false ? color.dark_gray : color.purple}
                      />
                    </TouchableOpacity>
                    <Input2
                      label={"Confirm Password"}
                      placeholder={"Confirm Password"}
                      name="confirmpassword"
                      secureTextEntry={isVisibleEntry2}
                      onChangeText={handleChange("confirmpassword")}
                      onBlur={handleBlur("confirmpassword")}
                      value={values.confirmpassword}
                      keyboardType="text"
                    />
                  </View>
                  {errors.confirmpassword && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.confirmpassword}</Text>
                  )}

                  <View style={styles.button}>
                    <SmallButton title={"Cancel"} color={color.purple} fontFamily={"Montserrat-Medium"} />
                    <SmallButton
                      onPress={handleSubmit}
                      title="Save"
                      disabled={!isValid}
                      color={color.white}
                      backgroundColor={color.purple}
                      fontFamily={"Montserrat-Bold"}
                      loading={loading}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  icon: {
    position: "absolute",
    right: 15,
    top: "45%",
    zIndex: 1,
  },
  main: {
    flex: 1,
    padding: 20,
  },
  headline: {
    fontFamily: "Montserrat-Regular",
    color: "#081F32",
    marginBottom: 20,
    fontSize: 13,
  },
  datalines: {
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
    color: color.black,
    textAlign: "justify",
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    paddingBottom: 20,
    marginBottom: 20,
  },
  description: {
    fontFamily: "Montserrat-Medium",
    fontSize: 13,
    textAlign: "justify",
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
  },
});
