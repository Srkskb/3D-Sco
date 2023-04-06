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
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import AppButton from "./../components/buttons/AppButton";
import { Snackbar } from "react-native-paper";
import { Splash } from "../components";
const { height, width } = Dimensions.get("window");
import { myHeadersData } from "../api/helper";
 import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/inputs/Input";
export default function ForgetPassword({ navigation }) {
  const [mailAlert, setMailAlert] = useState(false);
  const [email, setEmail] = useState();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [loading, setloading]=useState(false)
  const newLocal_1 = "../assets/images/background/Background.png";
  const user_id = localStorage.getItem("userID");
  const loginUser = (values) => {
    setloading(true);
    setEmail(values.email);
    var role_data = user_id;
    const myHeaders = myHeadersData();
    var urlencoded = new FormData();
    urlencoded.append("Forgot_password", "1");
    urlencoded.append("email", values.email);
    console.log(urlencoded);
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
          setloading(false)
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          setMailAlert(true);
        } else {
          setloading(false)
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      })
      .catch((error) => {
        alert("Invalid credential ");
        console.error(error);
      });
  };
  return (
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
          <Modal
            visible={mailAlert}
            transparent
            animationType="slide"
            onRequestClose={() => setMailAlert(false)}
          >
            <View style={styles.center_view}>
              <View style={styles.modalpop}>
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      // fontWeight: 'bold',
                      fontSize: 25,
                      marginTop: 20,
                      color: "#000",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Check Your Email
                  </Text>
                  <Text style={styles.poptext}>
                    We sent an email to {"\n"}
                    <Text style={styles.mailD}>{email}</Text>. {"\n"}Tap the
                    link in that email to reset your password .
                  </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.replace("Login")}>
                  <View style={styles.okbtn}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#82027D",
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      Ok
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <ImageBackground
            style={{ height: height }}
            source={require(newLocal_1)}
          >
            <View style={{ flex: 1 }}>
              <View>
                <View style={{ height: height / 2.2, width: width }}>
                  <Splash />
                </View>
              </View>
              <Snackbar
                visible={snackVisibleTrue}
                onDismiss={() => setSnackVisibleTrue(false)}
                action={{ label: "Close" }}
                theme={{ colors: { accent: "#82027D" } }}
                style={{zIndex:1}}
              >
                {getMessageTrue}
              </Snackbar>
              <Snackbar
                visible={snackVisibleFalse}
                onDismiss={() => setSnackVisibleFalse(false)}
                action={{ label: "Close" }}
                theme={{ colors: { accent: "red" } }}
                style={{zIndex:1}}
              >
                {getMessageFalse}
              </Snackbar>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Enter a valid email")
                    .required("Email is required"),
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
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.inputfields}>
                      <Input
                        label={"Username"}
                        placeholder={"Username"}
                        name="email"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        keyboardType="default"
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

                      <View style={styles.loginbtn}>
                        <AppButton
                          title={"Forget Password"}
                          onPress={handleSubmit}
                          disabled={!isValid}
                          loading={loading}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "center",
                          marginTop: 15,
                        }}
                      >
                       
                        <TouchableOpacity
                          title="Back"
                          onPress={()=>navigation.goBack()}
                        >
                          <Text style={styles.signup}>Login</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                )}
              </Formik>
            </View>
          </ImageBackground>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: height,
  },
  inputfields: {
    padding: 20,
  },
  mailD: {
    fontWeight: "bold",
    color: "#82027D",
    fontFamily: "Montserrat-ExtraBold",
    fontSize: 16,
  },

  loginbtn: {
    borderRadius: 6,
    backgroundColor: "#82027D",
    justifyContent: "center",
    marginVertical: 25,
  },

  forget: {
    alignSelf: "center",
    fontSize: 15,
  },

  modalpop: {
    width: "75%",
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    marginHorizontal: 20,
  },
  center_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  poptext: {
    fontSize: 14,
    textAlign: "center",
    color: "#000",
    marginHorizontal: 20,
    padding: 20,
    fontFamily: "Montserrat-Regular",
  },
  okbtn: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "gray",
    borderTopWidth: 1,
  },
  signup: {
    fontSize: 15,
    color: "#82027D",
    textDecorationLine: "underline",
    fontFamily: "Montserrat-Bold",
  },
});
