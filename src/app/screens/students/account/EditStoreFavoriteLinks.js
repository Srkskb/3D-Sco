import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, Image, TouchableOpacity } from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import SmallButton from "../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import { Snackbar } from "react-native-paper";
import { UploadDocument } from "../../../components";
import mime from "mime";
import AsyncStorage from "@react-native-community/async-storage";
import CategoryDropdown from "../../../components/dropdown/CategoryDropdown";
import { Formik } from "formik";
import * as Yup from "yup";

export default function EditStoreFavoriteLinks({ route, navigation }) {
  const { editData } = route.params;
  console.log("editData", editData);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [loading, setloading] = useState(false);
  const [image, setImage] = useState(null);
  // const [updateTitle, setUpTitle] = useState(title);
  // const [upDescription, setUpDescription] = useState(description);
  // const [upLink, setUpLink] = useState(link);
  const [category, setCategory] = useState({});

  const updateDocument = async (values) => {
    console.log("first", values);
    setloading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const type =
      myData.type == "admin"
        ? 4
        : myData.type == "tutor"
        ? 2
        : myData.type == "affiliate"
        ? 5
        : myData.type == "student"
        ? 1
        : 3;
    const myHeaders = myHeadersData();
    var urlencoded = new FormData();

    urlencoded.append("update_link", "1");
    urlencoded.append("titel", values?.linkTitle);
    urlencoded.append("category", values?.category);
    urlencoded.append("detail", values?.description);
    urlencoded.append("url", values?.url);
    urlencoded.append("type", type);
    urlencoded.append("id", editData?.id);
    urlencoded.append("user_id", myData.id);
    console.log("urlencoded", urlencoded);
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: {
        myHeaders,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setloading(false);
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("StoreFavoriteLinks");
        } else {
          setloading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      });
  };
  // ** Use Effect To get value of each and every Field
  const [showResults, setShowResults] = useState(false);
  const [showDocResults, setShowDocResults] = useState(false);

  const onClick = () => {
    setShowResults(true);
    setShowDocResults(true);
  };
  const onClickDoc = () => {
    setShowDocResults(true);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack title={"Update Link "} onPress={() => navigation.goBack()} />
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
          <Formik
            enableReinitialize
            initialValues={{
              linkTitle: editData?.Titel,
              url: editData?.url,
              category: editData?.Category_id || "",
              description: editData?.Detail,
            }}
            validationSchema={Yup.object().shape({
              linkTitle: Yup.string()
                .required("Link Title is required")
                .min(3, "Link Title must be at least 3 characters"),
              url: Yup.string().required("Url Title is required"),
              category: Yup.string().required("Category is required"),
              description: Yup.string().required("Description is required"),
            })}
            onSubmit={(values) => updateDocument(values)}
            // onSubmit={(values) => console.log("first", values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
              <View>
                <InputField
                  label={"Link Title"}
                  placeholder={"Document Title"}
                  name="linkTitle"
                  onChangeText={handleChange("linkTitle")}
                  value={values?.linkTitle}
                  keyboardType="text"
                />
                {errors.linkTitle && (
                  <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.linkTitle}</Text>
                )}
                <InputField
                  label={"URL"}
                  placeholder={"Document Title"}
                  name="url"
                  onChangeText={handleChange("url")}
                  value={values?.url}
                  keyboardType="text"
                />
                {errors.url && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.url}</Text>}
                {showResults ? (
                  <>
                    <CategoryDropdown
                      label={"Select Category"}
                      onSelect={(selectedItem, index) => {
                        setCategory(selectedItem);
                        setFieldValue("category", selectedItem?.id);
                      }}
                      value={category}
                    />
                  </>
                ) : (
                  <>
                    <View style={styles.selectedDataCon}>
                      <Text>Selected Category</Text>
                      <View style={styles.selectedData}>
                        <Text>{editData?.Category}</Text>
                        <TouchableOpacity onPress={onClick}>
                          <Text>close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}

                <InputField
                  label={"Description"}
                  placeholder={"Description"}
                  name="description"
                  multiline={true}
                  numberOfLines={6}
                  keyboardType="default"
                  textAlignVertical="top"
                  // onChangeText={(text) => setUpDescription(text)}
                  onChangeText={handleChange("description")}
                  value={values?.description}
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
                    // onPress={() => console.log("first")}
                    title="Update"
                    backgroundColor={color.purple}
                    fontFamily={"Montserrat-Bold"}
                    color={color.white}
                    loading={loading}
                  />
                </View>
              </View>
            )}
          </Formik>
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
  selectedData: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    paddingRight: 20,

    borderWidth: 2,
    borderColor: color.gray,
    borderRadius: 8,
  },
});
