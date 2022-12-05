import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Button,
  Dimensions,
  ScrollView
} from "react-native";
import color from "../assets/themes/Color";
import AppButton from "../components/buttons/AppButton";
const { width } = Dimensions.get("window");
import { Snackbar } from "react-native-paper";
const OTPVerification = ({ navigation }) => {
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();
  const [otp1, setOtp1] = useState();
  const [otp2, setOtp2] = useState();
  const [otp3, setOtp3] = useState();
  const [otp4, setOtp4] = useState();
  const [otp5, setOtp5] = useState();
  const [otp6, setOtp6] = useState();
  const otpValue = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
  const registeredEmail = localStorage.getItem("registeredEmail");
  const mobile_number = `${registeredEmail}`;
  const sendOTP = () => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=p24ghdtaoc0j53ahbsg91pvks6");
    console.log("...............", registeredEmail, otpValue);
    var formdata = new FormData();
    formdata.append("otp_verification", "1");
    formdata.append("otp", otpValue);
    formdata.append("email", registeredEmail);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.success == 0) {
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
          console.log("False", res.message);
        } else {
          setMessageTrue(res.message);
          setSnackVisibleTrue(true);
          setTimeout(() => {
            navigation.navigate("Login");
          }, 1000);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Image
        style={styles.otp_img}
        source={require("../assets/images/otp.png")}
      />
      <Text style={styles.title}>OTP Verification</Text>
      <View style={styles.number_box}>
        <Text style={styles.content}>Enter the OTP send to </Text>
        <Text style={styles.fornumber}>{mobile_number}</Text>
      </View>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            autoFocus={true}
            ref={firstInput}
            onChangeText={(text) => {
              setOtp1(text);
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={(text) => {
              setOtp2(text);
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={(text) => {
              setOtp3(text);
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={(text) => {
              setOtp4(text);
              text ? fifthInput.current.focus() : thirdInput.current.focus();
            }}
          />
        </View>

        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fifthInput}
            onChangeText={(text) => {
              setOtp5(text);
              text ? sixthInput.current.focus() : fourthInput.current.focus();
            }}
          />
        </View>

        <View style={[styles.otpBox]}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={sixthInput}
            onChangeText={(text) => {
              setOtp6(text);
              text ? sixthInput.current.focus() : fifthInput.current.focus();
            }}
          />
        </View>
      </View>

      <View style={{ height: 10 }}></View>
     <View style={{paddingHorizontal:20}}>
      <AppButton title={"Sign Up"} onPress={sendOTP} btnColor={color.purple}/>
      </View>
      <View style={styles.btnsize}>
        <AppButton title={"Verify & Proceed"} />
      </View>
      <View style={{ height: 20 }}></View>
      <View style={styles.resend_box}>
        <Text style={styles.not_receive}>Didn't recieve the OTP?</Text>
        <TouchableOpacity onPress={() => navigation.replace("OTPVerification")}>
          <Text style={styles.resend}>Resend OTP</Text>

        </TouchableOpacity>
      </View>
          <Text onPress={()=>navigation.goBack()} style={[styles.resend,{alignSelf:'center'}]}>Change Email</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontFamily: "Montserrat-Bold",
    color: color.purple,
    alignSelf: "center",
  },
  content: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
  },
  fornumber: {
    color: "#000",
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
  },

  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  otpText: {
    fontSize: 25,
    padding: 0,
    color: "#000",
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: "Montserrat-SemiBold",
  },
  btnsize: {
    width: "90%",
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 2,
    alignSelf: "center",
  },
  resend_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  resend: {
    fontFamily: "Montserrat-SemiBold",
    color: color.purple,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  not_receive: {
    fontSize: 16,
    color: color.black,
    fontFamily: "Montserrat-Medium",
  },
  otp_img: {
    height: width - 150,
    alignSelf: "center",
    width: width - 150,
    resizeMode: "contain",
  },
  number_box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
});

export default OTPVerification;
