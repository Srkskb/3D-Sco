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

export default function AddPresentation({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const AddPresentation = async (values) => {
    console.log(values);
    setLoading(true);
    const myHeaders = myHeadersData();
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    var data = new FormData();
    data.append("add_courses_presentation", "1");
    data.append("user_id", myData.id);
    data.append("course_id", values.course);
    data.append("presentation_title", values.preTitle);
    data.append("Description", values.description);
    data.append("image", {
      uri: image, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(image),
      name: `abc.jpg`,
    });

    fetch("https://3dsco.com/3discoapi/studentregistration.php", {
      method: "POST",
      body: data,
      headers: {
        myHeaders,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (res.success == 1) {
          navigation.navigate("Presentation");
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack title={"Add Presentation"} onPress={() => navigation.goBack()} />
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Formik
              initialValues={{
                preTitle: "",
                course: "",
                description: "",
                image: "",
              }}
              validationSchema={Yup.object().shape({
                preTitle: Yup.string()
                  .required("Presentation Title is required")
                  .min(3, "Presentation Title must be at least 3 characters"),
                course: Yup.string().required("Course is required"),
                description: Yup.string().required("Description is required"),
                // icon: Yup.string().required("Icon is required"),
              })}
              onSubmit={(values) => AddPresentation(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
                <View>
                  <InputField
                    label={"Presentation Title"}
                    placeholder={"Presentation Title"}
                    name="preTitle"
                    onChangeText={handleChange("preTitle")}
                    onBlur={handleBlur("preTitle")}
                    value={values.preTitle}
                    keyboardType="text"
                  />
                  {errors.preTitle && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.preTitle}</Text>
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
                      setFieldValue("course", selectedItem.id);
                    }}
                    value={values.course}
                  />

                  {errors.course && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.course}</Text>
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
                  <UploadDocument onPress={pickImage} />
                  <View style={styles.uploadCon}>
                    {image && <Image source={{ uri: image }} style={styles.uploadImg} />}
                  </View>
                  <View style={styles.button}>
                    <SmallButton title={"Cancel"} color={color.purple} fontFamily={"Montserrat-Medium"} />
                    <SmallButton
                      onPress={() => handleSubmit()}
                      title="Save"
                      disabled={!isValid}
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
