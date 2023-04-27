import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, Linking } from "react-native";
import color from "../../../../assets/themes/Color";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../../components/header/Header";
import { myHeadersData } from "../../../../api/helper";
import { NoDataFound } from "../../../../components";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import FileCabinet2 from "../../../../components/card/FileCabinet2";
import * as qs from "qs";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import DeletePopup from "../../../../components/popup/DeletePopup";
import Loader from "../../../../utils/Loader";

export default function Assignment() {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [deletePop, setDeletePop] = useState(false);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectCourse, setSelectCourse] = useState({});
  const [fileCabinetData, setFileCabinetData] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState("");

  const isFocused = useIsFocused();
  useEffect(() => {
    setSelectCourse({});
  }, [isFocused]);

  const allLearnerList = async (id) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setLoading(true);
    var data = new FormData();
    data.append("courses_assignments_list", "1");
    data.append("course_id", id);
    data.append("user_id", myData.id);

    var myHeaders = new Headers();
    // myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5'");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      // redirect: "follow",
      body: data,
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setFileCabinetData(result?.data);
        console.log(result?.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  const deleteEvent = (id) => {
    var data = qs.stringify({
      Delete_courses_assignment: "1",
      id: id,
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
        if (response.data.success == 1) {
          setDeletePop(false);
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
    // allLearnerList();
    navigation.addListener("focus", () => setFileCabinetData([]));
  }, []);
  useEffect(() => {
    courseId && allLearnerList(courseId);
  }, [courseId]);

  return (
    <View style={styles.container}>
      <HeaderBack title={"Assignment"} onPress={() => navigation.goBack()} />
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
      <View style={{ paddingHorizontal: 10 }}>
        <TextWithButton title={"Course Category"} label={"+Add"} onPress={() => navigation.navigate("AddAssignment")} />
        <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {
            // setSelectCourse(selectedItem);
            setSelectCourse(selectedItem);
            setCourseId(selectedItem.id);
          }}
          value={selectCourse}
        />
      </View>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          style={{ paddingHorizontal: 10 }}
        >
          <View>
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
                      navigation.navigate("EditAssignment", {
                        // title: list,
                        title: list.assignment_title,
                        description: list.Description,
                        id: list.id,
                        userId: list.user_id,
                        file_name: list.file_name,
                        course_id: list?.course_id,
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
        </ScrollView>
      )}
      {deletePop ? <DeletePopup cancelPress={() => setDeletePop(false)} deletePress={() => deleteEvent(id)} /> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
    textAlign: "left",
    // padding: 20,
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
