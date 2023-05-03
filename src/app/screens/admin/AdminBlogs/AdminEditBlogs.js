import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import SmallButton from "../../../components/buttons/SmallButton";
import { myHeadersData } from "../../../api/helper";
import { Snackbar } from "react-native-paper";
import { AccessLevel } from "../../../components/dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import qs from "qs";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import EmptyInput from "../../../utils/EmptyInput";

export default function AdminEditBlogs({ route, navigation }) {
  // ** For Event Update
  const { editData } = route.params; // ! Current Event ID
  console.log("editData", editData);
  const [access, setAccess] = useState("");
  console.log("access", access);

  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [updateTitle, setUpTitle] = useState(title);
  // const [updateDescription, setUpDescription] = useState(description);
  const [loading, setLoading] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  useEffect(() => {
    setAccess(editData?.access);
  }, [editData]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    console.log(date);
    hideDatePicker();
  };

  const updateEvent = async (values) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    setLoading(true);
    var data = qs.stringify({
      update_blogs: "1",
      id: editData?.id,
      titel: values?.blogTitle,
      user_id: myData.id,
      access: values?.access,
      description: values?.description,
      date: moment(values?.blogDate).format("YYYY-MM-DD"),
    });
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://3dsco.com/3discoapi/3dicowebservce.php",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=k3uusd3c44n957mv6l05vpmf31",
      },
      data: data,
    };

    axios(config).then((res) => {
      console.log(res.data);
      if (res.data.success == 1) {
        setLoading(false);
        setSnackVisibleTrue(true);
        setMessageTrue(res.data.message);
        navigation.navigate("AdminBlogs");
      } else {
        setLoading(false);
        setSnackVisibleFalse(true);
        setMessageFalse(res.data.message);
      }
    });
  };
  return (
    <View style={styles.container}>
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
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack title={"Update Blog"} onPress={() => navigation.navigate("AdminBlogs")} />
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
          <View style={{ paddingVertical: 10 }}>
            <Formik
              enableReinitialize
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{
                blogTitle: editData?.Titel,
                description: editData?.Description,
                blogDate: editData?.Date,
                access: editData?.access,
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
              onSubmit={(values) => updateEvent(values)}
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

                  {access ? (
                    <>
                      <Text style={styles.label_text}>{"Access"}</Text>
                      <EmptyInput
                        value={values?.access}
                        onPress={() => {
                          setAccess();
                        }}
                      />
                    </>
                  ) : (
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
                  )}
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
  label_text: {
    color: color.black,
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
  },
  selectedData: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    paddingRight: 20,

    borderWidth: 2,
    borderColor: color.gray,
    borderRadius: 8,
  },
});
