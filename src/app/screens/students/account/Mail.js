import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import Mail_Card from "../../../components/card/Mail_Card";
import color from "../../../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../components/header/Header";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
export default function Mail() {
  const navigation = useNavigation();
  const [mailListData, setMailListData] = useState([]);
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
      `https://3dsco.com/3discoapi/3dicowebservce.php?mail=1&id=${loginUID}`,
      requestOptions
    )
      .then((res) => res.json())

      .then((result) => setMailListData(result.data))

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
      <HeaderBack title={"Your Mail"} onPress={() => navigation.goBack()}/>
      <View style={styles.head}>
        <Text style={styles.day}>Today</Text>
        <Text style={styles.clear_all}>Clear all</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.main}>
          {mailListData === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {mailListData.map((list, index) => (
                <Mail_Card
                  title={"Congratulations"}
                  description={
                    "dolor pariatur elit ut veniam do voluptate aute minim enim ea nulla dolor pariatur elit ut veniam do."
                  }
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
    flex: 1,
    backgroundColor: color.white,
  },
  main: {
    paddingHorizontal: 20,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 40,
  },
  clear_all: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
    color: color.dark_gray,
  },
  day: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: color.purple,
    textTransform: "uppercase",
  },
});
