import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import InputField from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { UploadDocument } from "../../../../components";
import { myHeadersData } from "../../../../api/helper";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import mime from "mime";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-community/async-storage";
import * as DocumentPicker from "expo-document-picker";

export default function AddAssignment({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("Select Course");
  const loginUID = localStorage.getItem("loginUID");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   console.log(result);
  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };
  const pickImg = async () => {
    console.log("first");
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    if (result.uri) {
      setImage(result);
    }
  };
  const addAssignment = async (values) => {
    setLoading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    var data = new FormData();
    data.append("add_courses_assignment", "1");
    data.append("user_id", myData.id);
    data.append("course_id", values.course);
    data.append("assignment_title", values.docTitle);
    data.append("Description", values.description);
    data.append("image", {
      uri: image.uri, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(image.uri),
      name: image.name,
    });
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5");

    fetch("https://3dsco.com/3discoapi/studentregistration.php", {
      method: "POST",
      body: data,
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (res.success == 1) {
          navigation.navigate("Assignment");
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack
        title={"Add Assignment"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Formik
              initialValues={{
                docTitle: "",
                description: "",
                course: "",
              }}
              validationSchema={Yup.object().shape({
                docTitle: Yup.string()
                  .required("Document Title is required")
                  .min(3, "Document Title must be at least 3 characters")
                  .max(50, "Document Title cannot be more than 50 characters"),
                course: Yup.string().required("Course is required"),
                description: Yup.string()
                  .required("Description is required")
                  .min(20, "Description must be at least 20 characters")
                  .max(250, "Description cannot be more than 50 characters"),
              })}
              onSubmit={(values) => addAssignment(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldValue,
              }) => (
                <View>
                  <InputField
                    label={"Assignment Title"}
                    placeholder={"Assignment Title"}
                    name="docTitle"
                    onChangeText={handleChange("docTitle")}
                    onBlur={handleBlur("docTitle")}
                    value={values.docTitle}
                    keyboardType="text"
                  />
                  {errors.docTitle && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.docTitle}
                    </Text>
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
                    name="course"
                    label={"Select Course"}
                    onSelect={(selectedItem, index) => {
                      setFieldValue("course", selectedItem.id);
                    }}
                    value={values.course}
                  />

                  {errors.course && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.course}
                    </Text>
                  )}

                  <UploadDocument pickImg={pickImg} />
                  {/* <View style={styles.uploadCon}>
                    {image && <Image source={{ uri: image }} style={styles.uploadImg} />}
                  </View> */}
                  <View>
                    {image?.name && (
                      <Text style={styles.uploadCon}>{image.name}</Text>
                    )}
                  </View>

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
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.description}
                    </Text>
                  )}

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
    textAlign: "right",
    color: "red",
  },
});
