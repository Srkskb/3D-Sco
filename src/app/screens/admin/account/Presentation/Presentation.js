import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, Linking } from "react-native";
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

export default function Presentation() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectCourse, setSelectCourse] = useState("");
  const [fileCabinetData, setFileCabinetData] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState("");

  const allLearnerList = (id) => {
    setLoading(true);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
    };
    fetch(
      `https://3dsco.com/3discoapi/studentregistration.php?courses_presentation_listbycourses=1&course_id=${id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFileCabinetData(result?.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  const deleteEvent = async (id) => {
    // const loginUID = localStorage.getItem("loginUID");
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    var data = qs.stringify({
      delete_courses_presentation: "1",
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

    axios(config)
      .then((response) => {
        console.log(response);
        if (response.data.success == 1) {
          // allLearnerList();
          setFileCabinetData((prev) => prev.filter((item) => item.id != id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    courseId && allLearnerList(courseId);
    setTimeout(() => {
      changeColor("green");
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    courseId && allLearnerList(courseId);
    navigation.addListener("focus", () => setFileCabinetData([]));
  }, [courseId]);

  return (
    <View style={styles.container}>
      <HeaderBack title={"Presentaion"} onPress={() => navigation.goBack()} />
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
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          style={{ paddingHorizontal: 10 }}
        >
          <TextWithButton
            title={"Course Category"}
            label={"+Add"}
            onPress={() => navigation.navigate("AddPresentation")}
          />
          <SelectCourse
            label={"Select Course"}
            onSelect={(selectedItem, index) => {
              setCourseId(selectedItem.id);
              console.log(selectedItem.id);
            }}
          />
          <View style={{ paddingHorizontal: 10 }}>
            {fileCabinetData === undefined ? (
              <>
                <NoDataFound />
              </>
            ) : (
              <>
                {fileCabinetData.map((list, index) => (
                  <FileCabinet2
                    key={index}
                    title={list.assignment_title}
                    description={list.Description}
                    date={list.Date}
                    onPressView={() => {
                      Linking.openURL(list.file_name);
                    }}
                    onPressEdit={() =>
                      navigation.navigate("EditPresentation", {
                        preTitle: list.assignment_title,
                        id: list?.id,
                        description: list.Description,
                      })
                    }
                    removePress={() => deleteEvent(list.id)}
                  />
                ))}
              </>
            )}
          </View>
        </ScrollView>
      )}
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
