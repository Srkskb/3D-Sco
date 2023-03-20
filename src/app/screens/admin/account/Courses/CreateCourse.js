import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
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
import LanguageDropdown from "../../../../components/dropdown/LanguageDropdown";
import moment from "moment/moment";
import CategoryDropdown from "../../../../components/dropdown/CategoryDropdown";
import AsyncStorage from "@react-native-community/async-storage";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");
export default function CreateCourse({ navigation }) {
  const [checked, setChecked] = React.useState("first1");
  const [checked2, setChecked2] = React.useState("first1");
  const loginUID = localStorage.getItem("loginUID");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState();
  const [selectedEnd, setSelectedEnd] = useState();
  const [categoreis, setCategoreis] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const [courseData, setCourseData] = useState({
    courseName: "",
    language: "",
    description: "",
    syndicate: "",
    exportContent: "",
    access: "",
    releaseDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format("YYYY-MM-DD"),
    banner: "",
    initialContent: "",
    quota: "",
    quota_other: "",
    fileSize: "",
    fileSizeOther: "",
    copyright: "",
    subject: "",
    numWeek: "",
    syllabus: "",
    jobSheet: "",
    catId: "",
    icon: "",
    releaseOn: false,
    endOn: false,
  });
  const addCourse = async () => {
    setLoading(true);
    const myData = await AsyncStorage.getItem("userData");

    var data = qs.stringify({
      addcourses: "1",
      user_id: myData.id,
      course_name: courseData.courseName,
      language: courseData.language,
      Description: courseData.description,
      Syndicate: courseData.syndicate,
      export_content: courseData.exportContent,
      Access: courseData.access,
      notify_enroll: "0",
      hide_course: "0",
      ReleaseDate: courseData.releaseDate,
      EndDate: courseData.endDate,
      Banner: courseData.banner,
      initial_content: courseData.initialContent,
      quota: courseData.quota,
      quota_other: "",
      filesize: courseData.fileSize,
      filesize_other: "10",
      Copyright: "no",
      subject: courseData.subject,
      num_week: "0",
      Syllabus: courseData.syllabus,
      JobSheet: courseData.jobSheet,
      catID: courseData.catId,
    });
    var config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=pae8vgg24o777t60ue1clbj6d5",
      },
      body: data,
    };
    console.log("data", data);
    // axios(config)
    fetch("https://3dsco.com/3discoapi/studentregistration.php", config)
      .then((response) => {
        console.log("Create course", response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      console.log("image", result.assets[0].uri);
      setCourseData((prev) => ({
        ...prev,
        icon: result.assets[0].uri,
      }));
    }
  };
  return (
    <View style={styles.container}>
      <HeaderBack title={"Create Course"} onPress={() => navigation.goBack()} />

      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ marginVertical: 10 }}>
          <CategoryDropdown
            label={"Category"}
            name="category"
            onSelect={(selectedItem, index) => {
              setCourseData((prev) => ({
                ...prev,
                catId: selectedItem.id,
              }));
            }}
          />

          <LanguageDropdown
            label={"Primary Language"}
            onSelect={(selectedItem, index) => {
              setCourseData((prev) => ({
                ...prev,
                language: selectedItem.id,
              }));
            }}
          />
          <Input
            placeholder={"Course Title"}
            label={"Course Title"}
            value={courseData?.courseName}
            onChangeText={(text) =>
              setCourseData((prev) => ({
                ...prev,
                courseName: text,
              }))
            }
          />
          <Input
            placeholder={"Topic/Subject"}
            label={"Topic/Subject"}
            value={courseData?.subject}
            onChangeText={(text) =>
              setCourseData((prev) => ({
                ...prev,
                subject: text,
              }))
            }
          />
          {/* <CommonDropdown label={"Topic/Subject"} /> */}
          <Input
            placeholder={"Description"}
            label={"Description"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            value={courseData?.description}
            onChangeText={(text) =>
              setCourseData((prev) => ({
                ...prev,
                description: text,
              }))
            }
          />
          <Input
            placeholder={"Syllabus"}
            label={"Syllabus"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            value={courseData?.syllabus}
            onChangeText={(text) =>
              setCourseData((prev) => ({
                ...prev,
                syllabus: text,
              }))
            }
          />
          <Input
            placeholder={"Job Sheets"}
            label={"Job Sheets"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            value={courseData?.jobSheet}
            onChangeText={(text) =>
              setCourseData((prev) => ({
                ...prev,
                jobSheet: text,
              }))
            }
          />
          {/* <CommonDropdown label={"Export Content"} /> */}
          <ExportContent
            label={"Export Content"}
            marginBottom={10}
            onSelect={(selectedItem, index) => {
              setCourseData((prev) => ({
                ...prev,
                exportContent: selectedItem.name,
              }));
            }}
          />
          <Syndicate
            label={"Syndicate Announcements"}
            marginBottom={10}
            onSelect={(selectedItem, index) => {
              setCourseData((prev) => ({
                ...prev,
                syndicate: selectedItem.name,
              }));
            }}
          />
          <AccessLevel
            label={"Access"}
            marginBottom={10}
            onSelect={(selectedItem, index) => {
              setCourseData((prev) => ({
                ...prev,
                access: selectedItem.id,
              }));
            }}
          />

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
                onPress={() => {
                  setCourseData((prev) => ({
                    ...prev,
                    releaseOn: false,
                    releaseDate: moment(new Date()).format("YYYY-MM-DD"),
                  }));
                  setChecked("first");
                }}
                color={color.purple}
              />
              <Text style={styles.radioText}>Release Immediately</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => {
                  setCourseData((prev) => ({
                    ...prev,
                    releaseOn: !prev.releaseOn,
                  }));
                  setChecked("second");
                }}
                color={color.purple}
              />
              <Text style={styles.radioText}>Release on</Text>
            </View>
            {courseData.releaseOn && (
              <View>
                <Text style={styles.calendar_input}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Montserrat-SemiBold",
                    }}
                  >
                    {courseData.releaseDate ? moment(courseData.releaseDate).format("YYYY-MM-DD") : "No date selected"}
                  </Text>
                </Text>
                <View style={styles.selectDate}>
                  <TouchableOpacity
                    style={{ position: "absolute", bottom: 22, right: 20 }}
                    onPress={() => setDatePickerVisibility(true)}
                  >
                    {/* <Text>Select Date</Text> */}
                    <Entypo name="calendar" size={24} color={color.purple} />
                  </TouchableOpacity>
                </View>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  date={selectedRelease}
                  onConfirm={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      releaseDate: moment(e).format("YYYY-MM-DD"),
                    }))
                  }
                  onCancel={hideDatePicker}
                />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.radioText}>End Date</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="first1"
                status={checked2 === "first1" ? "checked" : "unchecked"}
                color={color.purple}
                onPress={() => {
                  setCourseData((prev) => ({
                    ...prev,
                    endOn: false,
                    endDate: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format(
                      "YYYY-MM-DD"
                    ),
                  }));
                  setChecked2("first1");
                }}
              />
              <Text style={styles.radioText}>No End Date</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="second1"
                status={checked2 === "second1" ? "checked" : "unchecked"}
                onPress={() => {
                  setCourseData((prev) => ({
                    ...prev,
                    endOn: !prev.endOn,
                  }));
                  setChecked2("second1");
                }}
                color={color.purple}
              />
              <Text style={styles.radioText}>End on</Text>
            </View>
            {courseData.endOn && (
              <View>
                <Text style={styles.calendar_input}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Montserrat-SemiBold",
                    }}
                  >
                    {courseData.endDate ? moment(courseData.endDate).format("YYYY-MM-DD") : "No date selected"}
                  </Text>
                </Text>
                <View style={styles.selectDate}>
                  <TouchableOpacity style={{ position: "absolute", bottom: 22, right: 20 }} onPress={showDatePicker2}>
                    {/* <Text>Select Date</Text> */}
                    <Entypo name="calendar" size={24} color={color.purple} />
                  </TouchableOpacity>
                </View>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible2}
                  mode="date"
                  date={selectedEnd}
                  onConfirm={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      endDate: moment(e).format("YYYY-MM-DD"),
                    }))
                  }
                  onCancel={hideDatePicker2}
                  is24Hour={true}
                  // isDarkModeEnabled={true}
                />
              </View>
            )}
          </View>
          <Input
            placeholder={"Banner"}
            label={"Banner"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            value={courseData?.banner}
            onChangeText={(text) =>
              setCourseData((prev) => ({
                ...prev,
                banner: text,
              }))
            }
          />
          <InitialContent
            label={"Initial Content"}
            onSelect={(selectedItem, index) => {
              setCourseData((prev) => ({
                ...prev,
                initialContent: selectedItem,
              }));
            }}
          />
          <Input
            label={"Course Quota"}
            placeholder={"in MB"}
            keyboardType="number-pad"
            value={courseData?.quota}
            onChangeText={(text) =>
              setCourseData((prev) => ({
                ...prev,
                quota: text,
              }))
            }
          />
          <Input
            label={"Max File Size"}
            placeholder={"in MB"}
            keyboardType="number-pad"
            value={courseData?.fileSize}
            onChangeText={(text) =>
              setCourseData((prev) => ({
                ...prev,
                fileSize: text,
              }))
            }
          />
          <UploadDocument type={"Icon"} pickImg={pickImg} />
          <View style={styles.button}>
            <SmallButton title={"Cancel"} color={color.purple} fontFamily={"Montserrat-Medium"} />
            <SmallButton
              title="Save"
              color={color.white}
              // loading={loading}
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
