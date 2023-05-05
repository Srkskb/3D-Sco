import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { myHeadersData } from "../../../api/helper";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import Student_Card from "../../../components/card/Student_Card";
import HomeHeader from "../../../components/header/HomeHeader";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AffiliateStudent({ navigation }) {
  const [studentList, setStudentList] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = React.useState(false);
  const studentListData = () => {
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php?student_list=1&type=student", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.success == 0) {
          alert("Please Try after some time");
        } else {
          setStudentList(res.data);
          console.log("res.data", res.data);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const onRefresh = () => {
    setRefreshing(true);
    studentListData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    studentListData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader navigation={navigation} />
      <View style={styles.main_box}>
        <HeaderText title={"STUDENT'S LIST"} />
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {studentList.map((list, index) => (
            <Student_Card name={list.name} email={list?.Email} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main_box: {
    paddingHorizontal: 10,
    flex: 1,
  },
  subhead_text: {
    fontSize: 14,
    color: color.black,
    textTransform: "uppercase",
    marginBottom: 30,
    fontFamily: "Montserrat-Bold",
  },
});
