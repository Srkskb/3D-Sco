import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import HeaderBack from "../../../components/header/Header";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import moment from "moment";
import Journal_Card from "../../../components/card/Journal_Card";
import TextWithButton from "../../../components/TextWithButton";
import AsyncStorage from "@react-native-community/async-storage";
import DeletePopup from "../../../components/popup/DeletePopup";
import Loader from "../../../utils/Loader";

export default function MyJournal() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [myJournalData, setMyJournalData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [color, changeColor] = useState("red");
  const [id, setId] = useState("");
  const [deletePop, setDeletePop] = useState(false);
  const [loading, setLoading] = useState(false);

  const allLearnerList = async () => {
    setLoading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?journals_list=1&user_id=${myData.id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setMyJournalData(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  const deleteJournal = async (id) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const loginUID = localStorage.getItem("loginUID");
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=4molrg4fbqiec2tainr98f2lo1");
    var formdata = new FormData();
    formdata.append("delete_journals", "1");
    formdata.append("user_id", myData.id);
    formdata.append("id", id);
    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success === 1) {
          setDeletePop(false);
          setSnackVisibleTrue(true);
          setMessageTrue(result.message);
          let temp = [];
          myJournalData.forEach((item) => {
            if (item.id !== id) temp.push(item);
          });
          setMyJournalData(temp);
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const onRefresh = () => {
    setRefreshing(true);
    allLearnerList();
    setTimeout(() => {
      changeColor("green");
      allLearnerList();
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    allLearnerList();
    navigation.addListener("focus", () => allLearnerList());
  }, []);
  return (
    <View style={styles.container}>
      <HeaderBack title={"My Journal"} onPress={() => navigation.goBack()} />
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
        style={{ zIndex: 1 }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
        style={{ zIndex: 1 }}
      >
        {getMessageFalse}
      </Snackbar>
      {loading && <Loader />}
      <View style={styles.main_box}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ paddingHorizontal: 10 }}
        >
          <View style={styles.book_container}>
            <TextWithButton
              title="My Journal"
              label={"+Add"}
              onPress={() => navigation.navigate("AddMyJournal")}
            />
            <View style={{ flex: 1 }}>
              {myJournalData === undefined ? (
                <>
                  <NoDataFound />
                </>
              ) : (
                <>
                  {myJournalData.map((list, index) => (
                    <Journal_Card
                      title={list.title}
                      date={moment(list && list?.date).format("LL")}
                      access={list.access_level}
                      description={list.detail}
                      viewPress={() =>
                        navigation.navigate("ViewJournal", {
                          title: list.title,
                          Date: moment(list && list?.date).format("LL"),
                          description: list.detail,
                          access: list.access_level,
                          image: list.image,
                        })
                      }
                      pressEdit={() =>
                        navigation.navigate("EditMyJournal", {
                          jID: list.id,
                          title: list.title,
                          description: list.detail,
                          jAccess: list.access_level,
                          jImage: list.image,
                        })
                      }
                      removePress={() => {
                        setId(list.id);
                        setDeletePop(true);
                      }}
                    />
                  ))}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      {deletePop ? (
        <DeletePopup
          cancelPress={() => setDeletePop(false)}
          deletePress={() => deleteJournal(id)}
        />
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main_box: {
    // paddingHorizontal: 10,
    flex: 1,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
  },
});
