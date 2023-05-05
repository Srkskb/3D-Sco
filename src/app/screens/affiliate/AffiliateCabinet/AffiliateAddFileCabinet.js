import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, Image } from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import { AccessLevel } from "../../../components/dropdown";
import SmallButton from "../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";

import { Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { UploadDocument } from "../../../components";
import mime from "mime";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-community/async-storage";

export default function AffiliateAddFileCabinet() {
  const navigation = useNavigation();
  const [access, setAccess] = useState("");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();

  const pickImg = async (setFieldValue) => {
    console.log("first");
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    console.log(result);
    if (result.uri) {
      setFieldValue("pdf", result);
    }
  };

  const addFileCabinet = async (values) => {
    setLoading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    console.log(values);
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5");

    var urlencoded = new FormData();
    urlencoded.append("add_documents", "1");
    urlencoded.append("titel", values.docTitle);
    urlencoded.append("access", values.access);
    urlencoded.append("image", {
      uri: values?.pdf.uri,
      type: mime.getType(values?.pdf.uri),
      name: values?.pdf.name,
    });
    urlencoded.append("user_id", myData.id);
    urlencoded.append("description", values.description);

    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setLoading(false);
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("AffiliateCabinet");
        } else {
          setLoading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      })
      .catch(() => setLoading(false));
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack
        title={"Add Document"}
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
                access: "",
                pdf: "",
              }}
              validationSchema={Yup.object().shape({
                docTitle: Yup.string()
                  .required("Document Title is required")
                  .min(3, "Document Title must be at least 3 characters"),
                access: Yup.string().required("Access is required"),
                pdf: Yup.object().required("Pdf is required"),
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
                    name="docTitle"
                    onChangeText={handleChange("docTitle")}
                    // onBlur={handleBlur("docTitle")}
                    value={values.docTitle}
                    keyboardType="text"
                  />
                  {errors.docTitle && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.docTitle}</Text>
                  )}
                  <AccessLevel
                    // required
                    label={"Access Level"}
                    name="access"
                    onSelect={(selectedItem, index) => {
                      setFieldValue("access", selectedItem.name);
                      setAccess(selectedItem);
                    }}
                    value={access}
                  />
                  {errors.access && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.access}</Text>
                  )}

                  <UploadDocument name="pdf" type={"(pdf, doc, ppt,xls)"} pickImg={() => pickImg(setFieldValue)} />
                  <View>{values?.pdf?.name && <Text style={styles.uploadCon}>{values?.pdf?.name}</Text>}</View>
                  {errors.pdf && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.pdf}</Text>}
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
    textAlign: "right",
    color: "red",
  },
});
