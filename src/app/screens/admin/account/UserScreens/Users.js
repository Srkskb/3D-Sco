import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import color from "../../../../assets/themes/Color";
import CommonDropdown from "../../../../components/dropdown/CommonDropdown";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../../../../components/buttons/AppButton";
import Student_Card from "../../../../components/card/Student_Card";
import { FontAwesome } from "@expo/vector-icons";
import { myHeadersData } from "../../../../api/helper";
import LastLogin from "../../../../components/dropdown/admin_user/LastLogin";
import Match from "../../../../components/dropdown/admin_user/Match";
import AccountStatus from "../../../../components/dropdown/admin_user/AccountStatus";
import CategoryDropdown from "../../../../components/dropdown/CategoryDropdown";

export default function Users() {
  const [loading, setloading] = useState(false);
  var userType = [
    { name: "Student", value: "student" },
    { name: "Tutor", value: "tutor" },
    { name: "Parent", value: "parent" },
    { name: "Admin", value: "admin" },
    { name: "Affiliate", value: "Affiliate" },
  ];
  const [userList, setUserList] = useState([]);
  const [type, setType] = useState("");
  const initialObj = {
    status: "1",
    days: "",
  };
  const [statusData, setStatusData] = useState(initialObj);
  const [accountType, setAccountType] = useState("");
  const [searchData, setSearchData] = useState("");
  const [category, setCategory] = useState("");

  const filter = () => {
    setloading(true);
    var formdata = new FormData();
    // var myHeaders = myHeadersData();
    formdata.append("Account_filter", "1");
    {
      statusData.day && formdata.append("days", statusData.days);
    }
    {
      statusData.status && formdata.append("admin_status", statusData.status);
    }
    // formdata.append("created_by", "");
    {
      accountType && formdata.append("type", accountType);
    }
    {
      searchData && formdata.append("SearchKey", searchData);
    }
    {
      category?.id && formdata.append("cat_id", category?.id);
    }
    // formdata.append("match_word", "");

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      // redirect: "follow",
    };
    console.log("formdata", formdata);
    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data != null) {
          setloading(false);
          setUserList(result.data);
          console.log(result.data);
          setStatusData(initialObj);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headline}>Account Status</Text>
        <AccountStatus
          onSelect={(item) => {
            setStatusData((prev) => ({ ...prev, status: item.id }));
          }}
        />
        <Text style={styles.headline}>Account Type</Text>
        <CommonDropdown
          value={userType}
          onSelect={(item, index) => {
            setAccountType(item?.value);
            console.log(item);
          }}
        />
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
                value={searchData}
                onChangeText={(text) => setSearchData(text)}
                placeholder={"Search Login Name, Email.."}
              />
            </View>
          </View>
          <View style={{ width: "38%" }}>
            <Match marginBottom={0} />
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
            <CategoryDropdown
              // label={"Category"}
              name="category"
              onSelect={(selectedItem, index) => {
                setCategory(selectedItem);
              }}
              value={category}
            />
          </View>
          <View style={{ width: "38%" }}>
            <LastLogin />
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
              keyboardType="numeric"
              placeholder={""}
              onChangeText={(text) => setStatusData((prev) => ({ ...prev, days: text }))}
            />
          </View>
          <View>
            <Text style={styles.text}>days</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <AppButton title={"Filter"} btnColor={color.purple} onPress={filter} loading={loading} />
        </View>
        <View style={{ paddingHorizontal: 2 }}>
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
    padding: 10,
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
