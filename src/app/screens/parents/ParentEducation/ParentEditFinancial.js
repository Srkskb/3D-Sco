import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import color from "../../../assets/themes/Color";
import Input2 from "../../../components/inputs/Input2";
import Input from "../../../components/inputs/Input";
import HeaderBack from "../../../components/header/Header";
import { ScrollView } from "react-native-gesture-handler";
import SmallButton from "../../../components/buttons/SmallButton";
import AsyncStorage from "@react-native-community/async-storage";

export default function ParentEditFinancial({ route, navigation }) {
  const { editData } = route.params;
  // const { assisTitle, titleParam } = route.params;
  // const { assisURL, urlParam } = route.params;
  const [loading, setloading] = useState(false);

  const user_id = localStorage.getItem("user_id"); // ! loged user id
  const loginUID = localStorage.getItem("loginUID"); // ! loged user type
  const [assetsTitle, setAssetsTitle] = useState("");
  const [assetsUrl, setAssetsUrl] = useState("");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  useEffect(() => {
    if (editData) {
      setAssetsTitle(editData?.Titel);
      setAssetsUrl(editData?.url);
    }
  }, [editData]);

  const updateFinancialAssets = async () => {
    setloading(true);
    console.log("firstssss", assetsTitle, assetsUrl);
    if (!assetsTitle || !assetsUrl) {
      console.log("dgsfhgsgj");
      return Alert.alert("Please provide correct data", "Title and Url is mandatory fields", [
        {
          text: "Cancel",
          onPress: () => {
            setloading(false);
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setloading(false);
            console.log("OK Pressed");
          },
        },
      ]);
    }
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=4molrg4fbqiec2tainr98f2lo1");

    var formdata = new FormData();
    formdata.append("update_financial_assistance", "1");
    formdata.append("titel", assetsTitle);
    formdata.append("url", assetsUrl);
    // formdata.append("type", "4"); test
    formdata.append("user_id", myData.id);
    formdata.append("id", editData?.id);

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
          setloading(false);
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("ParentFinancialAssistance");
        } else {
          setloading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <View style={styles.container}>
      <HeaderBack title={"Update Financial"} onPress={() => navigation.navigate("ParentFinancialAssistance")} />
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
        <Input
          label={"Title"}
          placeholder={"Username"}
          name="title"
          onChangeText={(text) => setAssetsTitle(text)}
          value={assetsTitle}
        />
        <Input
          label={"Url"}
          placeholder={"http://"}
          name="url"
          onChangeText={(text) => setAssetsUrl(text)}
          value={assetsUrl}
        />
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
            onPress={updateFinancialAssets}
            loading={loading}
          />
        </View>
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
