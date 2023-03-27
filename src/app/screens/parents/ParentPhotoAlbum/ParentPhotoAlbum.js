import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import color from "../../../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../components/header/Header";
import HeaderText from "../../../components/HeaderText";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import TextWithButton from "../../../components/TextWithButton";
import FileCabinetCard from "../../../components/card/FileCabinetCard";
import axios from "axios";
import * as qs from "qs";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
export default function ParentPhotoAlbum() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [fileCabinetData, setFileCabinetData] = useState([]);
  const [color, changeColor] = useState("red");
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
    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?photo=1&id=${myData.id}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setFileCabinetData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  const deleteEvent = async (id) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const loginUID = localStorage.getItem("loginUID");
    var data = qs.stringify({
      delete_photos: "1",
      user_id: myData.id,
      id: id,
    });
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then((result) => {
        console.log(result);
        if (result.success === 1) {
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
      // fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      //       .then((res) => res.json())
      //       .then((result) => {
      //         console.log(result);
      //         if (result.success === 1) {
      //           setSnackVisibleTrue(true);
      //           setMessageTrue(result.message);
      //           let temp = [];
      //           fileCabinetData.forEach((item) => {
      //             if (item.id !== id) temp.push(item);
      //           });
      //           setFileCabinetData(temp);
      //         } else {
      //           setSnackVisibleFalse(true);
      //           setMessageFalse(result.message);
      //         }
      //       })
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
      <HeaderBack title={"Photo"} onPress={() => navigation.goBack()} />
      <HeaderText title={"Photo Album"} />
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
      >
        {getMessageFalse}
      </Snackbar>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ paddingHorizontal: 10 }}
      >
        <TextWithButton title={"Lists"} label={"+Add"} onPress={() => navigation.navigate("ParentAddPhoto")} />
        <View style={{ paddingHorizontal: 10 }}>
          {fileCabinetData === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {fileCabinetData.map((list, index) => (
                <FileCabinetCard
                  key={index}
                  title={list.title}
                  access={list.access_level}
                  description={list.description}
                  onPressEdit={() =>
                    navigation.navigate("ParentEditPhoto", {
                      docId: list.id,
                      title: list.title,
                      docAccess: list.access_level,
                      description: list.description,
                      docImage: list.file_name,
                    })
                  }
                  removePress={() => deleteEvent(list.id)}
                  onPress={() =>
                    navigation.navigate("ParentViewPhoto", {
                      title: list.title,
                      access: list.access_level,
                      description: list.description,
                      image: list.file_name,
                    })
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
