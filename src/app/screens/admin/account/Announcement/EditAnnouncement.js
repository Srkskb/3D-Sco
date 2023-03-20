import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import InputField from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { UploadDocument } from "../../../../components";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
export default function EditAnnouncement({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState("Select Course");
  const loginUID = localStorage.getItem("loginUID");
  const EditAnnouncement = (values, id) => {
    console.log(values.docTitle, course, loginUID, values.description);
    var data = new FormData();
    data.append("Update_courses_announcement", "1");
    data.append("user_id", loginUID);
    data.append("announcement_title", values.title);
    data.append("Description", values.description);
    data.append("course_id", course);
    data.append("image");
    data.append("id", id);

    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        Cookie: "PHPSESSID=hc3kbqpelmbu5cl5em37e2j4j7",
        data,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigation.navigate("Announcement");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack title={"Add Announcement"} onPress={() => navigation.goBack()} />
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Formik
              initialValues={{
                docTitle: "",
                description: "",
              }}
              validationSchema={Yup.object().shape({
                docTitle: Yup.string()
                  .required("Document Title is required")
                  .min(3, "Document Title must be at least 3 characters")
                  .max(50, "Document Title cannot be more than 50 characters"),
                description: Yup.string()
                  .required("Description is required")
                  .min(20, "Description must be at least 20 characters")
                  .max(250, "Description cannot be more than 50 characters"),
              })}
              onSubmit={(values) => EditAnnouncement(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                <View>
                  <InputField
                    label={"Document Title"}
                    placeholder={"Document Title"}
                    name="title"
                    onChangeText={handleChange("docTitle")}
                    onBlur={handleBlur("docTitle")}
                    value={values.docTitle}
                    keyboardType="text"
                  />
                  {errors.docTitle && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.docTitle}</Text>
                  )}
                  {/* <AccessLevel
                    required
                    label={"Access Level"}
                    onSelect={(selectedItem, index) => {
                      setAccess(selectedItem);
                      console.log(selectedItem, index);
                    }}
                    value={access}
                  /> */}
                  <SelectCourse
                    label={"Select Course"}
                    onSelect={(selectedItem, index) => {
                      setCourse(selectedItem);
                      console.log(selectedItem, index);
                    }}
                    value={course}
                  />

                  {errors.selectedItem && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.selectedItem}</Text>
                  )}

                  {/* <UploadDocument onPress={pickImage} /> */}
                  {/* <View style={styles.uploadCon}>
                    {image && (
                      <Image source={{ uri: image }} style={styles.uploadImg} />
                    )}
                  </View> */}
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
                      onPress={() => navigation.navigate("Announcement")}
                    />
                    <SmallButton
                      onPress={handleSubmit}
                      title="Save"
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
