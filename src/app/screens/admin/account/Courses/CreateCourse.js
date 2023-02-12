import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderBack from "../../../../components/header/Header";
import color from "../../../../assets/themes/Color";
import Input from "../../../../components/inputs/Input";
import CommonDropdown from "../../../../components/dropdown/CommonDropdown";
import NewCheckbox from "../../../../components/NewCheckbox";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";
import { UploadDocument } from "../../../../components";
import SmallButton from "../../../../components/buttons/SmallButton";
import { myHeadersData } from "../../../../api/helper";
import * as qs from "qs";
import axios from "axios";
import InitialContent from "../../../../components/dropdown/admin_user/InitialContent";
import ExportContent from "../../../../components/dropdown/admin_user/ExportContent";
import Syndicate from "../../../../components/dropdown/admin_user/SyndicateAnnouncement";
import AccessLevel from "../../../../components/dropdown/admin_user/AccessLevel";

const { width, height } = Dimensions.get("window");
export default function CreateCourse({ navigation }) {
  const [checked, setChecked] = React.useState("first");
  const loginUID = localStorage.getItem("loginUID");
  const [end, setEnd] = React.useState("first1");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState();
  const [selectedEnd, setSelectedEnd] = useState();
  const [courseTitle, setCourseTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [languages, setLanguages] = useState([]);
  const [categoreis, setCategoreis] = useState([]);
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [Description, setDescription] = useState("");
  const [syllabus, setsyllabus] = useState("");
  const [jobsheet, setJobsheet] = useState("");
  const [banner, setBanner] = useState("");
  const [maxsize, setMaxsize] = useState("");
  const [courseQuota, setCourseQuota] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirmRelease = (date) => {
    setSelectedRelease(date);
    console.log(date);
    hideDatePicker();
  };
  const handleConfirmEnd = (date) => {
    setSelectedEnd(date);
    console.log(date);
    hideDatePicker2();
  };
  const addCourse = () => {
    var data = qs.stringify({
      addcourses: "1",
      user_id: loginUID,
      course_name: courseTitle,
      language: language,
      Description: Description,
      Syndicate: "1",
      export_content: "all",
      Access: "Public",
      notify_enroll: "0",
      hide_course: "0",
      ReleaseDate: selectedRelease,
      EndDate: selectedEnd,
      Banner: banner,
      initial_content: "2",
      quota: "Unlimited",
      quota_other: "",
      filesize: maxsize,
      filesize_other: "100",
      Copyright: "no",
      subject: "BA",
      num_week: "0",
      Syllabus: syllabus,
      JobSheet: jobsheet,
      catID: "2",
    });
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const getlanguages = () => {
    var config = {
      method: "get",
      url: "https://3dsco.com/3discoapi/studentregistration.php?courses_language_list=1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=ksrmsjn33kam2917j4475ihmv4",
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data.length));
        if (response.data.success == 1 && response.data.data.length) {
          let language = response.data.data.map((i) => i.Language);
          setLanguages(language);
        } else {
          setLanguages([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategories = () => {
    var config = {
      method: "get",
      url: "https://3dsco.com/3discoapi/3dicowebservce.php?category_list=1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=ksrmsjn33kam2917j4475ihmv4",
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
        if (response.data.success == 1 && response.data.data.length > 0) {
          let category = response.data.data.map((i) => i.Name);
          setCategoreis(category);
        } else {
          setCategoreis([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getlanguages();
    getCategories();
  }, []);
  return (
    <View style={styles.container}>
      <HeaderBack title={"Create Course"} onPress={() => navigation.goBack()} />

      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ marginVertical: 10 }}>
          <CommonDropdown
            label={"Category"}
            data={categoreis}
            onSelect={(text) => setCategory(text)}
          />
          <CommonDropdown
            label={"Primary Language"}
            data={languages}
            onSelect={(text) => setLanguage(text)}
          />
          <Input
            placeholder={"Course Title"}
            label={"Course Title"}
            onChangeText={(text) => setCourseTitle(text)}
          />
          <Input
            placeholder={"Topic/Subject"}
            label={"Topic/Subject"}
            onChangeText={(text) => setSubject(text)}
          />
          {/* <CommonDropdown label={"Topic/Subject"} /> */}
          <Input
            placeholder={"Description"}
            label={"Description"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            onChangeText={(text) => setDescription(text)}
          />
          <Input
            placeholder={"Syllabus"}
            label={"Syllabus"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            onChangeText={(text) => setsyllabus(text)}
          />
          <Input
            placeholder={"Job Sheets"}
            label={"Job Sheets"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            onChangeText={(text) => setJobsheet(text)}
          />
          {/* <CommonDropdown label={"Export Content"} /> */}
          <ExportContent label={"Export Content"} />
          <Syndicate label={"Syndicate Announcements"} />
          <AccessLevel label={"Access"} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <NewCheckbox />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Montserrat-Regular",
                marginLeft: 10,
              }}
            >
              Email me when new enrollments require approval.
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <NewCheckbox />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Montserrat-Regular",
                marginLeft: 10,
              }}
            >
              Hide this course from the Browse Courses list.
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.radioText}>Release Date</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
                color={color.purple}
              />
              <Text style={styles.radioText}>Release Immediately</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => setChecked("second")}
                color={color.purple}
              />
              <Text style={styles.radioText}>Release on</Text>
            </View>
            <View>
              <Text style={styles.calendar_input}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  {selectedRelease
                    ? selectedRelease.toLocaleDateString()
                    : "No date selected"}
                  {`  `}
                  {selectedRelease
                    ? selectedRelease.toLocaleTimeString()
                    : "No date selected"}
                </Text>
              </Text>
              <View style={styles.selectDate}>
                <TouchableOpacity
                  style={{ position: "absolute", bottom: 22, right: 20 }}
                  onPress={showDatePicker}
                >
                  {/* <Text>Select Date</Text> */}
                  <Entypo name="calendar" size={24} color={color.purple} />
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={selectedRelease}
                onConfirm={handleConfirmRelease}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
          <View>
            <Text style={styles.radioText}>End Date</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="first1"
                status={end === "first1" ? "checked" : "unchecked"}
                onPress={() => setEnd("first1")}
                color={color.purple}
              />
              <Text style={styles.radioText}>No End Date</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="second1"
                status={end === "second1" ? "checked" : "unchecked"}
                onPress={() => setEnd("second1")}
                color={color.purple}
              />
              <Text style={styles.radioText}>End on</Text>
            </View>
            <View>
              <Text style={styles.calendar_input}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  {selectedEnd
                    ? selectedEnd.toLocaleDateString()
                    : "No date selected"}
                  {`  `}

                  {selectedEnd
                    ? selectedEnd.toLocaleTimeString()
                    : "No date selected"}
                </Text>
              </Text>
              <View style={styles.selectDate}>
                <TouchableOpacity
                  style={{ position: "absolute", bottom: 22, right: 20 }}
                  onPress={showDatePicker2}
                >
                  {/* <Text>Select Date</Text> */}
                  <Entypo name="calendar" size={24} color={color.purple} />
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                mode="datetime"
                date={selectedEnd}
                onConfirm={handleConfirmEnd}
                onCancel={hideDatePicker2}
                is24Hour={true}
                // isDarkModeEnabled={true}
              />
            </View>
          </View>
          <Input
            placeholder={"Banner"}
            label={"Banner"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            onChangeText={(text) => setBanner(text)}
          />
          {/* <CommonDropdown label={"Initial Content"} /> */}
          <InitialContent label={"Initial Content"} />
          <Input
            label={"Course Quota"}
            placeholder={"in MB"}
            onChangeText={(text) => setCourseQuota(text)}
            keyboardType="number-pad"
          />
          <Input
            label={"Max File Size"}
            placeholder={"in MB"}
            onChangeText={(text) => setMaxsize(text)}
            keyboardType="number-pad"
          />
          <UploadDocument type={"Icon"} />
          <View style={styles.button}>
            <SmallButton
              title={"Cancel"}
              color={color.purple}
              fontFamily={"Montserrat-Medium"}
            />
            <SmallButton
              title="Save"
              color={color.white}
              loading={loading}
              backgroundColor={color.purple}
              fontFamily={"Montserrat-Bold"}
              onPress={() => addCourse()}
            />
          </View>
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
  main: {
    paddingHorizontal: 10,
  },
  search_course: {
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "space-between",
    // width:'50%',
    alignItems: "center",
  },
  filter_button: {
    paddingVertical: 10,
    width: "40%",
    alignSelf: "center",
  },
  main_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: height / 2,
  },
  not_enrolled: {
    fontFamily: "Montserrat-Regular",
  },
  radioText: {
    fontFamily: "Montserrat-Regular",
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
  button: {
    flexDirection: "row",
    marginTop: 20,
  },
});
