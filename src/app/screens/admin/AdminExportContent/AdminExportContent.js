import React, { useState, useEffect } from "react";
import { View, StyleSheet,Text, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import Event_Card from "../../../components/card/Event_Card";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import AsyncStorage from "@react-native-community/async-storage";
export default function AdminExportContent() {
  const navigation = useNavigation();
  const [exportContentData, setExportContentData] = useState([]);
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
      `https://3dsco.com/3discoapi/3dicowebservce.php?student_library=1&student_id=${myData.id}&course_id=6`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => setExportContentData(result.data))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    allLearnerList();
  }, []);
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Export Content"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main_box}>
        <HeaderText title={"Export Content"} />
        <ScrollView>
         <View style={styles.main}>
          <View style={{ flex: 1 }}>
            {exportContentData === undefined ? (
              <>
                <NoDataFound />
              </>
            ) : (
              <>
                {exportContentData.map((list, index) => (
                  <Event_Card
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
