import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import color from "../../../../assets/themes/Color";
import Input from "../../../../components/inputs/Input";
import User from "../../../../components/dropdown/User";
import NewCheckbox from "../../../../components/NewCheckbox";
import HeaderBack from "../../../../components/header/Header";
import { AppButton } from "../../../../components/buttons";
const { height } = Dimensions.get("window");
export default function Reply({ navigation }) {
  const ReplyMail =()=>{
    var data = qs.stringify({
      'add_message_for_user': '1',
      'SenderID': '267',
      'Subject': 'test',
      'Message': 'this is a test of email function for educator.',
      'RecieverID': '265' 
    });
    var config = {
      method: 'post',
      url: 'https://3dsco.com/3discoapi/studentregistration.php',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Compose a Mail"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{ margin: 15 }}>
          <Input
            label={"Name"}
            placeholder={"Name"}
            editable={false}
            defaultValue={"Rohit Kumar"}
          />
          <Input
            label={"Email"}
            placeholder={"Email"}
            editable={false}
            defaultValue={"Rohit123@gmail.com"}
          />
          <Input label={"Subject"} placeholder={"Subject"} />
          <Input
            label={"Message"}
            placeholder={"Type Your Message"}
            numberOfLines={6}
            multiline={true}
            textAlignVertical={"top"}
          />
          <View style={{ flexDirection: "row", paddingVertical: 10 }}>
            <NewCheckbox />
            <Text style={{ fontFamily: "Montserrat-Regular", marginLeft: 10 }}>
              Save in sent items
            </Text>
          </View>
          <AppButton title={"Send"} btnColor={color.purple} />
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
});
