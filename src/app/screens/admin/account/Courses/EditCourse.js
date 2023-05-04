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
import * as Yup from "yup";
import { Formik } from "formik";
import moment from "moment";

export default function EditCourse({ navigation, route }) {
  const { editData } = route.params;
  console.log("editData", editData);
  const [checked, setChecked] = React.useState("first");
  const [checked2, setChecked2] = React.useState("first1");
  const [end, setEnd] = React.useState("first1");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState();
  const [selectedEnd, setSelectedEnd] = useState();
  const [loading, setloading] = useState(false);
  const [image, setImage] = useState(null);

  const [category, setCategory] = useState();
  console.log("category3333", category);

  useEffect(() => {
    if (editData) {
      // setEditCourseData((prev) => ({
      //   ...prev,
      //   category: editData.categorie,
      //   language: editData.Language,
      //   title: editData.Courses,
      //   subject: editData.subject,
      //   desc: editData.Description,
      //   syllabus: editData.Syllabus,
      //   sheets: editData.JobSheet,
      //   content: editData.export_content,
      //   announcement: editData.Syndicate,
      //   access: editData.Access,
      //   releaseDate: editData.ReleaseDate,
      //   endDate: editData.EndDate,
      //   banner: editData.Banner,
      //   initialContent: editData.Initial_content,
      //   courseQuota: editData.quota,
      //   maxFileSize: editData.filesize,
      //   icon: editData.icon,
      //   syndicate: editData.Syndicate,
      //   exportContent: editData.export_content,
      //   id: editData.id,
      //   userId: editData.user_id,
      // }));
      console.log("editData?.cat_ID", editData?.cat_ID);
      setCategory({ name: editData?.cat_ID, id: editData?.cat_ID });
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
  const [courseData, setCourseData] = useState({
    releaseDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format("YYYY-MM-DD"),

    releaseOn: false,
    endOn: false,
  });
  const Edit = (values) => {
    setloading(true);
    console.log("values", values);
    var data = qs.stringify({
      Update_courses: "1",
      user_id: editData.userId,
      course_name: values.courseName,
      language: values.language,
      Description: values.desc,
      Syndicate: values.syndicate,
      export_content: values.exportContent,
      Access: values.access,
      notify_enroll: "0",
      hide_course: "0",
      ReleaseDate: values.releaseDate,
      EndDate: values.endDate,
      Banner: values.banner,
      initial_content: values.initialContent,
      quota: values.courseQuota,
      quota_other: "",
      filesize: values.maxFileSize,
      Copyright: "no",
      subject: values.subject,
      num_week: "0",
      Syllabus: values.syllabus,
      JobSheet: values.sheets,
      catID: values.catId,
      id: editData.id,
      // id: "46",
    });
    console.log("data", data);
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
    console.log("ENter", data);
    fetch("https://3dsco.com/3discoapi/studentregistration.php", config)
      .then(function (response) {
        setloading(false);
        console.log("response", response);
        navigation.goBack();
      })
      .catch(function (error) {
        setloading(false);
        console.log(error);
      });
    // var data = new FormData();
    // data.append("add_photos", "1");
    // data.append("title", values.docTitle);
    // data.append("user_id", loginUID);
    // data.append("detail", values.description);
  };
  // const pickImg = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   if (!result.cancelled) {
  //     console.log("image", result.assets[0].uri);
  //     setEditCourseData((prev) => ({
  //       ...prev,
  //       icon: result.assets[0].uri,
  //     }));
  //   }
  // };

  const pickImg = async () => {
    console.log("first");
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    console.log(result);
    if (result.uri) {
      setImage(result);
    }
  };
  return (
    <View style={styles.container}>
      <HeaderBack title={"Edit Course"} onPress={() => navigation.goBack()} />

      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            catId: editData?.cat_ID,
            language: editData?.language,
            courseName: editData?.course_name,
            subject: editData?.subject,
            description: editData?.Description,
            syllabus: editData?.Syllabus,
            jobSheet: editData?.JobSheet,
            exportContent: editData?.export_content,
            syndicate: editData?.Syndicate,
            access: editData?.Access,
            banner: editData?.Banner,
            initialContent: editData?.initial_content,
            quota: editData?.quota,
            fileSize: editData?.filesize,
          }}
          validationSchema={Yup.object().shape({
            catId: Yup.string().required("Category is required"),
            language: Yup.string().required("Language is required"),
            courseName: Yup.string().required("Course Name is required"),
            subject: Yup.string().required("Subject is required"),
            description: Yup.string().required("Description is required"),
            syllabus: Yup.string().required("Syllabus is required"),
            jobSheet: Yup.string().required("JobSheet is required"),
            exportContent: Yup.string().required("Export Content is required"),
            syndicate: Yup.string().required("Syndicate is required"),
            access: Yup.string().required("Access is required"),
            banner: Yup.string().required("Banner is required"),
            initialContent: Yup.string().required("Initial Content is required"),
            quota: Yup.string().required("Quota is required"),
            fileSize: Yup.string().required("FileSize is required"),
          })}
          onSubmit={(values) => Edit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
            <View style={{ marginVertical: 10 }}>
              <CategoryDropdown
                label={"Category"}
                name="catId"
                onSelect={(selectedItem, index) => {
                  setFieldValue("catId", selectedItem.id);
                  setCategory(selectedItem);
                }}
                value={category}
              />
              {errors.catId && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.catId}</Text>}

              <LanguageDropdown
                label={"Primary Language"}
                onSelect={(selectedItem, index) => {
                  // setCourseData((prev) => ({
                  //   ...prev,
                  //   language: selectedItem.id,
                  // }));
                  setFieldValue("language", selectedItem.id);
                }}
              />
              {errors.language && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.language}</Text>
              )}

              <Input
                placeholder={"Course Title"}
                label={"Course Title"}
                name="courseName"
                value={values?.courseName}
                // onChangeText={(text) =>
                //   setCourseData((prev) => ({
                //     ...prev,
                //     courseName: text,
                //   }))
                // }
                onChangeText={handleChange("courseName")}
              />
              {errors.courseName && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.courseName}</Text>
              )}

              <Input
                placeholder={"Topic/Subject"}
                label={"Topic/Subject"}
                value={values?.subject}
                onChangeText={handleChange("subject")}
                name="subject"

                // onChangeText={(text) =>
                //   setCourseData((prev) => ({
                //     ...prev,
                //     subject: text,
                //   }))
                // }
              />
              {errors.subject && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.subject}</Text>}
              {/* <CommonDropdown label={"Topic/Subject"} /> */}
              <Input
                placeholder={"Description"}
                label={"Description"}
                multiline={true}
                numberOfLines={6}
                textAlignVertical={"top"}
                name="description"
                onChangeText={handleChange("description")}
                value={values?.description}
                // onChangeText={(text) =>
                //   setCourseData((prev) => ({
                //     ...prev,
                //     description: text,
                //   }))
                // }
              />
              {errors.description && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.description}</Text>
              )}
              <Input
                placeholder={"Syllabus"}
                label={"Syllabus"}
                multiline={true}
                numberOfLines={6}
                textAlignVertical={"top"}
                name="syllabus"
                onChangeText={handleChange("syllabus")}
                value={values?.syllabus}
                // onChangeText={(text) =>
                //   setCourseData((prev) => ({
                //     ...prev,
                //     syllabus: text,
                //   }))
                // }
              />
              {errors.syllabus && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.syllabus}</Text>
              )}
              <Input
                placeholder={"Job Sheets"}
                label={"Job Sheets"}
                multiline={true}
                numberOfLines={6}
                textAlignVertical={"top"}
                name="jobSheet"
                onChangeText={handleChange("jobSheet")}
                value={values?.jobSheet}
                // onChangeText={(text) =>
                //   setCourseData((prev) => ({
                //     ...prev,
                //     jobSheet: text,
                //   }))
                // }
              />
              {errors.jobSheet && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.jobSheet}</Text>
              )}
              {/* <CommonDropdown label={"Export Content"} /> */}
              <ExportContent
                label={"Export Content"}
                marginBottom={10}
                // name="exportContent"
                onSelect={(selectedItem, index) => {
                  // setCourseData((prev) => ({
                  //   ...prev,
                  //   exportContent: selectedItem.name,
                  // }));
                  setFieldValue("exportContent", selectedItem.name);
                }}
              />
              {errors.exportContent && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.exportContent}</Text>
              )}
              <Syndicate
                label={"Syndicate Announcements"}
                marginBottom={10}
                // name="syndicate"
                onSelect={(selectedItem, index) => {
                  // setCourseData((prev) => ({
                  //   ...prev,
                  //   syndicate: selectedItem.name,
                  // }));
                  setFieldValue("syndicate", selectedItem.name);
                }}
              />
              {errors.syndicate && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.syndicate}</Text>
              )}
              <AccessLevel
                label={"Access"}
                marginBottom={10}
                // name="access"
                onSelect={(selectedItem, index) => {
                  // setCourseData((prev) => ({
                  //   ...prev,
                  //   access: selectedItem,
                  // }));
                  setFieldValue("access", selectedItem);
                }}
              />
              {errors.access && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.access}</Text>}

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
                {courseData?.releaseOn && (
                  <View>
                    <Text style={styles.calendar_input}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Montserrat-SemiBold",
                        }}
                      >
                        {courseData.releaseDate
                          ? moment(courseData.releaseDate).format("YYYY-MM-DD")
                          : "No date selected"}
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
                value={values?.banner}
                // onChangeText={(text) =>
                //   setCourseData((prev) => ({
                //     ...prev,
                //     banner: text,
                //   }))
                // }
                name="banner"
                onChangeText={handleChange("banner")}
              />
              {errors.banner && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.banner}</Text>}

              <InitialContent
                label={"Initial Content"}
                onSelect={(selectedItem, index) => {
                  // setCourseData((prev) => ({
                  //   ...prev,
                  //   initialContent: selectedItem,
                  // }));
                  setFieldValue("initialContent", selectedItem);
                }}
              />
              {errors.initialContent && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.initialContent}</Text>
              )}

              <Input
                label={"Course Quota"}
                placeholder={"in MB"}
                keyboardType="number-pad"
                value={values?.quota}
                onChangeText={handleChange("quota")}
              />
              {errors.quota && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.quota}</Text>}
              <Input
                label={"Max File Size"}
                placeholder={"in MB"}
                keyboardType="number-pad"
                value={values?.fileSize}
                onChangeText={handleChange("fileSize")}

                // onChangeText={(text) =>
                //   // setCourseData((prev) => ({
                //   //   ...prev,
                //   //   fileSize: text,
                //   // }))
                //   setFieldValue("fileSize", text)
                // }
              />
              {errors.fileSize && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.fileSize}</Text>
              )}

              <UploadDocument type={"Icon"} pickImg={pickImg} />

              <View>{image?.name && <Text style={styles.uploadCon}>{image?.name}</Text>}</View>
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
                  color={color.white}
                  loading={loading}
                  backgroundColor={color.purple}
                  fontFamily={"Montserrat-Bold"}
                  // onPress={() => console.log("first")}
                />
              </View>
            </View>
          )}
        </Formik>
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
