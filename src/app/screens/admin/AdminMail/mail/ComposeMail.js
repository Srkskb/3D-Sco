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
import Mail_Card from "../../../../components/card/Mail_Card";
import CommonDropdown from "../../../../components/dropdown/CommonDropdown";
import Input from "../../../../components/inputs/Input";
import User from "../../../../components/dropdown/User";
import NewCheckbox from "../../../../components/NewCheckbox";
import HeaderBack from "../../../../components/header/Header";
import { AppButton } from "../../../../components/buttons";
import { myHeadersData } from "../../../../api/helper";
const {height} =Dimensions.get("window")
export default function ComposeMail({ navigation }) {

  var userType=["Student","Tutor","Parent","Admin","Affiliate"]
  const [userList, setUserList] = useState([])
  const [type, setType] = useState('')
  const ComposeMail =()=>{
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
  const GetList =()=>{
    var myHeaders = myHeadersData();
myHeaders.append("Cookie", "PHPSESSID=eps7t254jlcdutaujp8r1jaaa0");

var formdata = new FormData();
formdata.append("Account_type", "1");
formdata.append("type", "1");

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
      <HeaderBack
        title={"Compose a Mail"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{ margin: 15 }}>
          <User label={"Send Email To"} onSelect={(item, index) => {}} />
          <View
            style={{
              borderRadius: 5,
              elevation: 5,
              backgroundColor: color.white,
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              paddingHorizontal: 15,
              marginBottom: 10,
            //   height:height/2
            }}
          >
            
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <NewCheckbox />
              <Text style={{ marginLeft: 10, fontFamily: "Montserrat-Medium" }}>
                User Name
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <NewCheckbox />
              <Text style={{ marginLeft: 10, fontFamily: "Montserrat-Medium" }}>
                User Name
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <NewCheckbox />
              <Text style={{ marginLeft: 10, fontFamily: "Montserrat-Medium" }}>
                User Name
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <NewCheckbox />
              <Text style={{ marginLeft: 10, fontFamily: "Montserrat-Medium" }}>
                User Name
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
                marginTop: 10,
                // backgroundColor: color.purple,
                padding: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  backgroundColor: color.purple,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <Text style={{fontFamily:'Montserrat-SemiBold',color:color.white}}>Select All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  backgroundColor: color.purple,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <Text style={{fontFamily:'Montserrat-SemiBold',color:color.white}}>Unselect All</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Input label={"Subject"} placeholder={"Subject"} />
          <Input
            label={"Message"}
            placeholder={"Type Your Message"}
            numberOfLines={6}
            multiline={true}
            textAlignVertical={"top"}
          />
          <View style={{flexDirection:'row',paddingVertical:10}}>
          <NewCheckbox/>
          <Text style={{fontFamily:'Montserrat-Regular',marginLeft:10}}>Save in sent items</Text>
          </View>
          <AppButton title={"Send"} btnColor={color.purple} 
          onPress={ComposeMail}
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
});
