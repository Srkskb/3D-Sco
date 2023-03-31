import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import color from "../../../../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../../components/header/Header";
import { myHeadersData } from "../../../../api/helper";
import { NoDataFound } from "../../../../components";
import TextWithButton from "../../../../components/TextWithButton";
import * as qs from "qs";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import FileCabinetCard3 from "../../../../components/card/FileCabinetCard3";
import DeletePopup from "../../../../components/popup/DeletePopup";
export default function Category() {
  const navigation = useNavigation();
  const [id, setId] = useState("");
const [deletePop, setDeletePop] = useState(false);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectCourse, setSelectCourse] = useState("");
  const [fileCabinetData, setFileCabinetData] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  const allLearnerList = () => {
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?category_list=1`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFileCabinetData(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  const deleteEvent = (id) => {
    var data = qs.stringify({
      delete_category: "1",
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
          allLearnerList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
      <HeaderBack title={"Category"} onPress={() => navigation.goBack()} />
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
        <TextWithButton title={"Course Category"} label={"+Add"} onPress={() => navigation.navigate("AddCategory")} />
        {/* <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem)
            setSelectCourse(selectedItem);
          }}
        /> */}
        <View style={{ paddingHorizontal: 10 }}>
          {fileCabinetData === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {fileCabinetData.map((list, index) => (
                <FileCabinetCard3
                  key={index}
                  title={list.Name}
                  onPressEdit={() =>
                    navigation.navigate("EditCategory", {
                      title: list,
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
