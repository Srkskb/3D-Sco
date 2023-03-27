import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import { AccessLevel } from "../../../components/dropdown";
import SmallButton from "../../../components/buttons/SmallButton";
import { myHeadersData } from "../../../api/helper";
import { Snackbar } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import axios from "axios";
import qs from "qs";
import AsyncStorage from "@react-native-community/async-storage";
export default function EducatorEditEvent({ route, navigation }) {
  // ** For Event Update
  const { eventID, eventIDParam } = route.params; // ! Current Event ID
  const { title, titleParam } = route.params;
  const { status, statusIDParam } = route.params;
  const { dateData, dateIDParam } = route.params;
  const { description, descriptionIDParam } = route.params;
  const loginUID = localStorage.getItem("loginUID");
  const [access, setAccess] = useState(status);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [updateTitle, setUpTitle] = useState(title);
  const [updateDescription, setUpDescription] = useState(description);

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

  const updateEvent = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const myHeaders = myHeadersData();
    var data = qs.stringify({
      update_event: "1",
      event_titel: updateTitle,
      access_level: access,
      decription: updateDescription,
      event_id: eventID,
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
        setSnackVisibleTrue(true);
        setMessageTrue(res.data.message);
        navigation.goBack();
      } else {
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
            <View>
              <InputField
                required
                label={"Event Title"}
                placeholder={"Event Title"}
                name="title"
                onChangeText={(text) => setUpTitle(text)}
                value={updateTitle}
                // keyboardType="text"
              />
              {showResults ? (
                <>
                  <AccessLevel
                    required
                    label={"Access Level"}
                    onSelect={(selectedItem) => {
                      console.log(selectedItem);
                      setAccess(selectedItem);
                    }}
                    placeholder={status}
                  />
                </>
              ) : (
                <>
                  <View style={{ marginBottom: 5 }}>
                    <Text>
                      Access Level<Text style={{ color: color.red }}>*</Text>
                    </Text>
                    <View style={styles.selectedData}>
                      <Text>{status}</Text>
                      <TouchableOpacity onPress={onClick}>
                        <Entypo name="circle-with-cross" size={24} color={color.purple} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}

              <Text style={{ marginBottom: 5 }}>
                <Text style={styles.label_text}>Event Date</Text>
                {/* <Text style={{ color: color.red }}>*</Text> */}
              </Text>
              <View style={styles.calendar_input}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  {selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : `${dateData}`}
                </Text>
                <Text></Text>
                <View style={styles.selectDate}>
                  <TouchableOpacity
                  // onPress={showDatePicker}
                  >
                    <Entypo name="calendar" size={24} color={color.purple} />
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
                value={updateDescription}
                onChangeText={(text) => setUpDescription(text)}
                keyboardType="text"
              />

              <View style={styles.button}>
                <SmallButton
                  onPress={updateEvent}
                  title="Save"
                  color={color.white}
                  backgroundColor={color.purple}
                  fontFamily={"Montserrat-Bold"}
                />
              </View>
            </View>
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
