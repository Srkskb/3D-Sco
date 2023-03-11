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
export default function AdminEventCalender() {
  const navigation = useNavigation();
  const [eventCalenderList, setEventCalenderList] = useState([]);
  const [deletePop, setDeletePop] = useState(false)
  const [id, setid] = useState('')
  const allLearnerList = () => {
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?view_event=1&user_id=${loginUID}`,
      requestOptions
    )
      .then((res) => res.json())

      .then((result) =>{
        console.log(result.data)
        setEventCalenderList(result.data)})

      .catch((error) => console.log("error", error));
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
      <ScrollView>
        <View style={styles.main}>
          <View style={{ flex: 1 }}>
            {eventCalenderList === undefined ? (
              <>
                <NoDataFound />
              </>
            ) : (
              <>
                {eventCalenderList.map((list, index) => (
                  <Event_Card key={index}
                    title={`${list.event_title}`}
                    day={"Mon"}
                    date={"08/10/2022"}
                    removePress={()=>{setid(list.event_id);setDeletePop(true)}}
                  />
                ))}
              </>
            )}
          </View>
        </View>
      </ScrollView>
      {deletePop? <View style={{position:'absolute',backgroundColor:'#ccccccaa',zindex:100,width:'100%',height:'100%',
    justifyContent: 'center',alignItems: 'center'}}>
      <View style={{width:'80%',backgroundColor:'#fff',padding:'6%'}}>
      <View style={styles.arrow_container}>
            <Text style={styles.head_text}>Delete Event</Text>
      </View>
      <View style={styles.text_container}>
        <Text style={styles.description_text}>Are you sure want to delete the Event?</Text>
      </View>
      <View style={styles.button_container}>
      <AppButton
            title={"cancel"}
            btnColor={color.purple}
            onPress={()=>setDeletePop(false)}
          />
          <AppButton
            title={"Send"}
            btnColor={color.purple}
            onPress={()=>console.log('first')}
          />
      </View>
      </View>
      </View>:null}
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
    width:'50%',
    flexWrap:'wrap'
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
