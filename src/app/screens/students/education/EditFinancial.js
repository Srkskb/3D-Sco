import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import color from "../../../assets/themes/Color";
import Input2 from "../../../components/inputs/Input2";
import Input from "../../../components/inputs/Input";
import HeaderBack from "../../../components/header/Header";
import { ScrollView } from "react-native-gesture-handler";
import SmallButton from "../../../components/buttons/SmallButton";
import { Formik } from "formik";
import * as Yup from "yup";
import qs from "qs";

export default function EditFinancial({ route, navigation }) {
  const { editData } = route.params;
  const [loading, setloading] = useState(false);

  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();

  const updateFinancialAssets = async (values) => {
    setloading(true);

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=a780e1f8925e5a3d9ebcdbb058ff0885");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    // var formdata = new FormData();
    // formdata.append("update_financial_assistance", "1");
    // formdata.append("titel", values?.title);
    // formdata.append("url", values?.url);
    // // formdata.append("type", "4"); test
    // formdata.append("user_id", editData.user_id);
    // formdata.append("id", editData?.id);
    var data = qs.stringify({
      update_financial_assistance: "1",
      titel: values?.title,
      url: values?.url,
      user_id: editData.user_id,
      id: editData?.id,
    });
    console.log("data", data);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };
    console.log("formdata", data);
    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setloading(false);
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("FinancialAssistance");
        } else {
          setloading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      })
      .catch((error) => {
        setloading(false);
        console.log("error", error);
      });
  };
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Update Financial"}
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
      <ScrollView style={styles.scroll_container}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            title: editData?.Titel,
            url: editData?.url,
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
          onSubmit={(values) => updateFinancialAssets(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldValue,
            resetForm,
          }) => (
            <View>
              <Input
                label={"Title"}
                value={values?.title}
                placeholder={"Username"}
                name="title"
                onChangeText={handleChange("title")}
              />
              {errors.title && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>
                  {errors.title}
                </Text>
              )}
              <Input
                value={values?.url}
                label={"Url"}
                placeholder={"http://"}
                name="url"
                onChangeText={handleChange("url")}
              />
              {errors.url && (
                <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>
                  {errors.url}
                </Text>
              )}

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
      </ScrollView>
    </View>
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
