import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Snackbar } from "react-native-paper";
import color from "../../../assets/themes/Color";
import Input2 from "../../../components/inputs/Input2";
import Input from "../../../components/inputs/Input";
import HeaderBack from "../../../components/header/Header";
import { ScrollView } from "react-native-gesture-handler";
import SmallButton from "../../../components/buttons/SmallButton";
export default function ParentEditFinancial({ route, navigation }) {
  const { assisID, idParam } = route.params;
  const { assisTitle, titleParam } = route.params;
  const { assisURL, urlParam } = route.params;
  const user_id = localStorage.getItem("user_id"); // ! loged user id
  const loginUID = localStorage.getItem("loginUID"); // ! loged user type
  const [assetsTitle, setAssetsTitle] = useState(assisTitle);
  const [assetsUrl, setAssetsUrl] = useState(assisURL);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const updateFinancialAssets = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=4molrg4fbqiec2tainr98f2lo1");
    console.log(loginUID);
    var formdata = new FormData();
    formdata.append("update_financial_assistance", "1");
    formdata.append("titel", assetsTitle);
    formdata.append("url", assetsUrl);
    formdata.append("type", "1");
    formdata.append("user_id", loginUID);
    formdata.append("id", assisID);

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
          navigation.navigate("ParentFinancialAssistance");
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Update Financial"}
        onPress={() => navigation.navigate("ParentFinancialAssistance")}
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
        <View style={{ paddingVertical: 10 }}>
          <SmallButton
            title={"Submit"}
            backgroundColor={color.purple}
            color={color.white}
            fontFamily={"Montserrat-Bold"}
            onPress={updateFinancialAssets}
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
