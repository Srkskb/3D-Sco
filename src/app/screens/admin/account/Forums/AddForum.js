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
import AsyncStorage from "@react-native-community/async-storage";

export default function AddForum({ navigation }) {
  const AddForumBut = async (values) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    var data = qs.stringify({
      add_courses_forum: "1",
      user_id: myData.id,
      admin_id: myData.id,
      forum_title: values.forumTitle,
      Description: values.description,
      course_id: values.course,
      topic_id: values.status,
    });
    var config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=pae8vgg24o777t60ue1clbj6d5",
      },
      body: data,
    };
    console.log("values", data);

    // axios(config)
    await fetch("https://3dsco.com/3discoapi/studentregistration.php", config)
      .then((response) => response.json())
      .then((response) => {
        console.log("add forum", response);
        if (response?.success == 1) {
          navigation.navigate("Forum");
        } else {
          console.log("some issue in add forum");
        }
      })
      .catch((error) => {
        console.log("error", error);
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
                      setFieldValue("course", selectedItem.id);
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
                      setFieldValue("status", selectedItem.id);
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
