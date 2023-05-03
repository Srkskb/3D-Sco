import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, Button, TouchableOpacity } from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import { AccessLevel } from "../../../components/dropdown";
import SmallButton from "../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import AppButton from "../../../components/buttons/AppButton";
import { Snackbar } from "react-native-paper";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-community/async-storage";

export default function EducatorAddBlog() {
  const navigation = useNavigation();
  const [access, setAccess] = useState("");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [loading, setloading] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const addFileCabinet = async (values) => {
    setloading(true);
    const data = JSON.parse(await AsyncStorage.getItem("userData"));

    const myHeaders = myHeadersData();
    var urlencoded = new FormData();
    urlencoded.append("blogs", "1");
    urlencoded.append("titel", values.blogTitle);
    urlencoded.append("access", values.access);
    urlencoded.append("user_id", data.id);
    urlencoded.append("date", moment(values?.blogDate).format("YYYY-MM-DD"));
    urlencoded.append("description", values.description);

    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: {
        myHeaders,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("add bog", res);
        if (res.success == 1) {
          setloading(false);
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("EducatorBlogs");
        } else {
          setloading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack title={"Add Blog"} onPress={() => navigation.navigate("EducatorBlogs")} />
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
        duration={2000}
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
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingVertical: 10 }}>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{
                blogTitle: "",
                description: "",
                blogDate: "",
                access: "",
              }}
              validationSchema={Yup.object().shape({
                blogTitle: Yup.string()
                  .required("Document Title is required")
                  .min(3, "Document Title must be at least 3 characters")
                  .max(150, "Document Title cannot be more than 150 characters"),
                description: Yup.string()
                  .required("Description is required")
                  .min(20, "Description must be at least 20 characters"),
                blogDate: Yup.string().required("Date is required"),
                access: Yup.string().required("Access is required"),
              })}
              onSubmit={(values) => addFileCabinet(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue, resetForm }) => (
                <View>
                  <InputField
                    label={"Blog Title"}
                    placeholder={"Blog Title"}
                    name="blogTitle"
                    onChangeText={handleChange("blogTitle")}
                    // onBlur={handleBlur("blogTitle")}
                    value={values.blogTitle}
                    keyboardType="text"
                  />
                  {errors.blogTitle && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.blogTitle}</Text>
                  )}
                  <Text style={{ marginBottom: 5 }}>
                    <Text style={styles.label_text}>Blog Date</Text>
                    <Text style={{ color: color.red }}>*</Text>
                  </Text>
                  <View style={styles.calendar_input}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      {values?.blogDate ? moment(values?.blogDate).format("YYYY-MM-DD") : "No date selected"}
                    </Text>
                    <View style={styles.selectDate}>
                      {/* <TouchableOpacity onPress={showDatePicker}> */}
                      <TouchableOpacity onPress={(e) => setDatePickerVisibility(true)}>
                        <Entypo name="calendar" size={24} color={color.purple} />
                      </TouchableOpacity>
                    </View>

                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      name="blogDate"
                      onConfirm={(e) => {
                        setFieldValue("blogDate", e);
                        handleChange("blogDate");
                        setDatePickerVisibility(false);
                      }}
                      onCancel={() => setDatePickerVisibility(false)}
                    />
                  </View>
                  {errors.blogDate && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.blogDate}</Text>
                  )}

                  <AccessLevel
                    required
                    name="access"
                    label={"Access Level"}
                    onSelect={(selectedItem, index) => {
                      setAccess(selectedItem);
                      setFieldValue("access", selectedItem.name);
                      handleChange("access");
                    }}
                    value={access}
                  />
                  {errors.access && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.access}</Text>
                  )}
                  <InputField
                    label={"Description"}
                    placeholder={"Description"}
                    name="description"
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={handleChange("description")}
                    value={values.description}
                    keyboardType="default"
                    textAlignVertical="top"
                  />
                  {errors.description && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.description}</Text>
                  )}
                  <View style={styles.button}>
                    <SmallButton
                      title={"Cancel"}
                      color={color.purple}
                      fontFamily={"Montserrat-Medium"}
                      onPress={() => navigation.goBack()}
                    />
                    <SmallButton
                      onPress={() => handleSubmit()}
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
  main: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headline: {
    fontFamily: "Montserrat-Regular",
    color: "#081F32",
    marginBottom: 20,
    fontSize: 13,
  },
  calendar_input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: color.gray,
    borderRadius: 8,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    paddingRight: 20,
    marginBottom: 10,
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
  uploadImg: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 5,
  },
  uploadCon: {
    textAlign: "center",
  },
  label_text: {
    color: color.black,
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
  },
});
