import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import HeaderBack from "../../../components/header/Header";
import TextWithButton from "../../../components/TextWithButton";
import color from "../../../assets/themes/Color";
import CommonDropdown from "../../../components/dropdown/CommonDropdown";
import AppButton from "../../../components/buttons/AppButton";
import axios from "axios";
import qs from "qs";
import Loader from "../../../utils/Loader";
import SelectCourse from "../../../components/admin_required/SelectCourse";

export default function EnrollStudent({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollData, setEnrollData] = useState({
    studentId: "",
    courseId: "",
  });
  const [loading, setLoading] = useState(false);

  const getStudents = () => {
    var requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=hc3kbqpelmbu5cl5em37e2j4j7",
      },
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/3dicowebservce.php?student_list=1&type=student", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStudents(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getStudents();
    navigation.addListener("focus", () => {
      getStudents();
    });
  }, []);

  const enroll = () => {
    if (enrollData.studentId == "" && enrollData.courseId == "") {
      return console.log("Please enter all fields");
    }
    setLoading(true);
    var data = qs.stringify({
      student_select_courses: "1",
      course_id: enrollData.courseId,
      student_id: enrollData.studentId,
    });
    console.log("data", data);
    // var adminFormData = new FormData();
    // adminFormData.append("student_select_courses", "1");
    // adminFormData.append("course_id", enrollData.courseId);
    // adminFormData.append("student_id", enrollData.studentId);

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      // body: adminFormData,
    };
    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        if (response.success == 1) {
          navigation.navigate("Enrollment");
        } else {
          Alert.alert(response.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={"Enroll a student"} onPress={() => navigation.goBack()} />
      <>
        <View style={styles.main}>
          <CommonDropdown
            label={"Select Student"}
            value={students}
            onSelect={(item, index) => {
              setEnrollData((prev) => ({ ...prev, studentId: item.id }));
              console.log(item);
            }}
          />

          {/* <CommonDropdown
              label={"Select Course"}
              value={courses.map((course) => ({ id: course.book_id, name: course.Courses }))}
              onSelect={(item, index) => {
                setEnrollData((prev) => ({ ...prev, courseId: item.id }));
              }}
            /> */}
          <SelectCourse
            label={"Select Course"}
            name="course"
            // value={courses.map((course) => ({ id: course.book_id, name: course.Courses }))}
            onSelect={(item, index) => {
              setEnrollData((prev) => ({ ...prev, courseId: item.id }));
              console.log(item);
            }}
            // value={course}
          />
        </View>
        <View style={styles.title_container}>
          <AppButton title={"Enroll"} btnColor={color.purple} onPress={enroll} loading={loading} />
          <View style={styles.inner_view}></View>
        </View>
      </>
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
    padding: 15,
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
