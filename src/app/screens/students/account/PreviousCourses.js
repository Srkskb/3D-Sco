import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView,Text } from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import Book_Card from "../../../components/card/Book_Card";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";

export default function PreviousCourses() {
  const navigation = useNavigation();
  const [previousCoursesList, setPreviousCoursesList] = useState([]);
  const allLearnerList = () => {
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?student_library=1&student_id=5&course_id=${loginUID}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => setPreviousCoursesList(result.data))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    allLearnerList();
  }, []);
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Previous Courses"}
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <View style={styles.main_box}>
        <HeaderText title={"Previous Courses"} />
        <ScrollView>
         <View style={styles.main}>
          <View style={{ flex: 1 }}>
            {previousCoursesList === undefined ? (
              <>
                <NoDataFound />
              </>
            ) : (
              <>
                {previousCoursesList.map((list, index) => (
                  <Book_Card
                    title={`${list.event_title}`}
                    day={"Mon"}
                    date={"08/10/2022"}
                  />
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
  subhead_text: {
    fontSize: 14,
    color: color.black,
    textTransform: "uppercase",
    marginBottom: 30,
    fontFamily: "Montserrat-Bold",
  },
  book_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
