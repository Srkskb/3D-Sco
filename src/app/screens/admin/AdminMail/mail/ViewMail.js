import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import CardButton from "../../../../components/buttons/CardButton";
import HeaderBack from "../../../../components/header/Header";
import { myHeadersData } from "../../../../api/helper";
export default function ViewMail({ route, navigation }) {
  const { msgType, setMessageType } = route.params;
  const sender = "test@gmail.com";
  const ViewMail=()=>{
    var myHeaders = myHeadersData();

var formdata = new FormData();
formdata.append("view_message", "1");
formdata.append("id", "441");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }

  return (
    <View style={styles.container}>
      <HeaderBack title={msgType} onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={{ padding: 15 }}>
          <Text style={styles.title}>For Subject</Text>
          {msgType === "inbox" && (
            <Text style={styles.senderText}>From: {sender}</Text>
          )}
          {msgType === "sent" && (
            <Text style={styles.senderText}>To: {sender}</Text>
          )}
          {msgType === "spam" && (
            <Text style={styles.senderText}>From: {sender}</Text>
          )}
          {msgType === "archive" && (
            <Text style={styles.senderText}>From: {sender}</Text>
          )}

          <Text style={{ fontFamily: "Montserrat-Medium" }}>
            Date: <Text>12/01/2023 01:23 PM</Text>
          </Text>
          <Text style={styles.description}>
            Enim magna irure nostrud consequat cupidatat nulla reprehenderit
            adipisicing enim ad aliqua id. Occaecat eiusmod duis nisi occaecat
            consectetur nisi incididunt. Sunt officia aliqua enim aliqua. Quis
            nisi voluptate sint reprehenderit. Nisi ipsum amet ullamco in irure
            Lorem. Ullamco quis anim sit officia amet laboris anim ullamco
            officia mollit sint esse. Officia culpa ad ipsum mollit nulla nisi
            irure reprehenderit exercitation laboris ullamco. Mollit laborum
            deserunt velit cupidatat consequat laborum. Ex nostrud excepteur
            labore exercitation consectetur reprehenderit laboris proident et
            elit nulla non ullamco. Ad voluptate voluptate nostrud pariatur esse
            elit adipisicing amet enim nulla cillum deserunt esse ex. Ex duis
            elit qui quis in sint cupidatat deserunt commodo qui do. Tempor
            laborum est nisi qui est qui aute sit exercitation veniam est labore
            do incididunt. Elit dolore anim reprehenderit culpa cillum qui
            officia nisi est officia consequat proident. Cupidatat tempor
            cupidatat eiusmod aliquip. Sit commodo pariatur laboris ea ex anim
            irure sint. Reprehenderit sunt in ad incididunt do non cupidatat
            occaecat et. Incididunt magna id amet deserunt laboris qui sint.
          </Text>
        </View>
      </ScrollView>

      <View style={{ padding: 10 }}>
        {msgType === "inbox" && (
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <CardButton
              label={"Reply"}
              textColor={"green"}
              onPress={() => navigation.navigate("Reply")}
            />
            <CardButton label={"Archive"} textColor={"green"} />
            <CardButton
              label={"Delete"}
              borderColor={color.red}
              textColor={color.red}
            />
            <CardButton
              label={"Spam"}
              borderColor={color.red}
              textColor={color.red}
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
            />
          </View>
        )}
        {msgType === "spam" && (
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <CardButton
              label={"Delete"}
              borderColor={color.red}
              textColor={color.red}
            />
            <CardButton
              label={"Not Spam"}
              borderColor={color.red}
              textColor={color.red}
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
