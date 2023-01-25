import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import color from "../../../../assets/themes/Color";
import Mail_Card from "../../../../components/card/Mail_Card";
import { myHeadersData } from "../../../../api/helper";
export default function Sent({navigation}) {
  const SentMessage=()=>{
    var myHeaders = myHeadersData();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "PHPSESSID=eps7t254jlcdutaujp8r1jaaa0");

var urlencoded = new URLSearchParams();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://3dsco.com/3discoapi/state.php?view_sent=1&Reciever_id=232", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <ScrollView style={{}}>
        <View style={{ margin: 15 }}>
          <Mail_Card
            title={"title"}
            description={
              "this is description this is description this is description this is description this is description this is descriptions"
            }
            sent
            sender={"rohit@gmail.com"}
            onPress={()=>navigation.navigate("ViewMail",{msgType:"sent"})}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
