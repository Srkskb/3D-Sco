import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import { AccessLevel, CategoryDropdown } from "../../../components/dropdown";
import SmallButton from "../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import AppButton from "../../../components/buttons/AppButton";
import { Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-community/async-storage";
export default function AddLink() {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [access, setAccess] = useState("Private");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [category, setCategory] = useState();
   const user_type = localStorage.getItem("userID"); // ! user Type student or other
  const urlValidation =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
  const addLinkForm =async (values) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setloading(true);
    console.log('category',category);
    const myHeaders = myHeadersData();
    var urlencoded = new FormData();
    urlencoded.append("Add_link", "1");
    urlencoded.append("titel", values.linkTitle);
    urlencoded.append("category", category);
    urlencoded.append("detail", values.description);
    urlencoded.append("url", values.linkUrl);
    urlencoded.append("type", user_type); // ! User Type 
    urlencoded.append("id", myData.id);
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: {
        myHeaders,
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
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack
        title={"Suggest Link"}
        onPress={() => navigation.navigate("StoreFavoriteLinks")}
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
          <View style={{paddingVertical:10}}>
            <Formik
              initialValues={{
                linkTitle: "",

                description: "",
                linkUrl: "",
              }}
              validationSchema={Yup.object().shape({
                linkTitle: Yup.string()
                  .required("Title is required")
                  .min(3, "Title must be at least 3 characters"),
                 

                description: Yup.string()
                  .required("Description is required")
                  .min(20, "Description must be at least 20 characters"),
            
                linkUrl: Yup.string()
                  .matches(urlValidation, "Enter correct url!")
                  .required("Url is required"),
              })}
              onSubmit={(values) => addLinkForm(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <View>
                  <InputField
                    label={"Link Title"}
                    placeholder={"Link Title"}
                    name="linkTitle"
                    onChangeText={handleChange("linkTitle")}
                    onBlur={handleBlur("linkTitle")}
                    value={values.blogTitle}
                    keyboardType="text"
                  />
                  {errors.linkTitle && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.linkTitle}
                    </Text>
                  )}

                  <CategoryDropdown
                    label={"Category"}
                    onSelect={(selectedItem, index) => {
                      setCategory(index + 1);
                      console.log(index + 1)
                    }}
                  />

                  <InputField
                    label={"Url"}
                    placeholder={"Url"}
                    name="linkUrl"
                    onChangeText={handleChange("linkUrl")}
                    onBlur={handleBlur("linkUrl")}
                    value={values.linkUrl}
                    keyboardType="text"
                  />
                  {errors.linkUrl && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.linkUrl}
                    </Text>
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
                    textAlignVertical='top'
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
  selectDate: {
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
    color: color.black,
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: color.purple,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#DADADA",
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
