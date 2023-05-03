import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import Input from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { UploadDocument } from "../../../../components";
import mime from "mime";
import * as DocumentPicker from "expo-document-picker";
import * as Yup from "yup";
import { Formik } from "formik";

export default function EditAssignment({ navigation, route }) {
  const [loading, setloading] = useState(false);
  const { title, description, id, userId, file_name, course_id } = route?.params;
  const [initObj, setInitObj] = useState({});
  const [selectCourse, setSelectCourse] = useState({});

  const [image, setImage] = useState({
    name: file_name?.split("https://3dsco.com/images/")[1],
    uri: file_name,
  });

  useEffect(() => {
    if (route?.params) {
      setInitObj({
        docTitle: title,
        description: description,
        course: course_id,
      });
      setSelectCourse({ name: course_id, id: course_id });
    }
  }, [route]);

  const pickImg = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.uri) {
      setImage(result);
    }
  };

  const editAssignment = (value) => {
    console.log("value", value);
    setloading(true);
    var data = new FormData();
    data.append("Update_courses_assignment", "1");
    data.append("user_id", userId);
    data.append("assignment_title", value.docTitle);
    data.append("Description", value.description);
    data.append("course_id", value.course);
    data.append("id", id);
    {
      !image?.uri?.includes("https") &&
        data.append("image", {
          uri: image.uri, //"file:///" + image.split("file:/").join(""),
          type: mime.getType(image.uri),
          name: image.name,
        });
    }
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5'");
    var config = {
      method: "POST",
      headers: myHeaders,
      body: data,
    };
    console.log("data", data);
    // axios(config)
    fetch("https://3dsco.com/3discoapi/studentregistration.php", config)
      .then((res) => res.json())
      .then(function (response) {
        console.log("response", response);
        if (response.success) {
          setloading(false);
          navigation.goBack();
        } else {
          setloading(false);
          // console.log(res.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack title={"Edit Assignment"} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <Formik
          enableReinitialize
          initialValues={initObj}
          validationSchema={Yup.object().shape({
            docTitle: Yup.string()
              .required("Document Title is required")
              .min(3, "Document Title must be at least 3 characters"),
            course: Yup.string().required("Course is required"),
            description: Yup.string().required("Description is required"),
          })}
          onSubmit={(values) => editAssignment(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
            <View>
              <SelectCourse
                label={"Select Course"}
                onSelect={(selectedItem, index) => {
                  setSelectCourse(selectedItem);
                  setFieldValue("course", selectedItem.id);

                  // setData((prev) => ({ ...prev, course: selectedItem.id }));
                }}
                value={selectCourse}
              />
              {errors.course && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.course}</Text>}
              <Input
                value={values.docTitle}
                onChangeText={handleChange("docTitle")}
                // onChangeText={(text) => setData((prev) => ({ ...prev, title: text }))}
                label={"Assignment Title"}
                placeholder={"Assignment Title"}
              />
              {errors.docTitle && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.docTitle}</Text>
              )}
              <Input
                label={"Description"}
                placeholder={"Description"}
                value={values.description}
                onChangeText={handleChange("description")}
                // onChangeText={(text) => setData((prev) => ({ ...prev, description: text }))}
                multiline={true}
                numberOfLines={5}
                textAlignVertical={"top"}
              />
              {errors.description && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.description}</Text>
              )}
              <UploadDocument type={"File"} pickImg={pickImg} />
              <View>{image?.name && <Text style={styles.uploadCon}>{image.name}</Text>}</View>

              <View style={styles.button}>
                <SmallButton
                  title={"Cancel"}
                  color={color.purple}
                  fontFamily={"Montserrat-Medium"}
                  onPress={() => navigation.goBack()}
                />
                <SmallButton
                  title="Update"
                  onPress={() => handleSubmit()}
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
  uploadCon: {
    textAlign: "right",
    color: "red",
  },
});
