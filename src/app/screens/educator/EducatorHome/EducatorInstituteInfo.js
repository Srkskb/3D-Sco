import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Detail from "../../../components/view/Detail";
import Headline from "../../../components/Headline";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import { myHeadersData } from "../../../api/helper";
import AppButton from "../../../components/buttons/AppButton";
import { Snackbar } from "react-native-paper";
export default function EducatorInstituteInfo({ route, navigation }) {
  const { adminID, adminIDParam } = route.params;
  const { toJoinCID, toJoinCIDParam } = route.params;
  const loginUID = localStorage.getItem("loginUID");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [aDName, setaDName] = useState();
  const [aDEmail, setaDEmail] = useState();
  const [aDContact, setaDContact] = useState();
  const [aDAddress, setaDAddress] = useState();
  const [aDUniversityName, setaDUniversityName] = useState();
  const [aDCountry, setaDCountry] = useState();
  const [aDState, setaDState] = useState();
  const [aDCity, setaDCity] = useState();
  const [aDGender, setaDGender] = useState();
  const [aDComment, setaDComment] = useState();
  const showCourseDetail = () => {
    
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=eur7g88p5eku75ef68godt3ub2");

    var formdata = new FormData();
    formdata.append("select_admin_course", "1");
    formdata.append("id", adminID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setaDName(result.data[0].Name);
        setaDEmail(result.data[0].email);
        setaDContact(result.data[0].contact);
        setaDAddress(result.data[0].address);
        setaDUniversityName(result.data[0].university_name);
        setaDCountry(result.data[0].country);
        setaDState(result.data[0].state);
        setaDCity(result.data[0].city);
        setaDGender(result.data[0].gender);
        setaDComment(result.data[0].comment);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    showCourseDetail();
  }, []);

  const toJoinCourse = () => {
    console.log(toJoinCID,loginUID)
    const myHeaders = myHeadersData();
    var formdata = new FormData();
    formdata.append("student_select_courses", "1");
    formdata.append("course_id", toJoinCID);
    formdata.append("student_id", loginUID);

    var requestOptions = {
      method: "POST",
      headers: {
        myHeaders,
      },
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.replace("EducatorHome");
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Institute Information"}
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
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.personal_info}>
          <Headline title={"Personal Information"} />
          <Detail title={"Name"} data={aDName} />
          <Detail title={"Address"} data={aDAddress} />
          <Detail title={"Contact No"} data={aDContact} />
          <Detail title={"Email ID"} data={aDEmail} />
        </View>
        <View style={styles.institute_info}>
          <Headline title={"Institute Information"} />

          <Detail title={"University"} data={aDUniversityName} />
          <Detail title={"Country"} data={aDCountry} />
          <Detail title={"State"} data={aDState} />
          <Detail title={"City"} data={aDCity} />
        </View>
        <View style={styles.other_pref}>
          <Headline title={"Other Preferences"} />
        </View>

        {aDGender === "M" ? (
          <>
            <Detail title={"Gender"} data={"Male"} />
          </>
        ) : null}
        {aDGender === "F" ? (
          <>
            <Detail title={"Gender"} data={"Female"} />
          </>
        ) : null}
        <Detail title={"Comments"} data={aDComment} />
        {toJoinCID ? (
          <>
            <AppButton
              btnColor={color.purple}
              onPress={toJoinCourse}
              title={"Enroll Course"}
            />
          </>
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
