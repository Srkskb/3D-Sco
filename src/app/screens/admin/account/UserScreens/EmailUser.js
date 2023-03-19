import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import Headline from "../../../../components/Headline";
import CommonDropdown from "../../../../components/dropdown/CommonDropdown";
import Input2 from "../../../../components/inputs/Input2";
import color from "../../../../assets/themes/Color";
import SmallButton from "../../../../components/buttons/SmallButton";
import User from "../../../../components/dropdown/User";
import { myHeadersData } from "../../../../api/helper";
import axios from "axios";
import qs from "qs";
import Loader from "../../../../utils/Loader";

export default function EmailUser(navigation) {
  const [userType, setUserType] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const loginUID = localStorage.getItem("loginUID");

  const AddEmail = () => {
    setLoading(true);
    var data = qs.stringify({
      add_message: "1",
      SenderID: loginUID,
      Subject: subject,
      Message: body,
      Type: userType,
      save: "1",
    });
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=r6ql44dbgph86daul5dqicpgk4",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log("sjshjfdsjlf", response.data);
        if (response.data == 1) {
          setLoading(false);

          navigation.navigate("AdminAccount");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <ScrollView style={{ padding: 15 }}>
        <Text style={styles.titles}>To</Text>
        {/* <CommonDropdown 
           onSelect={(selectedItem, index) => {
            setUserType(index);
            console.log(selectedItem, index);
          }}
          value={userType}
        
        /> */}
        <User
          onSelect={(selectedItem, index) => {
            setUserType(index);
            console.log(selectedItem, index);
          }}
        />
        <Text style={styles.title}>Subject</Text>
        <Input2
          placeholder={"Enter Subject Here"}
          value={subject}
          onChangeText={(text) => {
            setSubject(text);
          }}
        />
        <Text style={styles.title}>Body</Text>
        <Input2
          placeholder={"Enter Message Here"}
          multiline={true}
          numberOfLines={8}
          textAlignVertical={"top"}
          value={body}
          onChangeText={(text) => {
            setBody(text);
          }}
        />
        <View style={styles.button}>
          <SmallButton title={"Cancel"} color={color.purple} fontFamily={"Montserrat-Medium"} />
          <SmallButton
            title="Submit"
            color={color.white}
            backgroundColor={color.purple}
            fontFamily={"Montserrat-Bold"}
            onPress={AddEmail}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    color: color.purple,
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
  },
  titles: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    color: color.purple,
    textDecorationLine: "underline",
  },
});
