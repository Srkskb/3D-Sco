import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import Input from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { UploadDocument } from "../../../../components";
import * as Yup from "yup";
import { Formik } from "formik";
import AsyncStorage from "@react-native-community/async-storage";

export default function EditPresentation({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    setEditData(route?.params);
  }, [route.params]);

  const editPresentation = async (values) => {
    console.log("values", values);
    setLoading(true);
    const myData = await AsyncStorage.getItem("userData");

    var data = new FormData();
    data.append("update_courses_presentation", "1");
    data.append("user_id", myData.id);
    data.append("presentation_title", values.preTitle);
    data.append("Description", values.description);
    data.append("course_id", values.course);
    // data.append("image", fs.createReadStream("/C:/Users/krish/Downloads/4941665926887.jpg"));
    data.append("id", values.id);

    var myHeaders = new Headers();
    // myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5");

    var config = {
      method: "POST",
      headers: myHeaders,
      body: data,
    };

    // axios(config)
    fetch("https://3dsco.com/3discoapi/studentregistration.php", config)
      .then((res) => res.json())
      .then(function (response) {
        if (response.success == 1) {
          navigation.goBack();
        } else {
          console.log("Something issue in edit announcement");
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
      <HeaderBack title={"Edit Presentation"} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <Formik
          enableReinitialize
          initialValues={{ ...editData, course: "" }}
          validationSchema={Yup.object().shape({
            preTitle: Yup.string()
              .required("Document Title is required")
              .min(3, "Document Title must be at least 3 characters"),
            description: Yup.string().required("Description is required"),
            course: Yup.string().required("Course is required"),
          })}
          onSubmit={(values) => editPresentation(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
            <View>
              <Input
                name="preTitle"
                onChangeText={handleChange("preTitle")}
                label={"Presentation Title"}
                placeholder={"Presentation Title"}
                value={values.preTitle}
              />
              {errors.preTitle && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.preTitle}</Text>
              )}
              <SelectCourse
                label={"Select Course"}
                onSelect={(selectedItem, index) => {
                  setFieldValue("course", selectedItem.id);
                }}
              />
              {errors.course && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.course}</Text>}
              <Input
                label={"Description"}
                placeholder={"Description"}
                multiline={true}
                numberOfLines={5}
                textAlignVertical={"top"}
                name="description"
                value={values.description}
                onChangeText={handleChange("description")}
              />
              {errors.description && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.description}</Text>
              )}
              <UploadDocument type={"File"} />
              <View style={styles.button}>
                <SmallButton title={"Cancel"} color={color.purple} fontFamily={"Montserrat-Medium"} />
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
