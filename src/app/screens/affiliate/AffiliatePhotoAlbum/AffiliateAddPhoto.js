import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, Image } from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import { AccessLevel } from "../../../components/dropdown";
import SmallButton from "../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { UploadDocument } from "../../../components";
import mime from "mime";
import AsyncStorage from "@react-native-community/async-storage";
export default function AffiliateAddPhoto() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [loading, setloading] = useState(false);
  const [image, setImage] = useState(null);

  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const addFileCabinet = async (values) => {
    setloading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const getHeaders = myHeadersData();
    var data = new FormData();
    data.append("add_photos", "1");
    data.append("title", values.docTitle);
    data.append("user_id", myData.id);
    data.append("detail", values.description);
    data.append("image", {
      uri: image, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(image),
      name: `abc.jpg`,
    });
    // data.append("image", image);

    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=r8i6tl7an7ibqgp4kog3aa6ro7",
        // ...data,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        if (response.data.success == 1) {
          setloading(false);
          navigation.navigate("AffiliatePhotoAlbum");
        }
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack
        title={"Add Picture"}
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
              onSubmit={(values) => addFileCabinet(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, resetForm }) => (
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

                  {errors.selectedItem && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.selectedItem}</Text>
                  )}

                  <UploadDocument type={"Image"} pickImg={pickImg} />
                  <View style={styles.uploadCon}>
                    {image && <Image source={{ uri: image }} style={styles.uploadImg} />}
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
                      onPress={() => {
                        resetForm();
                        navigation.goBack();
                      }}
                      title={"Cancel"}
                      color={color.purple}
                      fontFamily={"Montserrat-Medium"}
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
