import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../../assets/themes/Color";
import Detail from "../../../../components/view/Detail";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../../api/helper";
export default function CourseDetail() {
  const navigation = useNavigation();
  const [course, setCourse] = useState([]);
  const loginUID = localStorage.getItem("loginUID");
  const selectedCourseList = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=p24ghdtaoc0j53ahbsg91pvks6");
    var urlencoded = new URLSearchParams();
    urlencoded.append("user_courses_list", "1");
    urlencoded.append("user_id", loginUID);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/studentregistration.php?user_courses_list=1&user_id=${loginUID}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        setCourse(res.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    selectedCourseList();
    navigation.addListener("focus", () => selectedCourseList());
  }, []);
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View>
        {course &&
          course.map((list, index) => (
            <>
              <Text style={styles.course_title}>
                <Text>Course: </Text>
                <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
                  {list.Courses}
                </Text>
              </Text>
              <TouchableNativeFeedback
                onPress={() =>
                  navigation.navigate("ClassRoom", {
                    description: list.Description,
                    instituteDetails: list.institute,
                    syllabus: list.Syllabus,
                    subject: list.subject,
                    educator: list.Courses,
                    assignments: list.initial_content,
                    dueDates: list.EndDate,
                    jobSheets: list.JobSheet,
                    Announcements: list.Description,
                    presentation: list.Description,
                  })
                }
              >
                <View style={styles.class_btn}>
                  <Text style={styles.btn_text}>Enter Classroom</Text>
                </View>
              </TouchableNativeFeedback>
              <Text style={styles.enroll_status}>
                Enrollment Status is pending
              </Text>
              <View style={{ marginBottom: 10 }}>
                <Detail title={"Subject"} data={list.subject} />
                <Detail title={"Language"} data={list.Language} />
              </View>
              <View>
                <Text style={{ marginBottom: 20 }}>
                  <Text style={styles.head_text}>Description: </Text>
                  <Text
                    style={{ fontFamily: "Montserrat-Regular", fontSize: 16 }}
                  >
                    {list.Description}
                  </Text>
                </Text>
              </View>
            </>
          ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  course_title: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: color.purple,
  },
  class_btn: {
    backgroundColor: color.purple,
    width: "50%",
    padding: 10,
    marginVertical: 10,
  },
  btn_text: {
    fontFamily: "Montserrat-Bold",
    color: color.white,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  head_text: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  enroll_status: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: color.red,
  },
});
