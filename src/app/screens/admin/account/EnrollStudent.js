import { View, Text, StyleSheet } from "react-native";
import React, { useState,useEffect } from "react";
import HeaderBack from "../../../components/header/Header";
import TextWithButton from "../../../components/TextWithButton";
import color from "../../../assets/themes/Color";
import CommonDropdown from "../../../components/dropdown/CommonDropdown";
import AppButton from "../../../components/buttons/AppButton";
import axios from "axios";
import qs from "qs"

export default function EnrollStudent({ navigation }) {
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const getStudents=()=>{
    var requestOptions = {
  method: 'GET',
  headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'PHPSESSID=hc3kbqpelmbu5cl5em37e2j4j7'
      },
  redirect: 'follow'
};

fetch("https://3dsco.com/3discoapi/3dicowebservce.php?student_list=1&type=student", requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log(result)
    var students=result.data.map(i=>i.id)
    setStudents(students)
  })
  .catch(error => console.log('error', error));
  }

  const allCourses=()=>{

    var config = {
      method: 'post',
      url: `https://3dsco.com/3discoapi/3dicowebservce.php?Course=1`,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'PHPSESSID=r6ql44dbgph86daul5dqicpgk4'
      },
    };

axios(config)
.then((response)=>{
  console.log(JSON.stringify(response.data));
  var courses=response.data.data.map(i=>i.book_id)
  setCourses(courses)
})
.catch((error)=>{
  console.log(error);
});

  }

  useEffect(() => {
    allCourses();
    getStudents();
    navigation.addListener("focus", () => {
      allCourses()
      getStudents()
  });
  }, []);

  const enroll=()=>{
    var data = qs.stringify({
  'student_select_courses': '1',
  'course_id': '17',
  'student_id': '198' 
});
var config = {
  method: 'post',
  url: 'https://3dsco.com/3discoapi/studentregistration.php',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'PHPSESSID=3pdofu5ljq7br6tupov2ev6au1'
  },
  data : data
};

axios(config)
.then((response)=>{
  console.log(JSON.stringify(response.data));
})
.catch((error)=>{
  console.log(error);
});
  }

  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Enroll a student"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <CommonDropdown label={"Select Student"} data={students} />

        <CommonDropdown label={"Select Course"} data={courses}/>
      </View>
      <View style={styles.title_container}>
        <AppButton title={"Enroll"} btnColor={color.purple} onPress={enroll}/>
        <View style={styles.inner_view}></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main: {
    paddingHorizontal: 10,
    flex: 1,
  },
  title_text: {
    fontFamily: "Montserrat-SemiBold",
    color: color.purple,
    textDecorationLine: "underline",
  },
  title_container: {
    // flex: 1,
    padding:15
  },
  inner_view: {
    justifyContent: "center",
    alignItems: "center",
    // flex:1
  },
  no_student: {
    fontFamily: "Montserrat-Regular",
  },
});
