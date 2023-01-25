import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import CardButton from "../../../../components/buttons/CardButton";
import HeaderBack from "../../../../components/header/Header";
import { Snackbar } from "react-native-paper";
import { myHeadersData } from "../../../../api/helper";
export default function ViewMail({ route, navigation }) {
  const { msgType, msg } = route.params;
  const loginUID = localStorage.getItem("loginUID");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  var myHeaders = myHeadersData();
  // const sender = "test@gmail.com";
  // const ViewMail = () => {

  //   var formdata = new FormData();
  //   formdata.append("view_message", "1");
  //   formdata.append("id", msg.id);

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  // setSnackVisibleTrue(true);
  // setMessageTrue(result.message)
  // })
  //     .catch((error) => console.log("error", error));
  // };

  // useEffect(() => {
  //   ViewMail();
  // }, []);

  const deleteMsg = () => {
    var formdata = new FormData();
    formdata.append("delete_message", "1");
    formdata.append("id", msg.id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSnackVisibleTrue(true);
        setMessageTrue(result.message);
        navigation.goBack()
      })
      .catch((error) => console.log("error", error));
  };

  const spamMsg = () => {
    var formdata = new FormData();
    formdata.append("spam_message", "1");
    formdata.append("email_id", msg.id);
    formdata.append("user_id", loginUID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSnackVisibleTrue(true);
        setMessageTrue(result.message);
      })
      .catch((error) => console.log("error", error));
  };

  const archiveMsg = () => {
    var formdata = new FormData();
    formdata.append("achieve_message", "1");
    formdata.append("email_id", msg.id);
    formdata.append("user_id", loginUID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSnackVisibleTrue(true);
        setMessageTrue(result.message);
      })
      .catch((error) => console.log("error", error));
  };

  const deleteSpamMsg = () => {
    var formdata = new FormData();
    formdata.append("delete_spam_message", "1");
    formdata.append("id", msg.id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSnackVisibleTrue(true);
        setMessageTrue(result.message);
        navigation.goBack()
      })
      .catch((error) => console.log("error", error));
  };

  const notSpamMsg = () => {};

  const deleteArchiveMsg = () => {
    var formdata = new FormData();
    formdata.append("delete_achieve_message", "1");
    formdata.append("id", msg.id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSnackVisibleTrue(true);
        setMessageTrue(result.message);
        navigation.goBack()
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={msgType} onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={{ padding: 15 }}>
          <Text style={styles.title}>Subject : {msg.Subject}</Text>
          {msgType === "inbox" && (
            <Text style={styles.senderText}>From: {msg.SenderName}</Text>
          )}
          {msgType === "sent" && (
            <Text style={styles.senderText}>To: {msg.RecieverName}</Text>
          )}
          {msgType === "spam" && (
            <Text style={styles.senderText}>From: {msg.SenderName}</Text>
          )}
          {msgType === "archive" && (
            <Text style={styles.senderText}>From: {msg.SenderName}</Text>
          )}

          <Text style={{ fontFamily: "Montserrat-Medium" }}>
            Date: <Text>12/01/2023 01:23 PM</Text>
          </Text>
        </View>
        <View style={{ padding: 15 }}>
          <Text style={styles.description}>{msg.Message}</Text>
        </View>
      </ScrollView>
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
      >
        {getMessageTrue}
      </Snackbar>
      <View style={{ padding: 10 }}>
        {msgType === "inbox" && (
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <CardButton
              label={"Reply"}
              textColor={"green"}
              onPress={() => navigation.navigate("Reply", { msg: msg })}
            />
            <CardButton
              label={"Archive"}
              textColor={"green"}
              onPress={archiveMsg}
            />
            <CardButton
              label={"Delete"}
              borderColor={color.red}
              textColor={color.red}
              onPress={deleteMsg}
            />
            <CardButton
              label={"Spam"}
              borderColor={color.red}
              textColor={color.red}
              onPress={spamMsg}
            />
          </View>
        )}
        {msgType === "sent" && (
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <CardButton
              label={"Resend"}
              textColor={"green"}
              onPress={() => navigation.navigate("Reply")}
            />
            <CardButton
              label={"Delete"}
              borderColor={color.red}
              textColor={color.red}
              onPress={deleteMsg}
            />
          </View>
        )}
        {msgType === "spam" && (
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <CardButton
              label={"Delete"}
              borderColor={color.red}
              textColor={color.red}
              onPress={deleteSpamMsg}
            />
            <CardButton
              label={"Not Spam"}
              borderColor={color.red}
              textColor={color.red}
              onPress={notSpamMsg}
            />
          </View>
        )}
        {msgType === "archive" && (
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <CardButton label={"Unarchive"} textColor={"green"} />

            <CardButton
              label={"Delete"}
              borderColor={color.red}
              textColor={color.red}
              onPress={deleteArchiveMsg}
            />
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
  title: {
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  description: {
    fontFamily: "Montserrat-Regular",
    textAlign: "justify",
    fontSize: 14,
    color: color.black,
    marginBottom: 10,
  },
  senderText: {
    fontFamily: "Montserrat-Medium",
  },
});
