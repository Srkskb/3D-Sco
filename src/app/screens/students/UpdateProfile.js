import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import BackButton from "../../components/buttons/BackButton";
import color from "../../assets/themes/Color";
import Input from "../../components/inputs/Input";
import Input2 from "../../components/inputs/Input2";
import CheckBoxC from "../../components/CheckBoxC";
import AppButton from "../../components/buttons/AppButton";
import Condition from "../../components/Conditions";
import Headline from "../../components/Headline";
import {
  StateDropdown,
  CountryDropdown,
  GenderDropdown,
  UniversityDropdown,
  CityDropdown,
} from "../../components/dropdown";
import CategoryDropdown from "../../components/dropdown/CategoryDropdown";

import ProfilePicture from "../../components/view/ProfilePicture";
import { Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { myHeadersData } from "./../../api/helper";
const { height } = Dimensions.get("window");
export default function UpdateProfile({ navigation }) {
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  //   personal information states
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [university, setuniversity] = useState();
  const [gender, setGender] = useState();
  const [category, setCategory] = useState();
  const [comment, setComment] = useState();
  const user_id = localStorage.getItem("user_id"); // ! loged user id
  const loginUID = localStorage.getItem("loginUID"); // ! loged user type

  // ! Too show user details
  const showUserDetails = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?profile=1&student_id=${myData.id}`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUpName(res.Profile_Detail.name);
        setUpEmail(res.Profile_Detail.Email);
        setUpGender(res.Profile_Detail.Gender);
        setUpContact(res.Profile_Detail.Contact);
        setUpCountry(res.Profile_Detail.Country);
        // setUpSchool(res.Profile_Detail.School);
        setUpAddress(res.Profile_Detail.Address);
        setUpUsername(res.Profile_Detail.Username);
        setUpUniversity(res.Profile_Detail.University);
        setUpCategory(res.Profile_Detail.category);
        setUpComment(res.Profile_Detail.comment);
        setUpOcc(res.Profile_Detail.occ);
        setUpEdu(res.Profile_Detail.edu);
        setUpLevel(res.Profile_Detail.level);
        setUpDate_of_birth(res.Profile_Detail.date_of_birth);
        setUpZip(res.Profile_Detail.zip);
        setUpCity_id(res.Profile_Detail.city_id);
        setUpState_id(res.Profile_Detail.state_id);
        // setUpUniversity_name(res.Profile_Detail.university_name);
        // setUpInstitute(res.Profile_Detail.institute);
        // setUpCollege(res.Profile_Detail.college);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    showUserDetails();
  }, []);

  const handleApi = (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=ckmj4nc6enk1u3e0rle62m3l64");
    var urlencoded = new FormData();
    urlencoded.append("studentregistration", "1");
    urlencoded.append("first_name", values.name);
    urlencoded.append("mobile", values.phoneNumber);
    urlencoded.append("email", values.email);
    urlencoded.append("password", values.password);
    // address
    urlencoded.append("address", values.address);
    urlencoded.append("schoolname", values.schoolName);
    urlencoded.append("collagename", values.collegeName);
    urlencoded.append("country", country);
    urlencoded.append("state", state);
    urlencoded.append("city", city);
    urlencoded.append("univercity", university);
    // login
    urlencoded.append("username", values.userName);
    urlencoded.append("gender", gender);
    urlencoded.append("category", category);
    urlencoded.append("comments", comment);
    // static value
    urlencoded.append("tandc", "1");
    // urlencoded.append("role", user_id);

    console.log(urlencoded);
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: {
        myHeaders,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        if (responseJson.success == 0) {
          setSnackVisibleFalse(true);
          setMessageFalse(responseJson.message);
        } else {
          setMessageTrue(responseJson.message);
          setSnackVisibleTrue(true);
          navigation.navigate("HomeScreen");
        }
        console.log(responseJson);
      })
      .catch((error) => {
        //Hide Loader
        alert("Invalid credential ");
        console.error(error);
      });
  };
  const phoneRegExp = /^[6-9]{1}[0-9]{9}$/;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <TouchableOpacity onPress={() => navigation.navigate("ViewProfile")}>
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
              // schoolName: "",
              // collegeName: "",
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
                .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
              confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
            })}
            onSubmit={(values) => handleApi(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
              <View>
                {/*Personal Information*/}
                <Headline title={"personal information"} />
                {/*Personal Information*/}

                {/* Profile Picture */}
                <ProfilePicture />
                <Input
                  label={"Name"}
                  placeholder={"Name"}
                  name="name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={getName}
                  keyboardType="text"
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                <Input
                  label={"Email ID"}
                  placeholder={"Email ID"}
                  name="email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="text"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                <Input
                  label={"Contact No"}
                  placeholder={"Enter mobile number"}
                  name="phoneNumber"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  keyboardType="number-pad"
                />
                {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                <Input
                  label={"Address"}
                  placeholder={"Enter your Address"}
                  name="address"
                  multiline={true}
                  numberOfLines={3}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                  textAlignVertical={"top"}
                />
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                {/*Educational Information*/}
                <Headline title={"EDUCATIONAL INFORMATION"} />

                {/* <Input
                  label={"School Name"}
                  placeholder={"School Name"}
                  name="schoolName"
                  onChangeText={handleChange("schoolName")}
                  onBlur={handleBlur("schoolName")}
                  value={values.schoolName}
                  keyboardType="text"
                />
                {errors.schoolName && <Text style={styles.errorText}>{errors.schoolName}</Text>} */}

                {/* <Input
                  label={"College Name"}
                  placeholder={"College Name"}
                  name="collegeName"
                  onChangeText={handleChange("collegeName")}
                  onBlur={handleBlur("collegeName")}
                  value={values.collegeName}
                  keyboardType="text"
                />
                {errors.collegeName && <Text style={styles.errorText}>{errors.collegeName}</Text>} */}

                <CountryDropdown
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
                />
                {/* <UniversityDropdown
                  label={"University"}
                  onSelect={(selectedItem, index) => {
                    setuniversity(selectedItem);
                    console.log(selectedItem, index);
                  }}
                /> */}

                {/*Login and Password*/}
                <Headline title={"login and password"} />
                <Input
                  label={"Username"}
                  placeholder={"Enter Username"}
                  name="userName"
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  value={values.userName}
                  keyboardType="text"
                />
                {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}

                <Input
                  label={"Password"}
                  placeholder={"Enter Password"}
                  name="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <Input
                  label={"Confirm Password"}
                  placeholder={"Enter Confirm Password"}
                  name="confirmpassword"
                  onChangeText={handleChange("confirmpassword")}
                  onBlur={handleBlur("confirmpassword")}
                  value={values.confirmpassword}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
                {errors.confirmpassword && <Text style={styles.errorText}>{errors.confirmpassword}</Text>}

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
                  }}
                />
                <Input2
                  label="Comments"
                  placeholder="Comments"
                  multiline={true}
                  numberOfLines={3}
                  textAlignVertical={"top"}
                  onChangeText={(e) => setComment(e)}
                />

                {/*Term & Condition*/}
                <Headline title={"terms and conditions"} />
                <Condition />

                {/*Extra Space*/}
                <View style={{ height: 20 }}></View>

                {/* CheckBox Container */}
                <View style={styles.checkbox_container}>
                  <CheckBoxC />
                  <Text style={styles.agree_text}>I agree to the above terms</Text>
                </View>

                {/*Extra Space*/}
                <View style={{ height: 40 }}></View>

                {/* SignUp Button */}
                <AppButton title={"Sign Up"} onPress={handleSubmit} disabled={!isValid} />
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
});
