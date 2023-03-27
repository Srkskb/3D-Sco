import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import color from "../../../assets/themes/Color";
import Event_Card from "../../../components/card/Event_Card";
import HeaderText from "../../../components/HeaderText";
import Manage from "../../../components/Manage";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../components/header/Header";
import { myHeadersData } from "../../../api/helper";
import { AppButton } from "../../../components/buttons";
import { NoDataFound } from "../../../components";
import Loader from "../../../utils/Loader";
import AsyncStorage from "@react-native-community/async-storage";
import qs from "qs";
import DeletePopup from "../../../components/popup/DeletePopup";
export default function ParentEvent() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [eventCalenderList, setEventCalenderList] = useState([]);
  const [deletePop, setDeletePop] = useState(false);
  const [id, setId] = useState("");

  const allLearnerList = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setLoading(true);
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?view_event=1&user_id=${myData.id}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result?.data?.length) {
          setEventCalenderList(result.data);
        } else {
          setEventCalenderList([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  const handleDelete = async (id) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    var data = qs.stringify({
      delete_event: "1",
      event_id: id,
      user_id: myData.id,
    });

    var myHeaders = new Headers();
    // myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
    };
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.success == 1) {
          setEventCalenderList((prev) => prev.filter((item) => item.event_id != id));
          setId("");
          setDeletePop(false);
        } else {
          console.log("Something issue in event api");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  useEffect(() => {
    allLearnerList();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Event Calender"}
        // onPress={() => navigation.navigate("Account")}
        onPress={() => navigation.goBack()}
      />

      <View style={{ paddingHorizontal: 10 }}>
        <HeaderText title={"Event Calender"} />
      </View>
      <Manage title={"event lists"} />
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <View style={styles.main}>
            <View style={{ flex: 1 }}>
              {eventCalenderList ? (
                eventCalenderList?.map((list, index) => (
                  <Event_Card
                    key={index}
                    title={`${list.event_title}`}
                    // day={"Mon"}
                    // editPress={navigation.navigate("")}
                    date={list?.event_date}
                    removePress={() => {
                      setId(list.event_id);
                      setDeletePop(true);
                    }}
                  />
                ))
              ) : (
                <NoDataFound />
              )}
            </View>
          </View>
        </ScrollView>
      )}

      {/* // <View
        //   style={{
        //     position: "absolute",
        //     backgroundColor: "#ccccccaa",
        //     zindex: 100,
        //     width: "100%",
        //     height: "100%",
        //     justifyContent: "center",
        //     alignItems: "center",
        //   }}
        // >
        //   <View style={{ width: "80%", backgroundColor: "#fff", padding: "6%" }}>
        //     <View style={styles.arrow_container}>
        //       <Text style={styles.head_text}>Delete Event</Text>
        //     </View>
        //     <View style={styles.text_container}>
        //       <Text style={styles.description_text}>Are you sure want to delete the Event?</Text>
        //     </View>
        //     <View style={styles.button_container}>
        //       <AppButton title={"cancel"} btnColor={color.purple} onPress={() => setDeletePop(false)} />
        //       <AppButton title={"Delete"} btnColor={color.purple} onPress={() => handleDelete(id)} />
        //     </View>
        //   </View>
        // </View> */}
      {deletePop ? <DeletePopup cancelPress={() => setDeletePop(false)} deletePress={() => handleDelete(id)} /> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main: {
    padding: 10,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    // marginTop:20,
    alignItems: "center",
    height: 40,
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
  arrow_container: {
    flexDirection: "row",
    width: "50%",
    flexWrap: "wrap",
  },
  text_container: {
    // height: 38,
    width: "100%",
    // alignSelf: "flex-end",
    paddingVertical: 10,
  },
  description_text: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    width: "100%",
    textAlign: "justify",
  },
  head_text: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    width: "95%",
  },
  status_text: {
    color: color.purple,
    fontSize: 14,
    alignSelf: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  button_container: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-around",
  },
});
