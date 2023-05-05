import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import { FontAwesome } from "@expo/vector-icons";
import Loader from "../../../utils/Loader";

export default function EducatorInstructorList() {
  const navigation = useNavigation();
  const [instructorListData, setInstructorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const allLearnerList = () => {
    setLoading(true);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?instructor_list=1`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setInstructorList(result.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
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
      <HeaderBack title={"Instructor's list"} onPress={() => navigation.goBack()} />
      <View style={styles.main_box}>
        <HeaderText title={"Instructor's list"} />
        {loading && <Loader />}
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {instructorListData === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {instructorListData.map((list, index) => (
                <View style={styles.mainBoxList}>
                  <FontAwesome name="user" size={20} color="#82027D" />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={styles.names}>{list.user_name}</Text>
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
