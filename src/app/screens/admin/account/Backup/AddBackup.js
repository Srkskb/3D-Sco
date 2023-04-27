import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, Image } from "react-native";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import InputField from "../../../../components/inputs/Input";
import { AccessLevel } from "../../../../components/dropdown";
import SmallButton from "../../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../../api/helper";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { UploadDocument } from "../../../../components";
import mime from "mime";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-community/async-storage";

export default function AddBackup() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [course, setCourse] = useState({});
  // const loginUID = localStorage.getItem("loginUID");
  const [image, setImage] = useState(null);

  const pickImg = async () => {
    console.log("first");

    DocumentPicker.getDocumentAsync({
      type: "application/zip",
    })
      .then((result) => {
        if (!result.cancelled && result.size < 26214400) {
          setImage(result);
        } else {
          if (result.size > 26214400) {
            setSnackVisibleTrue(true);
            setMessageTrue("Size is larger than 25MB please upload another file");
          }
        }
      })
      .catch((err) => console.log("err", err));
  };

  const addFileCabinet = async (values) => {
    console.log("values", values);
    const data = JSON.parse(await AsyncStorage.getItem("userData"));
    setLoading(true);
    // const myHeaders = myHeadersData();

    var urlencoded = new FormData();
    urlencoded.append("add_backup", "1");
    urlencoded.append("title", values.docTitle);
    urlencoded.append("course_id", values.course);
    urlencoded.append("user_id", data.id);
    urlencoded.append("detail", values.description);
    urlencoded.append("image", {
      uri: image.uri,
      type: mime.getType(image.uri),
      name: image.name,
    });

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=8us3uou5gm35l17b3eo0lfb334");

    fetch("https://3dsco.com/3discoapi/studentregistration.php", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setLoading(false);
        console.log(res);
        if (res.success == 1) {
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("Backup");
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack
        title={"Add Backup"}
        // onPress={() => navigation.navigate("FileCabinet")}
        onPress={() => navigation.goBack()}
      />
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
      >
        {getMessageFalse}
      </Snackbar>
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
                  .min(3, "Document Title must be at least 3 characters"),
                course: Yup.string().required("course is required"),
                description: Yup.string()
                  .required("Description is required")
                  .min(20, "Description must be at least 20 characters"),
              })}
              onSubmit={(values) => addFileCabinet(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
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
                    name="course"
                    onSelect={(selectedItem, index) => {
                      setCourse(selectedItem);
                      // console.log(selectedItem, index);
                      setFieldValue("course", selectedItem.id);
                    }}
                    value={course}
                  />

                  {errors.course && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.course}</Text>
                  )}

                  <UploadDocument pickImg={pickImg} />
                  <View style={styles.uploadCon}>
                    {image?.name && (
                      <>
                        <Image
                          source={require("../../../../assets/images/account/file.png")}
                          style={styles.uploadImg}
                          resizeMode={"contain"}
                        />
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>{image?.name}</Text>
                      </>
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
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.description}</Text>
                  )}

                  <View style={styles.button}>
                    <SmallButton
                      title={"Cancel"}
                      color={color.purple}
                      fontFamily={"Montserrat-Medium"}
                      onPress={() => navigation.goBack()}
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
    flex: 1,
    backgroundColor: color.white,
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
