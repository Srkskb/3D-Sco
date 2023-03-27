import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import color from "../../../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../components/header/Header";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import TextWithButton from "../../../components/TextWithButton";
import SelectCourse from "../../../components/admin_required/SelectCourse";
import FileCabinet2 from "../../../components/card/FileCabinet2";
import InstructorRequestCard from "../../../components/admin_required/Cards/InstructorRequestCard";
import * as qs from "qs";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
export default function InstructorRequest() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectCourse, setSelectCourse] = useState("");
  const [fileCabinetData, setFileCabinetData] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  const allLearnerList =async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };
    // fetch(
    //   `https://3dsco.com/3discoapi/studentregistration.php?instructor_request_list=1`,
    //   requestOptions
    // )
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result)
    //     setFileCabinetData(result.data)
    //   })
    //   .catch((error) => console.log("error", error));
    var formdata = new FormData();
formdata.append("instructor_request_list", "1");
formdata.append("admin_id", myData.id);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // // setFileCabinetData(result.data)
  // .catch(error => console.log('error', error));
     .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setFileCabinetData(result.data)
      })
       .catch((error) => console.log("error", error));
  };
  const deleteEvent = (id) => {
    var myHeaders = myHeadersData();
    
    var formdata = new FormData();
    formdata.append("delete_instructor_request", "1");
    formdata.append("id", id);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
    .then((res) => res.json())
    .then((result) => {
      console.log(result)
      navigation.navigate("AdminAccount")
    })
     .catch((error) => console.log("error", error));
  };

  const Approve=(id)=>{
    var myHeaders = myHeadersData();
    
    var formdata = new FormData();
    formdata.append("instructor_request_accept", "1");
    formdata.append("tutor_id", id);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      // .then(response => response.text())
      // .then(result => console.log(result))
      // .catch(error => console.log('error', error));
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        navigation.navigate("AdminAccount")
      })
       .catch((error) => console.log("error", error));
  }
  const onRefresh = () => {
    setRefreshing(true);
    allLearnerList();
    setTimeout(() => {
      changeColor("green");
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    allLearnerList();
    navigation.addListener("focus", () => allLearnerList());
  }, []);

  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Instructor Request"}
        onPress={() => navigation.goBack()}
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ paddingHorizontal: 10 }}
      >
        <TextWithButton
          title={"Instructor Request List"}
        />
          {/* <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem)
            setSelectCourse(selectedItem);
          }}
        /> */}
        <View style={{ paddingHorizontal: 10 }}>
          {fileCabinetData === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {fileCabinetData.map((list, index) => (
                <InstructorRequestCard key={index}
                  name={list.name}
                  email={list.Email}
                  notes={list.institute}
                  university={list.University}
                  date={list.date}
                  contact={list.Contact}
                  approvePress={() =>
                    Approve(list.tutor_id)
                  }
                  denyPress={() =>deleteEvent(list.id)}
                />
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
    backgroundColor: color.white,
    flex: 1,
    textAlign: "left",
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
  },
  manage: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: color.dark_gray,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: color.black,
    textTransform: "uppercase",
  },
});
