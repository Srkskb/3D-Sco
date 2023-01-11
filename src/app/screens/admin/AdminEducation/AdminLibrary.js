import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView,RefreshControl } from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import Book_Card from "../../../components/card/Book_Card";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";

export default function EducatorLibrary() {
  const navigation = useNavigation();
  const [studentLibrary, setStudentLibrary] = useState([]);
    const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = React.useState(false);
  const allLearnerList = () => {
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?student_library=1&student_id=5&course_id=6`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => setStudentLibrary(result.data))
      .catch((error) => console.log("error", error));
  };
    const onRefresh = () => {
    setRefreshing(true);
    allLearnerList();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    allLearnerList();
  }, []);
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Library"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main_box}>
        <HeaderText title={"Library"} />
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          } >
          <View style={styles.book_container}>
            {studentLibrary === undefined ? (
              <>
                <NoDataFound />
              </>
            ) : (
              <>
                {studentLibrary.map((list, index) => (
                  <Book_Card
                    title={`${list.titel}`}
                    author={`${list.author}`}
                  />
                ))}
              </>
            )}
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
