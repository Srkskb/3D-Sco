import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import Event_Card from "../../../components/card/Event_Card";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import AsyncStorage from "@react-native-community/async-storage";
export default function CoursePresentlyEnrolled() {
  const navigation = useNavigation();
  const [courseEnrolledData, setCourseEnrolledData] = useState([]);
  const allLearnerList =async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?Course=1&id=${myData.id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => setCourseEnrolledData(result.data))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    allLearnerList();
    navigation.addListener("focus", () => allLearnerList());
  }, []);
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Course Presently Enrolled"}
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <View style={styles.main_box}>
        <HeaderText title={"Course Presently Enrolled"} />
        <ScrollView>
          <View style={styles.main}>
            <View style={{ flex: 1 }}>
              {courseEnrolledData === undefined ? (
                <>
                  <NoDataFound />
                </>
              ) : (
                <>
                  {courseEnrolledData.map((list, index) => (
                    <View style={styles.courseRoom}>
                      <Text style={styles.title}>{list.courseName}</Text>
                      <Text style={styles.Description}>{list.Description}</Text>
                      <Text style={styles.cLanguage}>
                        <Text style={styles.bold}>Language : </Text>
                        {list.Language}
                      </Text>
                      <Text style={styles.cLanguage}>
                        <Text style={styles.bold}>Copyright : </Text>
                        {list.Copyright}
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
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
  courseRoom: {
    borderWidth: 1,
    borderColor: color.light_skyblue,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  cLanguage: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  bold: {
    fontSize: 14,
    color: color.dark_gray,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  Description: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Montserrat-Normal",
    textTransform: "capitalize",
    marginBottom: 5,
  },
});
