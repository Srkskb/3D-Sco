import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import color from "../../../assets/themes/Color";
import Input from "../../../components/inputs/Input";
import Input2 from "../../../components/inputs/Input2";
import AppButton from "../../../components/buttons/AppButton";
import Headline from "../../../components/Headline";
import AsyncStorage from "@react-native-community/async-storage";
import { GenderDropdown } from "../../../components/dropdown";
import { Snackbar } from "react-native-paper";
import HomeHeader from "../../../components/header/HomeHeader";
const { height, width } = Dimensions.get("window");
import StateDropdown from "../../../components/dropdown/StateDropdown";
import CityDropdown from "../../../components/dropdown/CityDropdown";
import CountryDropdown from "../../../components/dropdown/CountryDropdown";
import UniversityDropdown from "../../../components/dropdown/UniversityDropdown";
import { Formik } from "formik";
import * as Yup from "yup";
import * as qs from "qs";
import { resetStack } from "../../../utils/ResetStack";
import axios from "axios";
import { myHeadersData } from "../../../api/helper";
import EmptyInput from "../../../utils/EmptyInput";
import Loader from "../../../utils/Loader";
import CategoryDropdown from "../../../components/dropdown/CategoryDropdown";

export default function UpdateProfile({ navigation }) {
  // Alert Message or SnakesBar
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);

  const [toggle, setToggle] = useState({
    gender: "",
  });
  //   personal information states
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [category, setCategory] = useState();
  console.log("category", category);
  const fetchData = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    setLoading(true);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?profile=1&student_id=${myData.id}`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log("Profile_Detail", res?.Profile_Detail);
        setUserData(res?.Profile_Detail);
        setLoading(false);
        setToggle({
          gender: res?.Profile_Detail?.Gender,
        });
        setCountry({ name: res?.Profile_Detail?.Country_id, id: res?.Profile_Detail?.Country_id });
        setState({ name: res?.Profile_Detail?.state_id, id: res?.Profile_Detail?.state_id });
        setCity({ name: res?.Profile_Detail?.city_id, id: res?.Profile_Detail?.city_id });
        setCategory({ name: res?.Profile_Detail?.category_id, id: res?.Profile_Detail?.category_id });
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleApi = async (values) => {
    setLoading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const type =
      myData.type == "admin"
        ? 4
        : myData.type == "tutor"
        ? 2
        : myData.type == "affiliate"
        ? 5
        : myData.type == "student"
        ? 1
        : 3;

    let urlencoded = qs.stringify({
      update_studentprofile: "1",
      first_name: values?.name,
      mobile: values?.phone,
      address: values?.address,
      country: values?.country,
      state: values?.state,
      city: values?.city,
      username: values?.userName,
      gender: values?.gender,
      category: values?.category,
      comments: values?.comments,
      tandc: "1",
      role: type,
      id: myData?.id,
    });
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "d147dcadd6b1bd8bb79971d0f2f71d78");

    console.log(urlencoded);
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        if (responseJson.success == 0) {
          setSnackVisibleFalse(true);
          setLoading(false);
          console.log("what", responseJson.message);
          setMessageFalse(responseJson.message);
        } else {
          setLoading(false);
          setMessageTrue(responseJson?.message);
          console.log("what", responseJson.message);
          setSnackVisibleTrue(true);
          resetStack(navigation, "ViewProfile");

          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: "HomeScreen" }],
          // });
          // navigation.replace("HomeScreen");
        }

        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      {loading && <Loader />}
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <HomeHeader navigation={navigation} title={"Update Profile"} />
        <Snackbar
          visible={snackVisibleTrue}
          onDismiss={() => setSnackVisibleTrue(false)}
          action={{ label: "Close" }}
          theme={{ colors: { accent: "#82027D" } }}
          wrapperStyle={{ zIndex: 1 }}
        >
          {getMessageTrue}
        </Snackbar>
        <Snackbar
          visible={snackVisibleFalse}
          onDismiss={() => setSnackVisibleFalse(false)}
          action={{ label: "Close" }}
          theme={{ colors: { accent: "red" } }}
          wrapperStyle={{ zIndex: 1 }}
        >
          {getMessageFalse}
        </Snackbar>
        <View>
          <Formik
            enableReinitialize
            validateOnChange={false}
            initialValues={{
              name: userData?.name,
              phone: userData?.Contact,
              address: userData?.Address,
              // schoolName: userData?.School,
              // collegeName: userData?.college,
              country: userData?.Country_id,
              state: userData?.state_id,
              city: userData?.city_id,
              // university: userData?.University,
              userName: userData?.Username,
              gender: userData?.Gender,
              category: userData?.category_id,
              comments: userData?.comment,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Event Title is required"),
              phone: Yup.string().required("Contact Number is required"),
              address: Yup.string().required("Address is required"),
              // schoolName: Yup.string().required("School Name is required"),
              // collegeName: Yup.string().required("College Name is required"),
              country: Yup.string().required("Country is required"),
              state: Yup.string().required("State is required"),
              city: Yup.string().required("City is required"),
              // university: Yup.string().required("University is required"),
              userName: Yup.string().required("User Name is required"),
              gender: Yup.string().required("Gender is required"),
              category: Yup.string().required("Category is required"),
              comments: Yup.string().required("Comment is required"),
            })}
            onSubmit={(values) => handleApi(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
              <View style={{ paddingHorizontal: 20 }}>
                {/*Personal Information*/}
                <Headline title={"personal information"} />
                {/* Profile Picture */}
                {/* <ProfilePicture /> */}
                <Input
                  label="Name"
                  placeholder="Enter your full name"
                  name="name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                />
                {errors.name && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.name}</Text>}
                <Input
                  label="Contact No"
                  placeholder="Enter mobile number"
                  keyboardType="number-pad"
                  name="phone"
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                />
                {errors.phone && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.phone}</Text>}
                <Input
                  multiline={true}
                  numberOfLines={3}
                  label="Address"
                  name="address"
                  value={values?.address}
                  placeholder="Enter your Address"
                  textAlignVertical={"top"}
                  onChangeText={handleChange("address")}
                />
                {errors.address && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.address}</Text>
                )}

                {/*Educational Information*/}
                <Headline title={"EDUCATIONAL INFORMATION"} />
                {/* <Input
                  label="School Name"
                  placeholder="School Name"
                  name="schoolName"
                  value={values.schoolName}
                  onChangeText={handleChange("schoolName")}
                />
                {errors.schoolName && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.schoolName}</Text>
                )} */}

                {/* <Input
                  label="College Name"
                  name="collegeName"
                  placeholder="College Name"
                  onChangeText={handleChange("collegeName")}
                  value={values.collegeName}
                />
                {errors.collegeName && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.collegeName}</Text>
                )} */}
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
          />
          <UniversityDropdown
            label={"University"}
            onSelect={(selectedItem, index) => {
              setuniversity(selectedItem);
              console.log(selectedItem, index);
            }}
          /> */}

                <Text style={styles.label_text}>Select Country</Text>
                {/* {userData?.Country ? ( */}
                {/* {toggle.country ? (
                  <EmptyInput value={userData?.Country} name="country" setToggle={setToggle} />
                ) : ( */}
                <CountryDropdown
                  onSelect={(selectedItem) => {
                    setFieldValue("country", selectedItem?.id);
                    setCountry(selectedItem);
                  }}
                  // value={country}
                  value={country}
                />
                {/* )} */}
                {errors.country && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.country}</Text>
                )}

                <Text style={styles.label_text}>Select State</Text>
                {/* {toggle.state ? (
                  <EmptyInput value={userData?.state} name="state" setToggle={setToggle} />
                ) : ( */}
                <StateDropdown
                  countryId={values?.country}
                  onSelect={(selectedItem) => {
                    setFieldValue("state", selectedItem?.id);
                    setState(selectedItem);
                  }}
                  value={state}
                />
                {/* )} */}
                {errors.state && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.state}</Text>}

                <Text style={styles.label_text}>Select City</Text>
                {/* {toggle.city ? (
                  <EmptyInput value={userData?.city} name="city" setToggle={setToggle} />
                ) : ( */}
                <CityDropdown
                  stateId={values?.state}
                  countryId={values?.country}
                  onSelect={(selectedItem) => {
                    setFieldValue("city", selectedItem?.id);
                    setCity(selectedItem);
                  }}
                  value={city}
                />
                {/* )} */}

                {errors.city && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.city}</Text>}
                {/* <Text style={styles.label_text}>Select University</Text>
                {toggle.university ? (
                  <EmptyInput value={userData?.University} name="university" setToggle={setToggle} />
                ) : (
                  <UniversityDropdown
                    countryId={values?.country}
                    onSelect={(selectedItem) => {
                      setFieldValue("university", selectedItem?.id);
                      setUniversity(selectedItem);
                    }}
                    value={university}
                  />
                )}
                {errors.university && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.university}</Text>
                )} */}
                {/*Login and Password*/}
                <Headline title={"Username"} />
                <Input
                  label="Username"
                  placeholder="Username"
                  autoCapitalize="none"
                  name="userName"
                  onChangeText={handleChange("userName")}
                  value={values?.userName}
                />
                {errors.userName && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.userName}</Text>
                )}
                {/* <Input
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(e) => setPassword(e)}
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(e) => setConfirmpassword(e)}
          /> */}

                {/*Other Preference*/}
                <Headline title={"other preference"} />
                <Text style={styles.label_text}>Gender</Text>

                {toggle.gender ? (
                  <EmptyInput value={userData?.Gender} name="gender" setToggle={setToggle} />
                ) : (
                  <GenderDropdown
                    // label={"Gender"}
                    name="gender"
                    onSelect={(selectedItem, index) => {
                      // setGender(selectedItem);
                      console.log(selectedItem, index);
                      setFieldValue("gender", selectedItem);
                    }}
                  />
                )}
                {errors.gender && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.gender}</Text>}
                <Text style={styles.label_text}>Category</Text>

                {/* {toggle.category ? (
                  <EmptyInput value={userData?.category} name="category" setToggle={setToggle} />
                ) : ( */}
                <CategoryDropdown
                  // label={"Category"}
                  onSelect={(selectedItem, index) => {
                    setCategory(selectedItem);
                    // console.log(selectedItem.id, index);
                    setFieldValue("category", selectedItem.id);
                  }}
                  value={category}
                />
                {/* )} */}
                {errors.category && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.category}</Text>
                )}
                <Input2
                  label="Comments"
                  placeholder="Comments"
                  multiline={true}
                  numberOfLines={3}
                  textAlignVertical={"top"}
                  name="comments"
                  value={values?.comments}
                  onChangeText={handleChange("comments")}
                />
                {errors.comments && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.comments}</Text>
                )}

                {/*Extra Space*/}
                {/* <View style={{ height: 40 }}></View> */}

                {/* SignUp Button */}
                <AppButton loading={loading} title={"Update"} onPress={() => handleSubmit()} btnColor={color.purple} />
              </View>
            )}
          </Formik>
        </View>

        {/*Extra Space*/}
        <View style={{ height: 30 }}></View>
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
  //dropdown style

  dropdown: {
    height: 50,
    borderColor: color.gray,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 5,
  },

  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: color.dark_gray,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  selectedTextStyle: {
    color: color.black,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label_text: {
    color: color.black,
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
    marginBottom: 5,
  },
  dropdown_data: {
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
  },
  dropdown_container: {
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: 5,
  },
  item_textStyle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
  },
});
