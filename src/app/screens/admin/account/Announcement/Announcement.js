import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import color from "../../../../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../../components/header/Header";
import { myHeadersData } from "../../../../api/helper";
import { NoDataFound } from "../../../../components";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import FileCabinet2 from "../../../../components/card/FileCabinet2";
import * as qs from "qs";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import Loader from "../../../../utils/Loader";
import AsyncStorage from "@react-native-community/async-storage";
import DeletePopup from "../../../../components/popup/DeletePopup";
import FileCabinet4 from "../../../../components/card/FileCabinet4";

export default function Announcement() {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [deletePop, setDeletePop] = useState(false);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [loading, setLoading] = useState(false);
  const [selectCourse, setSelectCourse] = useState("");
  const [announcementList, setAnnouncementList] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);

  const allLearnerList = (id) => {
    console.log(id);
    const loginUID = localStorage.getItem("loginUID");
    setLoading(true);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/studentregistration.php?course_announcements_list=1&course_id=${id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        if (result?.data?.length) {
          setAnnouncementList(result?.data);
        } else {
          setAnnouncementList([]);
        }
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  const deleteEvent = async (id) => {
    setLoading(true);
    // const loginUID = localStorage.getItem("loginUID");
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    var data = qs.stringify({
      Delete_courses_Announcement: "1",
      id: id,
      user_id: myData.id,
    });
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=n1c8fh1ku6qq1haio8jmfnchv7",
      },
      data: data,
    };
    console.log("del", data);

    axios(config)
      .then((response) => {
        console.log("delete", response);
        if (response.status == 200) {
          setDeletePop(false);
          setAnnouncementList((prev) => prev.filter((item) => item.id != id));
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    // allLearnerList();
    setTimeout(() => {
      changeColor("green");
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    // allLearnerList();
    navigation.addListener("focus", () => setAnnouncementList([]));
  }, []);

  return (
    <View style={styles.container}>
      <HeaderBack title={"Announcement"} onPress={() => navigation.goBack()} />
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ paddingHorizontal: 10 }}
      >
        <TextWithButton
          title={"Course Category"}
          label={"+Add"}
          onPress={() => navigation.navigate("AddAnnouncement")}
        />
        <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {
            setSelectCourse(selectedItem);
            allLearnerList(selectedItem.id);
          }}
          value={selectCourse}
        />
        <View style={{ paddingHorizontal: 10 }}>
          {loading ? (
            <Loader />
          ) : (
            <>
              {announcementList?.length ? (
                announcementList.map((list, index) => (
                  <FileCabinet4
                    key={index}
                    title={list.announcement_title}
                    description={list.Description}
                    date={list.Date}
                    onPressEdit={() =>
                      navigation.navigate("EditAnnouncement", {
                        docTitle: list.announcement_title,
                        description: list.Description,
                        id: list.id,
                        userId: list.user_id,
                      })
                    }
                    removePress={() => {
                      setId(list.id);
                      setDeletePop(true);
                    }}
                  />
                ))
              ) : (
                <NoDataFound />
              )}
            </>
          )}
        </View>
      </ScrollView>
      {deletePop ? <DeletePopup cancelPress={() => setDeletePop(false)} deletePress={() => deleteEvent(id)} /> : null}
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
