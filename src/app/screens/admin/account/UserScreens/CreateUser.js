import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import HeaderBack from "../../../../components/header/Header";
import color from "../../../../assets/themes/Color";
import Headline from "../../../../components/Headline";
import Input from "../../../../components/inputs/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import User from "../../../../components/dropdown/User";
import GenderDropdown from "../../../../components/dropdown/GenderDropdown";
import CountryDropdown from "../../../../components/dropdown/CountryDropdown";
import CityDropdown from "../../../../components/dropdown/CityDropdown";
import UniversityDropdown from "../../../../components/dropdown/UniversityDropdown";
import StateDropdown from "../../../../components/dropdown/StateDropdown";
import CategoryDropdown from "../../../../components/dropdown/CategoryDropdown";
import Input2 from "../../../../components/inputs/Input2";
import { AppButton } from "../../../../components/buttons";
import ActiveStatus from "../../../../components/dropdown/ActiveStatus";
import AccountType from "../../../../components/dropdown/AccountType";
import { myHeadersData } from "../../../../api/helper";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import Loader from "../../../../utils/Loader";

export default function CreateUser({ navigation }) {
  const [isVisibleEntry, setIsVisibleEntry] = useState(true);
  const [isVisibleEntry2, setIsVisibleEntry2] = useState(true);
  const [loading, setLoading] = useState(false);

  const createNewStudent = (values) => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append("username", values.userName);
    formdata.append("password", values.password);
    formdata.append("email", values.email);
    formdata.append("name", values.name);
    // formdata.append("type", values.accountType);
    formdata.append("type", "1");
    // formdata.append("status", values.status);
    // formdata.append("dob", values.dob);
    formdata.append("gender", values.gender);
    formdata.append("address", values.address);
    // formdata.append("zipCode", values.zipCode);
    formdata.append("schoolname", values.schoolName);
    formdata.append("Organization", values.collegeName);
    formdata.append("country", values.country);
    formdata.append("state", values.state);
    formdata.append("city", values.city);
    formdata.append("university", values.university);
    formdata.append("mobile", values.phone);
    // formdata.append("website", values.website);
    formdata.append("category", values.category);
    //extra data
    formdata.append("add_master_student", "1");
    formdata.append("collagename", "collagename");
    formdata.append("Comment", "Comment");
    formdata.append("Description", "Description");
    formdata.append("Experience", "Experience");
    formdata.append("Occupation", "Occupation");
    formdata.append("Education", "Education");
    formdata.append("Levels", "Levels");
    formdata.append("institute", "institute");
    formdata.append("Tnc", "Tnc");
    formdata.append("created_by", "263");

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5");
    console.log("values", formdata);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      // redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("created-------", result);
        if (result.success) {
          navigation.navigate("MasterStudentList");
          setLoading(false);
        } else {
          Alert.alert("Some issue", result.message, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      })
      .finally(() => setLoading(false));
  };
  if (loading) {
    <Loader />;
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={{ paddingHorizontal: 15 }}>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              userName: "",
              password: "",
              confirmPassword: "",
              email: "",
              name: "",
              accountType: "",
              status: "",
              dob: "",
              gender: "",
              address: "",
              zipCode: "",
              schoolName: "",
              collegeName: "",
              country: "",
              state: "",
              city: "",
              university: "",
              phone: "",
              website: "",
              category: "",
            }}
            validationSchema={Yup.object().shape({
              userName: Yup.string().required("UserName is required").min(3, "UserName must be at least 3 characters"),
              password: Yup.string().required("Password is required"),
              confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
              email: Yup.string().required("Email is required"),
              name: Yup.string().required("Name is required"),
              accountType: Yup.string().required("Account Type is required"),
              status: Yup.string().required("status is required"),
              dob: Yup.string().required("DOB is required"),
              gender: Yup.string().required("Gender is required"),
              address: Yup.string().required("Street Address is required"),
              zipCode: Yup.string().required("ZipCode is required"),
              schoolName: Yup.string().required("School Name is required"),
              collegeName: Yup.string().required("College Name is required"),
              country: Yup.string().required("Country is required"),
              state: Yup.string().required("State is required"),
              city: Yup.string().required("City is required"),
              university: Yup.string().required("University is required"),
              phone: Yup.string().required("Phone is required"),
              website: Yup.string().required("Website is required"),
              category: Yup.string().required("Category is required"),
            })}
            onSubmit={(values) => createNewStudent(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue, resetForm }) => (
              <View>
                <Headline title={"Required information"} />
                <Input
                  label={"Username"}
                  placeholder={"Enter Username"}
                  value={values?.userName}
                  name="userName"
                  onChangeText={handleChange("userName")}
                />
                {errors.userName && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.userName}</Text>
                )}
                <View>
                  <TouchableOpacity style={styles.icon} onPress={() => setIsVisibleEntry((prev) => !prev)}>
                    <MaterialCommunityIcons
                      name={isVisibleEntry === false ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color={isVisibleEntry === false ? color.dark_gray : color.purple}
                    />
                  </TouchableOpacity>
                  <Input
                    label={"Password"}
                    placeholder={"Enter Password"}
                    secureTextEntry={isVisibleEntry}
                    name="password"
                    autoCapitalize="none"
                    value={values.password}
                    onChangeText={handleChange("password")}
                  />
                  {errors.password && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.password}</Text>
                  )}
                </View>
                <View>
                  <TouchableOpacity style={styles.icon} onPress={() => setIsVisibleEntry2((prev) => !prev)}>
                    <MaterialCommunityIcons
                      name={isVisibleEntry2 === false ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color={isVisibleEntry2 === false ? color.dark_gray : color.purple}
                    />
                  </TouchableOpacity>
                  <Input
                    label={"Confirm Password"}
                    placeholder={"Confirm Password"}
                    secureTextEntry={isVisibleEntry2}
                    autoCapitalize="none"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.confirmPassword}</Text>
                  )}
                </View>
                <Input
                  label={"Email"}
                  name="email"
                  placeholder={"Enter Email Address"}
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                {errors.email && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.email}</Text>}
                <Input label={"Name"} placeholder={"Name"} value={values.name} onChangeText={handleChange("name")} />
                {/* <User onSelect={(item, index) => console.log(item)} label={"Account Type"} /> */}
                <AccountType
                  // onSelect={(item, index) => console.log(item)}
                  label={"Account Type"}
                  onSelect={(selectedItem, index) => {
                    setFieldValue("accountType", selectedItem.id);
                    // setType(selectedItem.id);
                  }}
                  // value={type}
                />
                {errors.accountType && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.accountType}</Text>
                )}
                <ActiveStatus
                  name="status"
                  onSelect={(selectedItem, index) => {
                    setFieldValue("status", selectedItem);
                  }}
                  // value={status}
                />
                {errors.status && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.status}</Text>}
                <Headline title={"Personal information (Optional)"} />
                <Input2
                  name="dob"
                  label={"Date of Birth"}
                  placeholder={"DD-MM-YYYY"}
                  value={values.dob}
                  onChangeText={handleChange("dob")}
                />
                {errors.dob && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.dob}</Text>}
                <GenderDropdown
                  name="gender"
                  label={"Select Gender"}
                  // onSelect={(item, index) =>
                  //   console.log(item)}
                  onSelect={(item, index) => {
                    // setGender(item);
                    setFieldValue("gender", item);
                  }}
                  // value={gender}
                />
                {errors.gender && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.gender}</Text>}
                <Input2
                  name="address"
                  label={"Street Address"}
                  placeholder={"Street Address"}
                  value={values.address}
                  onChangeText={handleChange("address")}
                />
                {errors.address && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.address}</Text>
                )}
                <Input2
                  name="zipCode"
                  label={"Postal/Zip Code"}
                  placeholder={"Postal/Zip Code"}
                  value={values.zipCode}
                  onChangeText={handleChange("zipCode")}
                />
                {errors.zipCode && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.zipCode}</Text>
                )}
                <Input2
                  name="schoolName"
                  label={"School Name"}
                  placeholder={"School Name"}
                  value={values.schoolName}
                  onChangeText={handleChange("schoolName")}
                />
                {errors.schoolName && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.schoolName}</Text>
                )}
                <Input2
                  name="collegeName"
                  label={"College Name"}
                  placeholder={"College Name"}
                  value={values.collegeName}
                  onChangeText={handleChange("collegeName")}
                />
                {errors.collegeName && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.collegeName}</Text>
                )}
                <CountryDropdown
                  name="country"
                  label={"Country"}
                  // onSelect={(item, index) => console.log(item)}
                  onSelect={(selectedItem, index) => {
                    // setCountry(selectedItem.id);
                    // console.log("sss", selectedItem);
                    setFieldValue("country", selectedItem.id);
                  }}
                  // value={country}
                />
                {errors.country && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.country}</Text>
                )}
                <StateDropdown
                  label={"State"}
                  name="state"
                  // onSelect={(item, index) => console.log(item)}
                  onSelect={(selectedItem, index) => {
                    // setState(selectedItem.id);
                    // console.log("state", selectedItem);
                    setFieldValue("state", selectedItem.id);
                  }}
                  // value={state}
                />
                {errors.state && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.state}</Text>}
                <CityDropdown
                  label={"City"}
                  name="city"
                  // onSelect={(item, index) => console.log(item)}
                  onSelect={(selectedItem, index) => {
                    // setCity(selectedItem.id);
                    // console.log("city", selectedItem);
                    setFieldValue("city", selectedItem.id);
                  }}
                  // value={city}
                />
                {errors.city && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.city}</Text>}
                <UniversityDropdown
                  name="university"
                  label={"University"}
                  // onSelect={(item, index) => console.log(item)}
                  onSelect={(selectedItem, index) => {
                    // setUniversity(selectedItem.id);
                    // console.log("first", selectedItem);
                    setFieldValue("university", selectedItem.id);
                  }}
                  // value={university}
                />
                {errors.university && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.university}</Text>
                )}
                <Input2
                  label={"Telephone"}
                  name="phone"
                  placeholder={"Enter Mobile Number"}
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                />
                {errors.phone && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.phone}</Text>}
                <Input2
                  name="website"
                  label={"Website"}
                  placeholder={"http://"}
                  value={values.website}
                  onChangeText={handleChange("website")}
                />
                {errors.website && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.website}</Text>
                )}
                <CategoryDropdown
                  label={"Category"}
                  name="category"
                  // onSelect={(item, index) => console.log(item)}
                  onSelect={(selectedItem, index) => {
                    // setCategory(selectedItem);
                    setFieldValue("category", selectedItem.id);
                  }}
                  // value={category}
                />
                {/* <ErrorMessage name="category" component="div" /> */}
                {errors.category && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.category}</Text>
                )}
                <AppButton
                  disabled={loading}
                  title={"Continue"}
                  btnColor={color.purple}
                  onPress={() => handleSubmit()}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      )}
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
});
