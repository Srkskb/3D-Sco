import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, RefreshControl } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import { FontAwesome } from "@expo/vector-icons";
export default function AffiliateLearnerList() {
  const navigation = useNavigation();
  const [learnerListData, setLearnerList] = useState([]);
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
    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?learner_list=1&type=1`, requestOptions)
      .then((res) => res.json())

      .then((result) => {
        console.log(result.data);
        setLearnerList(result.data);
      })

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
      <HeaderBack title={"Learner's List"} onPress={() => navigation.goBack()} />
      <View style={styles.main_box}>
        <HeaderText title={"Learner's List"} />
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {learnerListData === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {learnerListData.map((list, index) => (
                <View key={index} style={styles.mainBoxList}>
                  <FontAwesome name="user" size={20} color="#82027D" />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={styles.names}>{list.name}</Text>
                  </View>
                </View>
              ))}
            </>
          )}
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
  mainBoxList: {
    borderWidth: 1,
    borderColor: color.light_skyblue,
    flexDirection: "row",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  names: {
    color: color.purple,
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: "Montserrat-Bold",
  },
  subhead_text: {
    fontSize: 14,
    color: color.black,
    textTransform: "uppercase",
    marginBottom: 30,
    fontFamily: "Montserrat-Bold",
  },
});
