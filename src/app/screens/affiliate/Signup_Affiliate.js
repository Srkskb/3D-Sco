import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import BackButton from "../../components/buttons/BackButton";
import color from "../../assets/themes/Color";
import Input from "../../components/inputs/Input";
import Input2 from "../../components/inputs/Input2";
// import CheckBoxC from "../../components/CheckBoxC";
import AppButton from "../../components/buttons/AppButton";
import Condition from "../../components/Conditions";
import Headline from "../../components/Headline";
import Checkbox from "expo-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { myHeadersData } from "../../api/helper";
import { GenderDropdown } from "../../components/dropdown";
import CountryDropdown from "../../components/dropdown/CountryDropdown";

import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import { Formik } from "formik";
import StateDropdown from "../../components/dropdown/StateDropdown";
import CityDropdown from "../../components/dropdown/CityDropdown";
import CategoryDropdown from "../../components/dropdown/CategoryDropdown";

const { height, width } = Dimensions.get("window");
export default function Signup_Affiliate({ navigation }) {
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  //   personal information states
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  // focus related
  const [countryFocus, setCountryFocus] = useState(false);
  const [stateFocus, setStateFocus] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);
  // array for data
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [gender, setGender] = useState();
  const [category, setCategory] = useState();
  const [isChecked, setChecked] = useState(false);
  // const [comment, setComment] = useState("");

  const [isVisibleEntry, setIsVisibleEntry] = useState(true);
  const [isConfirmEntry, setIsConfirmEntry] = useState(true);
  const country_id = localStorage.getItem("countryId");
  const user_id = localStorage.getItem("userID"); // ! loged user type
  const state_id = localStorage.getItem("stateID");
  const city_id = localStorage.getItem("city_id");
  const catID = localStorage.getItem("catID");
  // const university_id = localStorage.getItem("university_id");

  const handleApi = (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=mfd9laqjagdn0qn5tokigtvqf6");
    // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // myHeaders.append("Accept", "application/json");

    var formdata = new FormData();
    formdata.append("staffstudentregistration", "1");
    formdata.append("name", values.name);
    formdata.append("mobile", values.phoneNumber);
    formdata.append("email", values.email);
    formdata.append("password", values.password);
    // address
    formdata.append("address", values.address);
    // formdata.append("schoolname", values.schoolName);
    // formdata.append("collagename", values.collegeName);
    formdata.append("country", country);
    formdata.append("state", state);
    formdata.append("city", city);
    // formdata.append("university", university_id);
    // login
    formdata.append("username", values.userName);
    formdata.append("gender", gender);
    formdata.append("category", catID);
    formdata.append("Comment", values.Comment);
    // static value
    formdata.append("Tnc", isChecked);
    formdata.append("role", user_id);
    formdata.append("type", user_id);
    // ! New Keys
    // formdata.append("Organization", "");
    // formdata.append("Description", "");
    formdata.append("totalexperience", values.totalexperience);
    formdata.append("currentOccupation", values.currentOccupation);
    formdata.append("relatededucation", values.relatededucation);
    formdata.append("level_subject", values.level_subject);
    formdata.append("instituteName", values.instituteName);
    formdata.append("Description", values.Description);

    fetch("https://3dsco.com/3discoapi/studentregistration.php", {
      method: "POST",
      body: formdata,
      headers: myHeaders,
      redirect: "follow",
    })
      .then((resjson) => resjson.json())
      .then((resjson) => {
        if (resjson.success == 0) {
          setSnackVisibleFalse(true);
          setMessageFalse(resjson.message);
          console.log("False", resjson.message);
        } else {
          setMessageTrue(resjson.message);
          setSnackVisibleTrue(true);
          localStorage.setItem("registeredEmail", values.email);
          console.log(values.email);
          console.log("True", resjson.message);
          setTimeout(() => {
            navigation.navigate("OTPVerification");
          }, 1000);
        }
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  const phoneRegExp = /^[6-9]{1}[0-9]{9}$/;
  useEffect(() => {
    const myHeaders = myHeadersData();
    var config = {
      method: "get",
      url: "https://3dsco.com/3discoapi/3dicowebservce.php?country=1",
      headers: { myHeaders },
    };
    axios(config)
      .then((response) => {
        // console.log("country",response);
        var count = Object.keys(response.data.data).length;
        let countryArray = [];
        for (var i = 0; i < count; i++) {
          countryArray.push({
            value: response.data.data[i].country_id,
            label: response.data.data[i].name,
          });
        }
        setCountryData(countryArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleState = (countryCode) => {
    const myHeaders = myHeadersData();
    var config = {
      method: "get",
      url: `https://3dsco.com/3discoapi/state.php?state=1&country_id=${countryCode}`,
      headers: { myHeaders },
    };
    axios(config)
      .then((response) => {
        // console.log("mine", response);
        var count = Object.keys(response.data.data).length;
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            value: response.data.data[i].state_id,
            label: response.data.data[i].name,
          });
        }
        setStateData(stateArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCity = (countryCode, stateCode) => {
    const myHeaders = myHeadersData();
    var config = {
      method: "get",
      url: `https://3dsco.com/3discoapi/state.php?city=1&country_id=${countryCode}&state_id=${stateCode}`,
      headers: { myHeaders },
    };
    axios(config)
      .then((response) => {
        // console.log("mine", response);
        var count = Object.keys(response.data.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: response.data.data[i].city_id,
            label: response.data.data[i].name,
          });
        }
        setCityData(cityArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <BackButton />
        </TouchableOpacity>
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

        <View style={{ paddingHorizontal: 20 }}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phoneNumber: "",
              address: "",
              userName: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Name is required.")
                .min(3, "Name must be at least 3 characters")
                .max(20, "Name cannot be more than 20 characters"),
              email: Yup.string().email("Enter a valid email").required("Email is required"),
              phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
              address: Yup.string().required("Address is required."),
              // schoolName: Yup.string().required("School Name is required."),
              // collegeName: Yup.string().required("College Name is required."),
              userName: Yup.string().required("User Name is required."),
              password: Yup.string()
                .required("Password is required")
                .min(5, "Your password is too short.")
                .matches(/[a-zA-Z0-9]/, "Password can only contain Latin letters."),
              confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
            })}
            onSubmit={(values) => handleApi(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
              <View>
                {/*Personal Information*/}
                <Headline title={"personal information"} />
                <Input
                  label={"Name"}
                  placeholder={"Name"}
                  name="name"
                  keyboardType="text"
                  onChangeText={handleChange("name")}
                  value={values.name}
                  // onChangeText={(name) => setName(name)}
                  // onBlur={handleBlur("name")}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                <Input
                  label="Email ID"
                  placeholder="Enter your E-mail ID"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  // onChangeText={(email) => setEmail(email)}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                <Input
                  label="Contact No"
                  placeholder="Enter mobile number"
                  keyboardType="number-pad"
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  // onChangeText={(phone) => setPhone(phone)}
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                <Input
                  multiline={true}
                  numberOfLines={3}
                  label="Address"
                  placeholder="Enter your Address"
                  textAlignVertical={"top"}
                  onChangeText={handleChange("address")}
                  value={values.address}
                  // onChangeText={(address) => setAddress(address)}
                  // onBlur={handleBlur("address")}
                />
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
                {/*Institute Information*/}
                <Input
                  label="Institute Name"
                  placeholder="Institute Name"
                  value={values.instituteName}
                  onChangeText={handleChange("instituteName")}
                  // onChangeText={
                  //   (instituteName) => setInstituteName(instituteName)
                  // }
                />
                {/* {errors.instituteName && (
                  <Text style={styles.errorText}>{errors.instituteName}</Text>
                )} */}
                <Input
                  multiline={true}
                  numberOfLines={3}
                  label="Description"
                  placeholder="Description"
                  textAlignVertical={"top"}
                  onChangeText={handleChange("Description")}
                />
                {/* <CountryDropdown
                  label={"Country"}
                  onSelect={(selectedItem, index) => {
                    setCountry(selectedItem);
                    console.log(selectedItem, index);
                  }}
                />

                <StateDropdown
                  label={"State"}
                  onSelect={(selectedItem, index) => {
                    setState(selectedItem);
                    console.log(selectedItem, index);
                  }}
                />

                <CityDropdown
                  label={"City"}
                  onSelect={(selectedItem, index) => {
                    setCity(selectedItem);
                    console.log(selectedItem, index);
                  }}
                /> */}
                <Text style={styles.label_text}>Select Country</Text>
                {/* <Dropdown
                  style={[
                    styles.dropdown,
                    countryFocus && {
                      borderColor: color.purple,
                      borderWidth: 2,
                    },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={countryData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!countryFocus ? "Select Country" : "..."}
                  searchPlaceholder="Search..."
                  value={country}
                  onFocus={() => setCountryFocus(true)}
                  onBlur={() => setCountryFocus(false)}
                  onChange={(item) => {
                    setCountry(item.value);
                    setCountryFocus(false);
                    handleState(item.value);
                  }}
                  containerStyle={styles.dropdown_container}
                  itemContainerStyle={styles.dropdown_data}
                  itemTextStyle={styles.item_textStyle}
                /> */}
                <CountryDropdown
                  onSelect={(selectedItem) => {
                    setFieldValue("country", selectedItem?.id);
                    setCountry(selectedItem);
                  }}
                  value={country}
                />
                <Text style={styles.label_text}>Select State</Text>
                {/* <Dropdown
                  style={[styles.dropdown, stateFocus && { borderColor: color.purple, borderWidth: 2 }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={stateData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!stateFocus ? "Select State" : "..."}
                  searchPlaceholder="Search..."
                  value={state}
                  onFocus={() => setStateFocus(true)}
                  onBlur={() => setStateFocus(false)}
                  onChange={(item) => {
                    setState(item.value);
                    setStateFocus(false);
                    handleCity(country, item.value);
                  }}
                  containerStyle={styles.dropdown_container}
                  itemContainerStyle={styles.dropdown_data}
                  itemTextStyle={styles.item_textStyle}
                /> */}
                <StateDropdown
                  onSelect={(selectedItem) => {
                    setFieldValue("state", selectedItem?.id);
                    setState(selectedItem);
                  }}
                  value={state}
                />
                <Text style={styles.label_text}>Select City</Text>
                {/* <Dropdown
                  style={[styles.dropdown, cityFocus && { borderColor: color.purple, borderWidth: 2 }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={cityData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!cityFocus ? "Select City" : "..."}
                  searchPlaceholder="Search..."
                  value={city}
                  onFocus={() => setCityFocus(true)}
                  onBlur={() => setCityFocus(false)}
                  onChange={(item) => {
                    setCity(item.value);
                    setCityFocus(false);
                  }}
                  containerStyle={styles.dropdown_container}
                  itemContainerStyle={styles.dropdown_data}
                  itemTextStyle={styles.item_textStyle}
                /> */}
                <CityDropdown
                  onSelect={(selectedItem) => {
                    setFieldValue("city", selectedItem?.id);
                    setCity(selectedItem);
                  }}
                  value={city}
                />

                {/*Login and Password*/}
                <Headline title={"login and password"} />
                <Input
                  label="Username"
                  placeholder="Username"
                  value={values.userName}
                  onChangeText={handleChange("userName")}
                  // onChangeText={(username) => setUsername(username)}
                />
                {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}
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
                    placeholder={"Enter Password"}
                    name="password"
                    value={values.password}
                    secureTextEntry={isVisibleEntry}
                    autoCapitalize="none"
                    onChangeText={handleChange("password")}
                    // onChangeText={(password) => setPassword(password)}
                    // onBlur={handleBlur("passwor}
                  />
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                <View>
                  <TouchableOpacity style={styles.icon} onPress={() => setIsConfirmEntry(!isConfirmEntry)}>
                    <MaterialCommunityIcons
                      name={isConfirmEntry === false ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color={isConfirmEntry === false ? color.dark_gray : color.purple}
                    />
                  </TouchableOpacity>
                  <Input
                    label={"Confirm Password"}
                    placeholder={"Enter Confirm Password"}
                    name="confirmpassword"
                    onChangeText={handleChange("confirmPassword")}
                    value={values.confirmpassword}
                    secureTextEntry={isConfirmEntry}
                    autoCapitalize="none"
                    // onBlur={handleBlur("confirmpassword")}
                    // onChangeText={(confirmpassword) =>
                    //   setConfirmpassword(confirmpassword)
                    // }
                  />
                </View>
                {/* {errors.confirmpassword && (
                  <Text style={styles.errorText}>{errors.confirmpassword}</Text>
                )} */}

                {/*Other Preference*/}
                <Headline title={"other preference"} />
                <GenderDropdown
                  label={"Gender"}
                  onSelect={(selectedItem, index) => {
                    setGender(selectedItem);
                    console.log(selectedItem, index);
                  }}
                />
                <CategoryDropdown
                  label={"Category"}
                  onSelect={(selectedItem, index) => {
                    setCategory(selectedItem);
                    console.log(selectedItem, index);
                  }}
                  value={category}
                />
                <Input2
                  label="Comment"
                  placeholder="Comment"
                  multiline={true}
                  numberOfLines={3}
                  textAlignVertical={"top"}
                  onChangeText={handleChange("Comment")}
                  value={values.Comment}
                  // onChangeText={(comment) => setComment(comment)}
                />
                {/* {errors.comment && (
                  <Text style={styles.errorText}>{errors.comment}</Text>
                )} */}
                {/*Term & Condition*/}
                <Headline title={"term and condition"} />
                <Condition />

                {/*Extra Space*/}
                <View style={{ height: 20 }}></View>

                {/* CheckBox Container */}
                <View style={styles.checkbox_container}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? color.purple : undefined}
                  />
                  <Text style={styles.agree_text}>I agree to the above terms</Text>
                </View>

                {/*Extra Space*/}
                <View style={{ height: 40 }}></View>

                {/* SignUp Button */}
                <AppButton
                  title={"Sign Up"}
                  onPress={handleSubmit}
                  disabled={!isChecked}
                  btnColor={!isChecked === true ? "#6c757d" : color.purple}
                />
              </View>
            )}
          </Formik>
        </View>

        {/*Extra Space*/}
        <View style={{ height: 30 }}></View>

        {/* Don't have account container */}
        <View style={styles.account_container}>
          <Text style={styles.no_account}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={styles.login_text}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  heading_line: {
    color: color.purple,
    fontWeight: "bold",
    marginVertical: 20,
  },
  term_condition: {
    height: height / 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: color.gray,
    flexDirection: "row",
  },
  term_text: {
    fontSize: 16,
    color: color.black,
  },
  checkbox_container: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  agree_text: {
    alignSelf: "center",
    color: color.dark_gray,
    marginLeft: 10,
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
  account_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 60,
  },
  no_account: {
    color: color.dark_gray,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  login_text: {
    color: color.purple,
    fontSize: 16,
    marginLeft: 2,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontFamily: "Montserrat-Bold",
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
  icon: {
    position: "absolute",
    right: 15,
    top: "45%",
    zIndex: 1,
  },
});
