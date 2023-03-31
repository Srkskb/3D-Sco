import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Detail from "../components/view/Detail";
import Headline from "../components/Headline";
import color from "../assets/themes/Color";
import HeaderBack from "../components/header/Header";
import { Edit } from "../components/buttons";
import HomeHeader from "../components/header/HomeHeader";
import { myHeadersData } from "./../api/helper";
import AsyncStorage from "@react-native-community/async-storage";

export default function ViewProfile({ navigation }) {
  const user_id = localStorage.getItem("user_id"); // ! loged user id
  const loginUID = localStorage.getItem("loginUID"); // ! loged user type

  // ! setUser data for the
  const [getName, setUpName] = useState();
  const [getEmail, setUpEmail] = useState();
  const [getGender, setUpGender] = useState();
  const [getContact, setUpContact] = useState();
  const [getCountry, setUpCountry] = useState();
  const [getAddress, setUpAddress] = useState();
  const [getUsername, setUpUsername] = useState();
  const [getUniversity, setUpUniversity] = useState();
  const [getCategory, setUpCategory] = useState();
  const [getComment, setUpComment] = useState();
  const [getOcc, setUpOcc] = useState();
  const [getEdu, setUpEdu] = useState();
  const [getLevel, setUpLevel] = useState();
  const [getDate_of_birth, setUpDate_of_birth] = useState();
  const [getZip, setUpZip] = useState();
  const [getCity_id, setUpCity_id] = useState();
  const [getState_id, setUpState_id] = useState();
  const [getUniversity_name, setUpUniversity_name] = useState();
  const [getInstitute, setUpInstitute] = useState();
  const [getSchool, setUpSchool] = useState();
  const [getCollege, setUpCollege] = useState();
  const [loading, setLoading] = useState(false);

  // ! Too show user details

  const showUserDetails = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    console.log("loginUID", myData.id);
    setLoading(true);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?profile=1&student_id=${myData.id}`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.Profile_Detail);
        setLoading(false);
        setUpName(res.Profile_Detail.name);
        setUpEmail(res.Profile_Detail.Email);
        setUpGender(res.Profile_Detail.Gender);
        setUpContact(res.Profile_Detail.Contact);
        setUpCountry(res.Profile_Detail.Country);
        setUpSchool(res.Profile_Detail.School);
        setUpAddress(res.Profile_Detail.Address);
        setUpUsername(res.Profile_Detail.Username);
        setUpUniversity(res.Profile_Detail.University);
        setUpCategory(res.Profile_Detail.category);
        setUpComment(res.Profile_Detail.comment);
        setUpOcc(res.Profile_Detail.occ);
        setUpEdu(res.Profile_Detail.edu);
        setUpLevel(res.Profile_Detail.level);
        setUpDate_of_birth(res.Profile_Detail.date_of_birth);
        setUpZip(res.Profile_Detail.zip);
        setUpCity_id(res.Profile_Detail.city);
        setUpState_id(res.Profile_Detail.state);
        setUpUniversity_name(res.Profile_Detail.university_name);
        setUpInstitute(res.Profile_Detail.institute);
        setUpCollege(res.Profile_Detail.college);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  useEffect(() => {
    showUserDetails();
  }, []);
  return (
    <View style={styles.container}>
      {/* <HeaderBack title={"User Detail"} onPress={()=>navigation.navigate("HomeScreen")}/> */}
      <HomeHeader navigation={navigation} title={"View Profile"} />
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 10 }}>
          {/* Personal Information */}
          <View style={styles.head}>
            <Headline title={"Personal Information"} />
            <Edit onPress={() => navigation.navigate("UpdateProfile")} />
          </View>
          <Detail title={"Name"} data={getName} />
          <Detail title={"Email id"} data={getEmail} />
          <Detail title={"Contact No"} data={getContact} />
          <Detail title={"Address"} data={getAddress} />
          {/* Educational Information */}
          <Headline title={"Educational Information"} />
          <Detail title={"School Name"} data={getSchool} />
          <Detail title={"College Name"} data={getCollege} />
          <Detail title={"Country"} data={getCountry} />
          <Detail title={"State"} data={getState_id} />
          <Detail title={"City"} data={getCity_id} />
          <Detail title={"University"} data={getUniversity_name} />
          {/* Login and Password */}
          <Headline title={"UserName"} />
          <Detail title={"UserName"} data={getUsername} />
          {/* Other Preferences */}
          <Headline title={"Other Preferences"} />
          {getGender == "M" ? (
            <>
              <Detail title={"Gender"} data={"Male"} />
            </>
          ) : null}

          <Detail title={"Category"} data={getCategory} />
          <Detail title={"Comments"} data={getComment} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
