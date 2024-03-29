import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import { AccessLevel } from "../../../components/dropdown";
import SmallButton from "../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import AppButton from "../../../components/buttons/AppButton";
import { Snackbar } from "react-native-paper";
 import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { UploadDocument } from "../../../components";
import * as DocumentPicker from "expo-document-picker";
import mime from 'mime'
import AsyncStorage from "@react-native-community/async-storage";
export default function AddProject() {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [access, setAccess] = useState("Private");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [image, setImage] = useState(null);
  const pickImage = async (setFieldValue) => {
    console.log("first");
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    console.log(result);
    if (result.uri) {
      setFieldValue("pdf", result);
    }
  };

  const addFileCabinet =async (values) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setloading(true);
    console.log("values123",values)
    console.log(values.pTitle,access,values.pDescription,image,values.pDuration);
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5");

    var urlencoded = new FormData();
    urlencoded.append("Add_project", "1");
    urlencoded.append("titel", values.pTitle);
    urlencoded.append("user_id", myData.id);
    urlencoded.append("project_duration", values.pDuration);
    urlencoded.append("date", '20-01-2022');
    urlencoded.append("description", values.pDescription);
    urlencoded.append("image", {
      uri: values?.pdf.uri,
      type: mime.getType(values?.pdf.uri),
      name: values?.pdf.name,
    });

    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: {
        myHeaders,
        "Content-type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setloading(false);
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("MyProjects");
        } else {
          setloading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack
        title={"Add Project"}
        onPress={() => navigation.goBack()}
      />
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
        wrapperStyle={{ zIndex: 1 }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
        wrapperStyle={{ zIndex: 1 }}
      >
        {getMessageFalse}
      </Snackbar>
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingVertical:10}}>
            <Formik
              initialValues={{
                pTitle: "",
                pDescription: "",
              }}
              validationSchema={Yup.object().shape({
                pTitle: Yup.string()
                  .required("Project Title is required")
                  .min(3, "Project Title must be at least 3 characters")
                  .max(50, "Project Title cannot be more than 50 characters"),
                pDescription: Yup.string()
                  .required("Description is required")
                  .min(20, "Description must be at least 20 characters")
               
              })}
              onSubmit={(values) => addFileCabinet(values)}
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
                    label={"Project Title"}
                    placeholder={"Project Title"}
                    name="title"
                    onChangeText={handleChange("pTitle")}
                    onBlur={handleBlur("pTitle")}
                    value={values.pTitle}
                    keyboardType="text"
                  />
                  {errors.pTitle && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.pTitle}
                    </Text>
                  )}
                  <InputField
                    label={"Project Duration"}
                    placeholder={"Project Duration"}
                    name="title"
                    onChangeText={handleChange("pDuration")}
                    onBlur={handleBlur("pDuration")}
                    value={values.pDuration}
                    keyboardType="text"
                  />
                  {errors.pDuration && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.pDuration}
                    </Text>
                  )}
                 

                 <UploadDocument
                    name="pdf"
                    type={"(pdf, doc, ppt,xls)"}
                    pickImg={() => pickImage(setFieldValue)}
                  />
                  <View>
                    {values?.pdf?.name && (
                      <Text style={styles.uploadCon}>{values?.pdf?.name}</Text>
                    )}
                  </View>
                  {errors.pdf && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.pdf}
                    </Text>
                  )}
                  <InputField
                    label={"Description"}
                    placeholder={"Description"}
                    name="description"
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={handleChange("pDescription")}
                    onBlur={handleBlur("pDescription")}
                    value={values.pDescription}
                    keyboardType="default"
                    textAlignVertical='top'
                  />
                  {errors.pDescription && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.pDescription}
                    </Text>
                  )}

                  <View style={styles.button}>
                  <SmallButton
                      title={"Cancel"}
                      color={color.purple}
                      fontFamily={"Montserrat-Medium"}
                      onPress={()=>navigation.goBack()}
                    />
                    <SmallButton
                      onPress={handleSubmit}
                      title="Save"
                      disabled={!isValid}
                      color={color.white}
                      backgroundColor={color.purple}
                      fontFamily={"Montserrat-Bold"}
                      loading={loading}
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
    paddingHorizontal: 20,
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
