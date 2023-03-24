import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import Input from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { UploadDocument } from "../../../../components";
import ActiveStatus from "../../../../components/dropdown/ActiveStatus";
import * as Yup from "yup";
import { Formik } from "formik";
import qs from "qs";
import axios from "axios";

import InputField from "../../../../components/inputs/Input";

export default function EditForum({ navigation, route }) {
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditData(route.params);
  }, [route.params]);

  const editForum = () => {
    setLoading(true);
    var data = qs.stringify({
      update_courses_forum: "1",
      user_id: editData.userId,
      admin_id: editData.userId,
      forum_title: editData.forumTitle,
      Description: editData.description,
      course_id: editData.course,
      topic_id: editData.status,
      id: editData.id,
    });
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        Accept: "application/json",
        Cookie: "PHPSESSID=pae8vgg24o777t60ue1clbj6d5",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.success == 1) {
          navigation.goBack();
          setLoading(false);
        } else {
          console.log("Some issue in edit form ");
        }
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack title={"Edit Forum"} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <View>
          <Formik
            enableReinitialize
            initialValues={{
              ...editData,
              course: "",
              status: "",
            }}
            validationSchema={Yup.object().shape({
              course: Yup.string().required("Course is required"),
              forumTitle: Yup.string().required("Forum Title is required"),
              status: Yup.string().required("Status is required"),
              description: Yup.string().required("Description is required"),
            })}
            onSubmit={(values) => editForum(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
              <View>
                <SelectCourse
                  label={"Select Course"}
                  name="course"
                  value={values.course}
                  onSelect={(selectedItem, index) => {
                    setFieldValue("course", selectedItem.id);
                  }}
                />
                {errors.course && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.course}</Text>}
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
                {errors.status && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.status}</Text>}
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
                {/* <UploadDocument type={"File"}/> */}
                <View style={styles.button}>
                  <SmallButton title={"Cancel"} color={color.purple} fontFamily={"Montserrat-Medium"} />
                  <SmallButton
                    onPress={() => handleSubmit()}
                    title="Update"
                    loading={loading}
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
});
