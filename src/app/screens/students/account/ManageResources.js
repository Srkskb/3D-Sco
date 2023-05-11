import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import TextWithButton from "../../../components/TextWithButton";
import Event_Card from "../../../components/card/Event_Card";
import { myHeadersData } from "../../../api/helper";
import * as qs from "qs";
import axios from "axios";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import DeletePopup from "../../../components/popup/DeletePopup";

export default function ManageResources({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");
  const [id, setId] = useState("");
  const [deletePop, setDeletePop] = useState(false);
  const [myResourcesData, setMyResourcesData] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = React.useState(false);
  // const loginUID = localStorage.getItem("loginUID");
  const [userId, setUserId] = useState("");
  const isFocused = useIsFocused();

  const fetchUserId = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setUserId(myData.id);
  };
  useEffect(() => {
    fetchUserId();
  }, []);
  const allLearnerList = () => {
    setRefreshing(true);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?faq=1`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        setMyResourcesData(result.data);
        console.log("data", result.data);
        setRefreshing(false);
      })
      .catch((error) => console.log("error", error));
  };
  const onRefresh = () => {
    setRefreshing(true);
    allLearnerList();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    if (isFocused) {
      allLearnerList();
    }
    allLearnerList();
  }, [isFocused]);

  const deleteFaq = async (id) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    var data = qs.stringify({
      delete_faq: "1",
      id: id,
      user_id: myData.id,
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
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success == 1) {
          setDeletePop(false);
          allLearnerList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.main}>
      <HeaderBack
        title={"Manage Resources"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TextWithButton
          label={"Post"}
          title={"Post Your Question"}
          onPress={() => navigation.navigate("AddResources")}
        />
        {myResourcesData === undefined ? (
          <>
            <NoDataFound />
          </>
        ) : (
          <>
            {myResourcesData
              .filter((item) => item.user_id == userId)
              .map((list, index) => (
                <>
                  <Event_Card
                    key={index}
                    title={list.Question}
                    description={list.Answer}
                    // date={"24/05/2023"}
                    editPress={() =>
                      navigation.navigate("EditResources", { list: list })
                    }
                    removePress={() => {
                      setId(list.id);
                      setDeletePop(true);
                    }}
                  />
                </>
              ))}
          </>
        )}
      </ScrollView>
      {deletePop ? (
        <DeletePopup
          cancelPress={() => setDeletePop(false)}
          deletePress={() => deleteFaq(id)}
        />
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  main: {
    backgroundColor: color.white,
    flex: 1,
  },
});
