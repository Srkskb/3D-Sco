import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import color from "../../../../assets/themes/Color";
import Mail_Card from "../../../../components/card/Mail_Card";
import { myHeadersData } from "../../../../api/helper";
export default function Inbox({navigation}) {
  const Inbox=()=>{
    var myHeaders = myHeadersData();

var formdata = new FormData();
formdata.append("message_list_one", "1");
formdata.append("RecieverID", "265");

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
  useEffect(()=>{
    Inbox()
  },[])
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <ScrollView style={{}}>
        <View style={{ margin: 15 }}>
          <Mail_Card
            title={"title"}
            description={
              "this is description this is description this is description this is description this is description this is descriptions"
            }
            inbox
            sender={"rohit@gmail.com"}
            onPress={()=>navigation.navigate("ViewMail",{msgType:"inbox"})}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
