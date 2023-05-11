import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
// import { AccessLevel } from "../../../components/dropdown";
import AccessLevel from "../../../components/dropdown/AccessLevel";
import SmallButton from "../../../components/buttons/SmallButton";
import { myHeadersData } from "../../../api/helper";
import { Snackbar } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import axios from "axios";
import qs from "qs";
import AsyncStorage from "@react-native-community/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";

export default function EditEvent({ route, navigation }) {
  // ** For Event Update
  const { editData } = route.params; // ! Current Event ID
  console.log("editData", editData);
  // const { title, titleParam } = route.params;
  // const { status, statusIDParam } = route.params;
  const [loading, setloading] = useState(false);
  // const { dateData, dateIDParam } = route.params;
  // const { description, descriptionIDParam } = route.params;
  // const loginUID = localStorage.getItem("loginUID");
  // const [access, setAccess] = useState(status);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [updateTitle, setUpTitle] = useState(title);
  // const [updateDescription, setUpDescription] = useState(description);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    console.log(date);
    hideDatePicker();
  };

  const updateEvent = async (values) => {
    setloading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const myHeaders = myHeadersData();
    var data = qs.stringify({
      update_event: "1",
      event_titel: values?.evenTitle,
      access_level: values?.access,
      decription: values?.eventDescription,
      event_id: editData?.event_id,
      event_date: values?.eventDate,
      user_id: myData.id,
    });
    console.log(data);
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/3dicowebservce.php",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=41mqd76dj1dbfh1dbhbrkk6jv5",
      },
      data: data,
    };
    axios(config).then((res) => {
      console.log(res.data);
      if (res.status == 200) {
        setloading(false);
        setSnackVisibleTrue(true);
        setMessageTrue(res.data.message);
        navigation.goBack();
      } else {
        setloading(false);
        setSnackVisibleFalse(true);
        setMessageFalse(res.data.message);
      }
    });
  };
  // ** Use Effect To get value of each and every Field
  const [showResults, setShowResults] = useState(false);
  const onClick = () => {
    setShowResults(true);
  };
  return (
    <View style={styles.container}>
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
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack title={"Update Event"} onPress={() => navigation.goBack()} />
      {/* <NavigationDrawer backPress={() => navigation.navigate("HomeScreen")} /> */}
      {/* <NavigationDrawer backPress={() => navigation.navigate("AddEvent")}/> */}
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
              enableReinitialize
              initialValues={{
                evenTitle: editData?.event_title,
                eventDescription: editData?.decription,
                access: editData?.access_level,
                eventDate: editData?.event_date,
              }}
              validationSchema={Yup.object().shape({
                evenTitle: Yup.string()
                  .required("Event Title is required")
                  .min(3, "Event Title must be at least 3 characters"),
                access: Yup.string().required("Access Level is required"),
                eventDate: Yup.string().required("Event Date is required"),
                eventDescription: Yup.string()
                  .required("Description is required")
                  .min(8, "Description must be at least 8 characters"),
              })}
              onSubmit={(values) => updateEvent(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
                <View>
                  <InputField
                    label={"Event Title"}
                    placeholder={"Event Title"}
                    name="evenTitle"
                    onChangeText={handleChange("evenTitle")}
                    onBlur={handleBlur("evenTitle")}
                    value={values.evenTitle}
                    keyboardType="text"
                  />
                  {errors.evenTitle && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.evenTitle}</Text>
                  )}
                  <AccessLevel
                    required
                    label={"Access Level"}
                    name="access"
                    onSelect={(selectedItem, index) => {
                      setFieldValue("access", selectedItem.id);
                      console.log("selectedItem", selectedItem);
                    }}
                    value={values?.access}
                  />

                  {errors.access && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.access}</Text>
                  )}
                  <Text style={{ marginBottom: 5 }}>
                    <Text style={styles.label_text}>Event Date</Text>
                    <Text style={{ color: color.red }}>*</Text>
                  </Text>
                  <View style={styles.calendar_input}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      {values.eventDate ? values.eventDate : "No date selected"}
                    </Text>
                    <View style={styles.selectDate}>
                      <TouchableOpacity onPress={showDatePicker}>
                        {/* <Text>Select Date</Text> */}
                        <Entypo name="calendar" size={24} color={color.purple} />
                      </TouchableOpacity>
                    </View>

                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      date={selectedDate}
                      onConfirm={(e) => {
                        setFieldValue("eventDate", moment(e).format("YYYY-MM-DD"));
                        hideDatePicker();
                      }}
                      onCancel={hideDatePicker}
                    />
                  </View>
                  {errors.eventDate && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.eventDate}</Text>
                  )}

                  <InputField
                    label={"Description"}
                    placeholder={"Description"}
                    multiline={true}
                    numberOfLines={6}
                    textAlignVertical={"top"}
                    name="eventDescription"
                    onChangeText={handleChange("eventDescription")}
                    onBlur={handleBlur("eventDescription")}
                    value={values.eventDescription}
                    keyboardType="text"
                  />
                  {errors.eventDescription && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.eventDescription}</Text>
                  )}

                  <View style={styles.button}>
                    <SmallButton
                      title={"Cancel"}
                      color={color.purple}
                      fontFamily={"Montserrat-Medium"}
                      onPress={() => navigation.goBack()}
                    />
                    <SmallButton
                      onPress={handleSubmit}
                      title="Save"
                      loading={loading}
                      disabled={!isValid}
                      color={color.white}
                      backgroundColor={color.purple}
                      fontFamily={"Montserrat-Bold"}
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
