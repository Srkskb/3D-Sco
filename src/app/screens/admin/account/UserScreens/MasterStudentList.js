import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, Text } from "react-native";
import color from "../../../../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../../components/header/Header";
import { myHeadersData } from "../../../../api/helper";
import { NoDataFound } from "../../../../components";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import FileCabinet2 from "../../../../components/card/FileCabinet2";
import Student_Card from "../../../../components/card/Student_Card";
import * as qs from "qs";
import axios from "axios";
import { Snackbar } from "react-native-paper";

export default function MasterStudentList() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectCourse, setSelectCourse] = useState("");
  const [fileCabinetData, setFileCabinetData] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);

  const allLearnerList = () => {
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/studentregistration.php?Master_student_list=1`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setFileCabinetData(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  const deleteEvent = (id) => {
    console.log("Enter hua main");
    // var data = qs.stringify({
    //   delete_master_student: "1",
    //   user_id: id,
    // });
    // var config = {
    //   method: "post",
    //   url: "https://3dsco.com/3discoapi/studentregistration.php",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Cookie: "PHPSESSID=n1c8fh1ku6qq1haio8jmfnchv7",
    //   },
    //   data: data,
    // };

    // axios(config)
    //   .then((response) => {
    //     if (response.data.success == 1) {
    //       allLearnerList();
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=biu0ai9dsjhq5kum8rlc4s60e7");

    var formdata = new FormData();
    formdata.append("delete_master_student", "1");
    formdata.append("user_id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success == 1) {
          allLearnerList();
        }
      })
      .catch((error) => console.log("error", error));
  };
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

      <Text title={"Master Student List"} />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ paddingHorizontal: 10 }}
      >
        <View style={{ paddingHorizontal: 10 }}>
          {fileCabinetData === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {fileCabinetData.map((list, index) => (
                <Student_Card
                  key={index}
                  name={list.name}
                  email={list.email}
                  deleteButton
                  onPress={() => deleteEvent(list.id)}
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
