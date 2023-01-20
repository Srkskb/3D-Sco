import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import color from "../../../../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../../components/header/Header";
import { myHeadersData } from "../../../../api/helper";
import { NoDataFound } from "../../../../components";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import FileCabinetCard from "../../../../components/card/FileCabinetCard";
import * as qs from "qs";
import axios from "axios";
import { Snackbar } from "react-native-paper";
export default function Category() {
  const navigation = useNavigation();
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
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?category_list=1`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setFileCabinetData(result.data)
      })
      .catch((error) => console.log("error", error));
  };
  const deleteEvent = (id) => {
    var data = qs.stringify({
  'delete_category': '1',
  'id': id 
});
var config = {
  method: 'post',
  url: 'https://3dsco.com/3discoapi/studentregistration.php',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'PHPSESSID=n1c8fh1ku6qq1haio8jmfnchv7'
  },
  data : data
};

axios(config)
.then((response)=>{
  if(response.data.success==1){
    allLearnerList()
  }
})
.catch((error)=>{
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
      <HeaderBack
        title={"Category"}
        onPress={() => navigation.goBack()}
      />
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ paddingHorizontal: 10 }}
      >
        <TextWithButton
          title={"Course Category"}
          label={"+Add"}
          onPress={() => navigation.navigate("AddCategory")}
        />
          <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem)
            setSelectCourse(selectedItem);
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
                <FileCabinetCard key={index}
                  title={list.Name}
                  onPressEdit={() =>
                    navigation.navigate("EditCategory", {
                      title: list,
                    })
                  }
                  removePress={() =>deleteEvent(list.id)}
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
