import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import InputField from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import ActiveStatus from "../../../../components/dropdown/ActiveStatus";
import { UploadDocument } from "../../../../components";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import qs from "qs";
import { myHeadersData } from "../../../../api/helper";
export default function AddForum({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, SetStatus] = useState("Select Status");
  const [course, setCourse] = useState("Select Course");
  const loginUID = localStorage.getItem("loginUID");

  const AddForumBut = (values) => {
    const myHeaders = myHeadersData();
    console.log("values", values);
    var data = qs.stringify({
      add_courses_forum: "1",
      user_id: loginUID,
      admin_id: "176",
      forum_title: values.docTitle,
      Description: values.description,
      course_id: course,
      topic_id: status,
    });
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        if (response.data.success == 1) {
          navigation.navigate("Forum");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack title={"Add Forum"} onPress={() => navigation.goBack()} />
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Formik
              initialValues={{
                course: "",
                forumTitle: "",
                status: "",
                description: "",
              }}
              validationSchema={Yup.object().shape({
                course: Yup.string().required("Course is required"),
                forumTitle: Yup.string().required("Forum Title is required"),
                status: Yup.string().required("Status is required"),
                description: Yup.string().required("Description is required"),
              })}
              onSubmit={(values) => AddForumBut(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
                <View>
                  <SelectCourse
                    label={"Select Course"}
                    name="course"
                    onSelect={(selectedItem, index) => {
                      setFieldValue("course", selectedItem);
                    }}
                  />
                  {errors.course && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.course}</Text>
                  )}
                  <InputField
                    label={"Forum Title"}
                    placeholder={"Forum Title"}
                    name="forumTitle"
                    onChangeText={handleChange("forumTitle")}
                    onBlur={handleBlur("forumTitle")}
                    value={values.forumTitle}
                    keyboardType="text"
                  />
                  {errors.forumTitle && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.forumTitle}</Text>
                  )}

                  <ActiveStatus
                    name="status"
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem);
                      setFieldValue("status", selectedItem);
                    }}
                  />
                  {errors.status && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.status}</Text>
                  )}
                  <InputField
                    label={"Description"}
                    placeholder={"Description"}
                    name="description"
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
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
                      onPress={() => navigation.navigate("Forum")}
                    />
                    <SmallButton
                      onPress={() => handleSubmit()}
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
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
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
});
