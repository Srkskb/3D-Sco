import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import moment from "moment";
import { Snackbar } from "react-native-paper";
import TextWithButton from "../../../components/TextWithButton";
import MyProjectCard from "../../../components/card/MyProjectCard";
import AsyncStorage from "@react-native-community/async-storage";
import DeletePopup from "../../../components/popup/DeletePopup";
export default function MyProjects() {
  const navigation = useNavigation();
  const [id, setId] = useState("");
const [deletePop, setDeletePop] = useState(false);
  const [courseRoomAccess, setCourseRoomAccess] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const allLearnerList =async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?Project_list=1&student_id=${myData.id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => setCourseRoomAccess(result.data))
      .then((result) => console.log(result.data))

      .catch((error) => console.log("error", error));
  };
  // Delete Project
  const deleteProject =async (id) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?Removestudent_project=1&id=${id}&user_id=${myData.id}`,
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
          courseRoomAccess.forEach((item) => {
            if (item.id !== id) temp.push(item);
          });
          setCourseRoomAccess(temp);
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
      <HeaderBack
        title={"My Projects"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main_box}>
        <TextWithButton
          title={"My Project"}
          label={"+Add"}
          onPress={() => navigation.navigate("AddProject")}
        />
        <View style={styles.main_box2}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ flex: 1 }}>
              {courseRoomAccess === undefined ? (
                <>
                  <NoDataFound />
                </>
              ) : (
                <>
                  {courseRoomAccess && courseRoomAccess.map((list, index) => (
                    <MyProjectCard
                      title={list.Titel}
                      date={moment(list && list?.Date).format("LL")}
                      duration={list && list.Duration}
                      description={list.Detail}
                      viewPress={() =>
                        navigation.navigate("ViewMyProject", {
                          title: list.Titel,
                          date: moment(list && list?.Date).format("LL"),
                          duration: list.Duration,
                          description: list.Detail,
                          image: list.image,
                        })
                      }
                      pressEdit={() =>
                        navigation.navigate("EditMyProjects", {
                          projectID:list.id,
                          title: list.Titel,
                          date: moment(list && list?.Date).format("LL"),
                          duration: list.Duration,
                          description: list.Detail,
                          pjImage: list.image,
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
        </View>
      </View>
      {deletePop ? (
        <DeletePopup
          cancelPress={() => setDeletePop(false)}
          deletePress={() => deleteProject(id)}
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
    paddingHorizontal: 10,
    flex: 1,
  },
  main_box2: {
    flex: 1,
  },
  bold: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    height: 40,
  },
});
