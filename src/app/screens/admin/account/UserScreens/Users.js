import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import color from "../../../../assets/themes/Color";
import CommonDropdown from "../../../../components/dropdown/CommonDropdown";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../../../../components/buttons/AppButton";
import Student_Card from '../../../../components/card/Student_Card';
import { FontAwesome } from "@expo/vector-icons";
import { myHeadersData } from "../../../../api/helper";
import LastLogin from "../../../../components/dropdown/admin_user/LastLogin";
import Match from "../../../../components/dropdown/admin_user/Match";
import AccountStatus from "../../../../components/dropdown/admin_user/AccountStatus";
export default function Users() {
  var userType=["Student","Tutor","Parent","Admin","Affiliate"]
  const [userList, setUserList] = useState([])
  const [type, setType] = useState('')
  const [matchwords, setmatchwords] = useState('')
  const [SearchKey, setSearchKey] = useState('')

  const filter=()=>{
    var formdata = new FormData();
  var myHeaders = myHeadersData()
formdata.append("Account_filter", "1");
formdata.append("created_by", "");
formdata.append("admin_status", "1");
formdata.append("type", type);
formdata.append("SearchKey", "");
formdata.append("cat_id", "");
formdata.append("days", "10");
formdata.append("match_word", "");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if(result.data!=null){
      setUserList(result.data)
    }
  })
  .catch(error => console.log('error', error));
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headline}>Account Status</Text>
        <AccountStatus/>
        <Text style={styles.headline}>Account Type</Text>
        <CommonDropdown data={userType} onSelect={(item,index)=>setType(index+1)}/>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.input}>
            <View
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="search" size={24} color={color.purple} />
            </View>
            <View
              style={{
                width: "78%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{
                  width: "100%",
                  fontFamily: "Montserrat-Regular",
                  fontSize: 12,
                }}
                placeholder={"Search Login Name, Email.."}
              />
            </View>
          </View>
          <View style={{ width: "38%" }}>
            <Match marginBottom={0}/>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View style={{ width: "58%" }}>
            <CommonDropdown />
          </View>
          <View style={{ width: "38%" }}>
            <LastLogin/>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Text style={styles.text}>Logged in within: </Text>
          </View>

          <View
            style={{
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              height: 50,
              borderRadius: 8,
              borderColor: color.purple,
              paddingHorizontal: 10,
              marginHorizontal: 10,
            }}
          >
            <TextInput
              style={{
                width: "100%",
                fontFamily: "Montserrat-Regular",
                fontSize: 12,
              }}
              placeholder={""}
            />
          </View>
          <View>
            <Text style={styles.text}>days</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <AppButton title={"Filter"} btnColor={color.purple} onPress={filter} />
        </View>
        <View style={{ paddingHorizontal:2 }}>
          {userList === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {userList.map((list, index) => (
                <View style={styles.boxcontainer} key={index}>
      <View style={styles.main_box}>
        <FontAwesome name="user" size={20} color="#82027D" />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.names}>{list.name}</Text>
        </View>
       
      </View>
      <View style={styles.main_box}>
        <FontAwesome name="envelope-o" size={20} color="#82027D" />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.names}>{list.Email}</Text>
        </View>
      </View>
      <View style={styles.main_box}>
        <FontAwesome name="clock-o" size={20} color="#82027D" />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.names}>{list.last_login}</Text>
        </View>
      </View>
    </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  boxcontainer: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.light_skyblue,
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
  },
  main_box: {
    flexDirection: "row",
    padding:10
  },
  names: {
    color: color.purple,
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
  headline: {
    fontFamily: "Montserrat-Bold",
    color: color.purple,
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  input: {
    width: "58%",
    borderWidth: 1,
    borderColor: color.purple,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat-Regular",
  },
  btnContainer: {
    width: "60%",
    alignSelf: "center",
    marginVertical: 20,
  },
});
