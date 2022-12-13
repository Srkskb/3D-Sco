import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import color from "../../../assets/themes/Color";
import Event_Card from "../../../components/card/Event_Card";
import HeaderText from "../../../components/HeaderText";
import Manage from "../../../components/Manage";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../components/header/Header";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
export default function EventCalender() {
  const navigation = useNavigation();
  const [eventCalenderList, setEventCalenderList] = useState([]);
  const allLearnerList = () => {
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?view_event=1&user_id=${loginUID}`,
      requestOptions
    )
      .then((res) => res.json())

      .then((result) => setEventCalenderList(result.data))

      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    allLearnerList();
  }, []);
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Event Calender"}
        onPress={() => navigation.navigate("Account")}
      />

      <View style={{ paddingHorizontal: 10 }}>
        <HeaderText title={"Event Calender"} />
      </View>
      <Manage title={"event lists"} />
      <ScrollView>
        <View style={styles.main}>
          <View style={{ flex: 1 }}>
            {eventCalenderList === undefined ? (
              <>
                <NoDataFound />
              </>
            ) : (
              <>
                {eventCalenderList.map((list, index) => (
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main: {
    padding: 10,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    // marginTop:20,
    alignItems: "center",
    height: 40,
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
