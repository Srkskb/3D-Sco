import React, { useState } from "react";
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
import SmallButton from "../../../components/buttons/SmallButton";
import { myHeadersData } from "../../../api/helper";
import { Snackbar } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";

export default function EditBlogs({ route, navigation }) {
  // ** For Event Update
  const { blogID, eventIDParam } = route.params; // ! Current Event ID
  const { title, titleParam } = route.params;
  const { date, dateIDParam } = route.params;
  const { description, descriptionIDParam } = route.params;
  const loginUID = localStorage.getItem("loginUID");
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

  const updateEvent = () => {
    const myHeaders = myHeadersData();
    var urlencoded = new FormData();
    urlencoded.append("update_blogs", "1");
    urlencoded.append("titel", updateTitle);
    urlencoded.append("date", selectedDate);
    urlencoded.append("description", updateDescription);
    urlencoded.append("id", blogID);
    urlencoded.append("user_id", loginUID);

    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php`, {
      method: "POST",
      body: urlencoded,
      headers: {
        myHeaders,
      },
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("Blogs");
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
        title={"Update Blog"}
        onPress={() => navigation.navigate("Blogs")}
      />
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
                keyboardType="text"
              />

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
                  {selectedDate ? selectedDate.toLocaleDateString() : `${date}`}
                </Text>
                <Text></Text>
                <View style={styles.selectDate}>
                  <TouchableOpacity onPress={showDatePicker}>
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
