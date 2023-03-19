import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
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
import InitialContent from "../../../../components/dropdown/admin_user/InitialContent";
import ExportContent from "../../../../components/dropdown/admin_user/ExportContent";
import Syndicate from "../../../../components/dropdown/admin_user/SyndicateAnnouncement";
import AccessLevel from "../../../../components/dropdown/admin_user/AccessLevel";
import CategoryDropdown from "../../../../components/dropdown/CategoryDropdown";
import LanguageDropdown from "../../../../components/dropdown/LanguageDropdown";
import * as ImagePicker from "expo-image-picker";
const { width, height } = Dimensions.get("window");
import * as qs from "qs";
import axios from "axios";

export default function EditCourse({ navigation, route }) {
  const { editData } = route.params;
  const [checked, setChecked] = React.useState("first");
  const [end, setEnd] = React.useState("first1");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState();
  const [selectedEnd, setSelectedEnd] = useState();
  const [loading, setLoading] = useState(false);
  const [editCourseData, setEditCourseData] = useState({
    category: "",
    language: "",
    title: "",
    subject: "",
    desc: "",
    syllabus: "",
    sheets: "",
    content: "",
    announcement: "",
    access: "",
    releaseDate: "",
    endDate: "",
    initialContent: "",
    courseQuota: "",
    maxFileSize: "",
    banner: "",
    icon: "",
    syndicate: "",
    exportContent: "",
    id: "",
    userId: "",
  });

  useEffect(() => {
    if (editData) {
      setEditCourseData((prev) => ({
        ...prev,
        category: editData.categorie,
        language: editData.Language,
        title: editData.Courses,
        subject: editData.subject,
        desc: editData.Description,
        syllabus: editData.Syllabus,
        sheets: editData.JobSheet,
        content: editData.export_content,
        announcement: editData.Syndicate,
        access: editData.Access,
        releaseDate: editData.ReleaseDate,
        endDate: editData.EndDate,
        banner: editData.Banner,
        initialContent: editData.Initial_content,
        courseQuota: editData.quota,
        maxFileSize: editData.filesize,
        icon: editData.icon,
        syndicate: editData.Syndicate,
        exportContent: editData.export_content,
        id: editData.id,
        userId: editData.user_id,
      }));
    }
  }, [editData]);
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
    hideDatePicker();
  };
  const handleConfirmEnd = (date) => {
    setSelectedEnd(date);
    hideDatePicker2();
  };

  const Edit = () => {
    var data = qs.stringify({
      Update_courses: "1",
      user_id: editCourseData.userId,
      course_name: editCourseData.title,
      language: editCourseData.language,
      Description: editCourseData.desc,
      Syndicate: editCourseData.syndicate,
      export_content: editCourseData.exportContent,
      Access: editCourseData.access,
      notify_enroll: "0",
      hide_course: "0",
      ReleaseDate: editCourseData.releaseDate,
      EndDate: editCourseData.endDate,
      Banner: editCourseData.banner,
      initial_content: editCourseData.initialContent,
      quota: editCourseData.courseQuota,
      quota_other: "",
      filesize: editCourseData.maxFileSize,
      Copyright: "no",
      subject: editCourseData.subject,
      num_week: "0",
      Syllabus: editCourseData.syllabus,
      JobSheet: editCourseData.sheets,
      catID: editCourseData.category,
      // id: editCourseData.id,
      id: "46",
    });
    var config = {
      method: "POST",
      // url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=pae8vgg24o777t60ue1clbj6d5",
      },
      body: data,
    };
    // axios(config)
    console.log("ENter");
    fetch("https://3dsco.com/3discoapi/studentregistration.php", config)
      .then(function (response) {
        console.log("response", response);
        navigation.goBack();
      })
      .catch(function (error) {
        console.log(error);
      });
    // var data = new FormData();
    // data.append("add_photos", "1");
    // data.append("title", values.docTitle);
    // data.append("user_id", loginUID);
    // data.append("detail", values.description);
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
      setEditCourseData((prev) => ({
        ...prev,
        icon: result.assets[0].uri,
      }));
    }
  };
  return (
    <View style={styles.container}>
      <HeaderBack title={"Edit Course"} onPress={() => navigation.goBack()} />

      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ marginVertical: 10 }}>
          {/* <CommonDropdown label={"Category"} /> */}
          <CategoryDropdown
            label={"Category"}
            name="category"
            onSelect={(selectedItem, index) => {
              setEditCourseData((prev) => ({
                ...prev,
                category: selectedItem.id,
              }));
            }}
          />
          {/* <CommonDropdown label={"Primary Language"} /> */}
          <LanguageDropdown
            label={"Primary Language"}
            onSelect={(selectedItem, index) => {
              setEditCourseData((prev) => ({
                ...prev,
                language: selectedItem.id,
              }));
            }}
          />
          <Input
            placeholder={"Course Title"}
            label={"Course Title"}
            value={editCourseData.title}
            onChangeText={(text) =>
              setEditCourseData((prev) => ({
                ...prev,
                title: text,
              }))
            }
          />
          <Input
            placeholder={"Topic/Subject"}
            label={"Topic/Subject"}
            value={editCourseData.subject}
            onChangeText={(text) =>
              setEditCourseData((prev) => ({
                ...prev,
                subject: text,
              }))
            }
          />
          <Input
            placeholder={"Description"}
            label={"Description"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            value={editCourseData.desc}
            onChangeText={(text) =>
              setEditCourseData((prev) => ({
                ...prev,
                desc: text,
              }))
            }
          />
          <Input
            placeholder={"Syllabus"}
            label={"Syllabus"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            value={editCourseData.syllabus}
            onChangeText={(text) =>
              setEditCourseData((prev) => ({
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
            value={editCourseData.sheets}
            onChangeText={(text) =>
              setEditCourseData((prev) => ({
                ...prev,
                sheets: text,
              }))
            }
          />
          <ExportContent
            label={"Export Content"}
            marginBottom={10}
            onSelect={(selectedItem, index) => {
              setEditCourseData((prev) => ({
                ...prev,
                syndicate: selectedItem.name,
              }));
            }}
          />
          <Syndicate
            label={"Syndicate Announcements"}
            marginBottom={10}
            onSelect={(selectedItem, index) => {
              setEditCourseData((prev) => ({
                ...prev,
                syndicate: selectedItem.name,
              }));
            }}
          />
          <AccessLevel
            label={"Access"}
            marginBottom={10}
            onSelect={(selectedItem, index) => {
              setEditCourseData((prev) => ({
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
                  {selectedRelease ? selectedRelease.toLocaleDateString() : "No date selected"}
                </Text>
              </Text>
              <View style={styles.selectDate}>
                <TouchableOpacity style={{ position: "absolute", bottom: 22, right: 20 }} onPress={showDatePicker}>
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
                  {selectedEnd ? selectedEnd.toLocaleDateString() : "No date selected"}
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
                mode="datetime"
                date={selectedEnd}
                onConfirm={handleConfirmEnd}
                onCancel={hideDatePicker2}
                is24Hour={true}
                // isDarkModeEnabled={true}
              />
            </View>
          </View>
          <InitialContent
            label={"Initial Content"}
            onSelect={(selectedItem, index) => {
              setEditCourseData((prev) => ({
                ...prev,
                initialContent: selectedItem,
              }));
            }}
          />
          <Input
            label={"Course Quota"}
            placeholder={"in MB"}
            keyboardType="number-pad"
            value={editCourseData.courseQuota}
            onChangeText={(text) =>
              setEditCourseData((prev) => ({
                ...prev,
                courseQuota: text,
              }))
            }
          />
          <Input
            label={"Max File Size"}
            placeholder={"in MB"}
            keyboardType="number-pad"
            value={editCourseData.maxFileSize}
            onChangeText={(text) =>
              setEditCourseData((prev) => ({
                ...prev,
                maxFileSize: text,
              }))
            }
          />
          <Input
            value={editCourseData.banner}
            placeholder={"Banner"}
            label={"Banner"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            onChangeText={(text) =>
              setEditCourseData((prev) => ({
                ...prev,
                banner: text,
              }))
            }
          />
          <UploadDocument type={"Icon"} pickImg={pickImg} />
          <View style={styles.uploadCon}>
            {!!editCourseData?.icon?.length && (
              <Image source={{ uri: editCourseData?.icon }} style={styles.uploadImg} />
            )}
          </View>
          <View style={styles.button}>
            <SmallButton title={"Cancel"} color={color.purple} fontFamily={"Montserrat-Medium"} />
            <SmallButton
              onPress={() => Edit()}
              title="Update"
              loading={loading}
              color={color.white}
              backgroundColor={color.purple}
              fontFamily={"Montserrat-Bold"}
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
  uploadCon: {
    textAlign: "center",
  },
});
