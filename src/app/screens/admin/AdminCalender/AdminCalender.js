import React, { useEffect, useState, useReducer } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Snackbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { myHeadersData } from "../../../api/helper";
import Calender_Strip from "../../../components/Calender_Strip";
import CalendarStrip from "react-native-calendar-strip";
import color from "../../../assets/themes/Color";
import AppButton from "../../../components/buttons/Add_Button";
import { NoDataFound } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import Event_Card from "../../../components/card/Event_Card";
import HomeHeader from "../../../components/header/HomeHeader";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

export default function AdminCalender() {
  const navigation = useNavigation();
  const [eventList, setEventList] = useState([]);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [refreshEvent, setRefreshEvent] = useReducer((x) => x + 1, 0);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setmarkedDates] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDates();
    navigation.addListener("focus", () => getDates());
  }, []);

  const getDates = () => {
    let startDate = moment().format(); // today
    // let MarkedDates = [];
    // for (let i = 0; i < 7; i++) {
    //   let date = startDate.clone().add(i, "days");
    //   MarkedDates.push({
    //     date
    //   });
    // }
    // setmarkedDates(MarkedDates)
    setSelectedDate(startDate);
    // eventListData(startDate)
  };

  const eventListData = async (date) => {
    let mdate = moment(date).format("YYYY-MM-DD");
    console.log(mdate);
    setLoading(true);
    // const loginUID = localStorage.getItem("loginUID");
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?view_event=1&user_id=${myData.id}`,
      // `https://3dsco.com/3discoapi/3dicowebservce.php?view_event=1&user_id=141`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        let data = result.data.filter((i) => moment(i.event_date).isSame(date, "day"));
        console.log(data);
        setEventList(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  const deleteEvent = (event_id) => {
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?delete_event=1&event_id=${event_id}&user_id=${loginUID}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if (result.success === 1) {
          setSnackVisibleTrue(true);
          setMessageTrue(result.message);
          let temp = [];
          eventList.forEach((item) => {
            if (item.event_id !== event_id) temp.push(item);
          });
          setEventList(temp);
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    eventListData();
  }, [refreshEvent]);
  useEffect(() => {
    navigation.addListener("focus", () => eventListData());
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    eventListData();
    setRefreshEvent();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const onDateSelected = (date) => {
    // console.log(date)
    setSelectedDate(date);
    eventListData(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader navigation={navigation} />
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
        style={{ zIndex: 1 }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
        style={{ zIndex: 1 }}
      >
        {getMessageFalse}
      </Snackbar>
      {/* <Calender_Strip/> */}
      {loading ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffffcc",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : null}
      {loading ? null : (
        <CalendarStrip
          scrollable
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{ duration: 300, highlightColor: color.white }}
          style={{ height: 180 }}
          calendarHeaderStyle={{
            color: "white",
            fontSize: 15,
            marginBottom: -50,
            marginTop: 30,
          }}
          calendarColor={color.black}
          dateNumberStyle={{ color: "white", fontSize: 14 }}
          dateNameStyle={{ color: "white", fontSize: 12 }}
          iconContainer={{ flex: 0.1 }}
          //   customDatesStyles={{height:150}}
          highlightDateNameStyle={{ color: "white", fontSize: 14 }}
          highlightDateNumberStyle={{
            color: color.white,
            fontSize: 14,
            backgroundColor: color.purple,
            borderRadius: 15,
            height: 25,
            width: 25,
            padding: 1.5,
          }}
          // markedDates={markedDates}
          // datesBlacklist={this.datesBlacklistFunc}
          selectedDate={selectedDate}
          onDateSelected={(date) => onDateSelected(date)}
          // useIsoWeekday={false}
          iconStyle={{ backgroundColor: "white" }}
          dateContainerStyle={{ flex: 1 }}
        />
      )}
      <View style={styles.today_event_row}>
        <Text style={styles.event_text}>Today's Events</Text>
        <View style={styles.add_button}>
          <AppButton onPress={() => navigation.navigate("AdminAddEvent")} title="+ Add" />
        </View>
      </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {eventList && eventList.length == 0 ? (
          <>
            <NoDataFound />
          </>
        ) : (
          <>
            {eventList &&
              eventList.map((list, index) => (
                <View key={index} style={{ paddingHorizontal: 10 }}>
                  <Event_Card
                    key={index}
                    title={list.event_title}
                    status={list.access_level}
                    date={moment(list && list?.event_date).format("LL")}
                    description={list.decription}
                    editPress={() =>
                      navigation.navigate("AdminEditEvent", {
                        eventID: list.event_id,
                        title: list.event_title,
                        status: list.access_level,
                        dateData: moment(list && list?.event_date).format("LL"),
                        description: list.decription,
                      })
                    }
                    removePress={() => deleteEvent(list.event_id)}
                    viewPress={() =>
                      navigation.navigate("AdminViewEventDetails", {
                        title: list.event_title,
                        status: list.access_level,
                        Date: moment(list && list?.event_date).format("LL"),
                        description: list.decription,
                      })
                    }
                  />
                </View>
              ))}
          </>
        )}
        <View style={styles.card_padding}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    marginBottom: 10,
  },
  today_event_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  event_text: {
    fontSize: 16,
    color: color.black,
    fontFamily: "Montserrat-Medium",
  },
  card_padding: {
    paddingHorizontal: 10,
  },
});
