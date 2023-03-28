import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import color from "../../../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../components/header/Header";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import TextWithButton from "../../../components/TextWithButton";
import FileCabinetCard from "../../../components/card/FileCabinetCard";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import DeletePopup from "../../../components/popup/DeletePopup";
export default function AffiliateCabinet() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [fileCabinetData, setFileCabinetData] = useState([]);
  const [color, changeColor] = useState("red");
  const [id, setId] = useState("");
  const [deletePop, setDeletePop] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const allLearnerList = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?student_filecabinate=1&id=${myData.id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => setFileCabinetData(result.data))
      .catch((error) => console.log("error", error));
  };
  const deleteEvent = async (id) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?delete_documents=1&id=${id}&student_id=${myData.id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success === 1) {
          setDeletePop(false);
          setSnackVisibleTrue(true);
          setMessageTrue(result.message);
          let temp = [];
          fileCabinetData.forEach((item) => {
            if (item.id !== id) temp.push(item);
          });
          setFileCabinetData(temp);
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
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    allLearnerList();
    navigation.addListener("focus", () => allLearnerList());
  }, []);

  return (
    <View style={styles.container}>
      <HeaderBack title={"File cabinet"} onPress={() => navigation.goBack()} />
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
        wrapperStyle={{ zIndex: 1 }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
        wrapperStyle={{ zIndex: 1 }}
      >
        {getMessageFalse}
      </Snackbar>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ paddingHorizontal: 10 }}
      >
        <TextWithButton
          title={"File Cabinet"}
          label={"+Add"}
          onPress={() => navigation.navigate("AffiliateAddFileCabinet")}
        />
        <View style={{ paddingHorizontal: 10 }}>
          {fileCabinetData === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {fileCabinetData.map((list, index) => (
                <FileCabinetCard
                  title={list.name}
                  access={list.access_level}
                  description={list.description}
                  onPressEdit={() =>
                    navigation.navigate("AffiliateEditFileCabinet", {
                      docId: list.id,
                      title: list.name,
                      docAccess: list.access_level,
                      description: list.description,
                      docImage: list.image,
                    })
                  }
                  removePress={() => {
                    setId(list.id);
                    setDeletePop(true);
                  }}
                  onPress={() =>
                    navigation.navigate("AffiliateViewContent", {
                      title: list.name,
                      access: list.access_level,
                      description: list.description,
                      image: list.image,
                    })
                  }
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>
      {deletePop ? (
        <DeletePopup
          cancelPress={() => setDeletePop(false)}
          deletePress={() => deleteEvent(id)}
        />
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
    textAlign: "left",
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
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
