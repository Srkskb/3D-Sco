import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import { AccessLevel } from "../../../components/dropdown";
import SmallButton from "../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import AppButton from "../../../components/buttons/AppButton";
import { Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";


export default function AdminAddEvent() {
  const navigation = useNavigation();
  const loginUID = localStorage.getItem("loginUID");
  const [access, setAccess] = useState("Private");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
  const addEventCalender = (values) => {
    const myHeaders = myHeadersData();
    var urlencoded = new FormData();
    urlencoded.append("add_event", "1");
    urlencoded.append("event_titel", values.evenTitle);
    urlencoded.append("access_level", access);
    urlencoded.append("event_date", "2023-01-14");
    urlencoded.append("decription", values.eventDecription);
    urlencoded.append("user_id", loginUID);
    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php`, {
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
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.replace("AdminCalender");
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
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
      <HeaderBack
        title={"Add Event"}
        onPress={() => navigation.goBack()}
      />
      {/* <NavigationDrawer backPress={() => navigation.navigate("HomeScreen")} /> */}
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
                evenTitle: "",
                eventDecription: "",
              }}
              validationSchema={Yup.object().shape({
                evenTitle: Yup.string()
                  .required("Event Title is required")
                  .min(3, "Event Title must be at least 3 characters"),

                eventDecription: Yup.string()
                  .required("Description is required")
                  .min(8, "Description must be at least 8 characters"),
              })}
              onSubmit={(values) => addEventCalender(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <View>
                  <InputField
                    label={"Event Title"}
                    placeholder={"Event Title"}
                    name="title"
                    onChangeText={handleChange("evenTitle")}
                    onBlur={handleBlur("evenTitle")}
                    value={values.evenTitle}
                    keyboardType="text"
                  />
                  {errors.evenTitle && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.evenTitle}
                    </Text>
                  )}
                  <AccessLevel
                    required
                    label={"Access Level"}
                    onSelect={(selectedItem, index) => {
                      setAccess(selectedItem);
                      console.log(selectedItem, index);
                    }}
                    value={access}
                  />

                  {errors.selectedItem && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.selectedItem}
                    </Text>
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
                      {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "No date selected"}
                    </Text>
                    <View style={styles.selectDate}>
                      <TouchableOpacity onPress={showDatePicker}>
                        {/* <Text>Select Date</Text> */}
                        <Entypo
                          name="calendar"
                          size={24}
                          color={color.purple}
                        />
                      </TouchableOpacity>
                    </View>

                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      date={selectedDate}
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                      
                    />
                  </View>

                  <InputField
                    label={"Description"}
                    placeholder={"Description"}
                    multiline={true}
                    numberOfLines={6}
                    textAlignVertical={"top"}
                    name="title"
                    onChangeText={handleChange("eventDecription")}
                    onBlur={handleBlur("eventDecription")}
                    value={values.eventDecription}
                    keyboardType="text"
                  />
                  {errors.eventDecription && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.eventDecription}
                    </Text>
                  )}

                  <View style={styles.button}>
                    {/* <SmallButton title={"Cancel"} color={color.purple} 
                    fontFamily={'Montserrat-Medium'}/> */}
                    <SmallButton
                      onPress={handleSubmit}
                      title="Save"
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
});
