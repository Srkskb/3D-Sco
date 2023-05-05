import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Snackbar } from "react-native-paper";
import color from "../../../assets/themes/Color";
import Input from "../../../components/inputs/Input";
import HeaderBack from "../../../components/header/Header";
import { ScrollView } from "react-native-gesture-handler";
import SmallButton from "../../../components/buttons/SmallButton";
import UserType from "../../UserType";
import AsyncStorage from "@react-native-community/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";

export default function EducatorAddFinancial({ route, navigation }) {
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [loading, setLoading] = useState(false);

  const addFinancialAssets = async (values) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=4molrg4fbqiec2tainr98f2lo1");

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

    var formdata = new FormData();
    formdata.append("Add_financial_assistance", "1");
    formdata.append("titel", values?.title);
    formdata.append("url", values?.url);
    formdata.append("type", type);
    formdata.append("user_id", myData.id);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("EducatorFinancialAssistance");
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  return (
    <>
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
      <View style={styles.container}>
        <HeaderBack title={"Add Financial"} onPress={() => navigation.navigate("EducatorFinancialAssistance")} />

        <ScrollView style={styles.scroll_container}>
          <View style={{ paddingVertical: 10 }}>
            <Formik
              validateOnBlur={false}
              // validateOnChange={false}
              initialValues={{
                title: "",
                url: "",
              }}
              validationSchema={Yup.object().shape({
                url: Yup.string()
                  .matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    "Enter correct url!"
                  )
                  .required("Url is required"),
                title: Yup.string().required("Title is required"),
              })}
              onSubmit={(values) => addFinancialAssets(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue, resetForm }) => (
                <View>
                  <Input label={"Title"} placeholder={"Username"} name="title" onChangeText={handleChange("title")} />
                  {errors.title && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.title}</Text>}
                  <Input label={"Url"} placeholder={"http://"} name="url" onChangeText={handleChange("url")} />
                  {errors.url && <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.url}</Text>}

                  <View style={{ paddingVertical: 10, flexDirection: "row" }}>
                    <SmallButton
                      title={"Cancel"}
                      color={color.purple}
                      fontFamily={"Montserrat-Medium"}
                      onPress={() => navigation.goBack()}
                    />
                    <SmallButton
                      title={"Submit"}
                      backgroundColor={color.purple}
                      color={color.white}
                      fontFamily={"Montserrat-Bold"}
                      onPress={handleSubmit}
                      loading={loading}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
  scroll_container: {
    padding: 10,
  },
});
