import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, Platform } from "react-native";
import color from "../../../../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../../components/header/Header";
import { myHeadersData } from "../../../../api/helper";
import { NoDataFound } from "../../../../components";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import FileCabinet2 from "../../../../components/card/FileCabinet2";
import * as qs from "qs";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { StorageAccessFramework } from "expo-file-system";
import { Snackbar } from "react-native-paper";

export default function Backup() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectCourse, setSelectCourse] = useState("Select Course");
  const [fileCabinetData, setFileCabinetData] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  console.log("fileCabinetData", fileCabinetData);
  const allLearnerList = (id) => {
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/studentregistration.php?backup_course_id=1&course_id=${id}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setFileCabinetData(result?.data);
      })
      .catch((error) => console.log("error", error));
  };
  const deleteEvent = (id) => {
    var data = qs.stringify({
      delete_backup: "1",
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
        console.log("dele for", response);
        if (response.data.success == 1) {
          // allLearnerList();
          setFileCabinetData((prev) => prev.filter((item) => item.id != id));
        }
      })
      .catch((error) => {
        console.log("error", error);
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
    navigation.addListener("focus", () => setFileCabinetData([]));
    // setFileCabinetData([]);
  }, [navigation]);

  const downloadFile = (url) => {
    console.log("url", url);
    const uri = url;
    let fileUri = FileSystem.documentDirectory + "file.zip";

    FileSystem.downloadAsync(uri, fileUri)
      .then(async (res) => {
        console.log("uri res", res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={"Backup"} onPress={() => navigation.goBack()} />
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
        <TextWithButton title={"Course Category"} label={"+Add"} onPress={() => navigation.navigate("AddBackup")} />
        <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {
            console.log(index);
            allLearnerList(index);
          }}
          value={selectCourse}
        />
        <View>
          {fileCabinetData === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {fileCabinetData?.map((list, index) => (
                <FileCabinet2
                  key={index}
                  list={list}
                  title={list.title}
                  description={list.detail}
                  onPressEdit={() =>
                    navigation.navigate("EditBackup", {
                      title: list,
                    })
                  }
                  onPressView={() => downloadFile(list.file_name)}
                  removePress={() => deleteEvent(list.id)}
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
