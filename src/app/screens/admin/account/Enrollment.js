import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import HeaderBack from "../../../components/header/Header";
import TextWithButton from "../../../components/TextWithButton";
import color from "../../../assets/themes/Color";
import SearchEnroll from "../../../components/admin_required/SearchEnroll";
import SelectCourse from "../../../components/admin_required/SelectCourse";
import { myHeadersData } from "../../../api/helper";
import Add_Button from "../../../components/buttons/Add_Button";
import Course_Card from "../../../components/admin_required/Cards/CourseCard";
import axios from "axios";
import qs from "qs";
import { NoDataFound } from "../../../components";
import Course_Card1 from "../../../components/admin_required/Cards/Course_Card1";
import Loader from "../../../utils/Loader";
const { width, height } = Dimensions.get("window");
export default function Enrollment({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // const DeleteCourse = () => {
  //   var data = qs.stringify({
  //     delete_courses: "1",
  //     id: "49",
  //     user_id: "232",
  //   });
  //   var config = {
  //     method: "post",
  //     url: "https://3dsco.com/3discoapi/studentregistration.php",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Cookie: "PHPSESSID=hc3kbqpelmbu5cl5em37e2j4j7",
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const allCourses = (id) => {
    setLoading(true);
    // var config = {
    //   method: "post",
    //   url: `https://3dsco.com/3discoapi/studentregistration.php?enroll_course_id=1&course_id=${id}`,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Cookie: "PHPSESSID=r6ql44dbgph86daul5dqicpgk4",
    //   },
    // };

    // axios(config)
    //   .then((response) => {
    //     setCourses(response.data?.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "Get",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/studentregistration.php?enroll_course_id=1&course_id=${id}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setCourses(result.data?.data);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
    setLoading(false);
  };
  useEffect(() => {
    allCourses();
    navigation.addListener("focus", () => allCourses());
  }, []);

  return (
    <View style={styles.container}>
      <HeaderBack title={"Enrollment"} onPress={() => navigation.goBack()} />
      <View style={styles.main}>
        <TextWithButton
          title={"Enrollment Lists"}
          label={"Enroll a Student"}
          onPress={() => navigation.navigate("EnrollStudent")}
        />
        <View style={styles.search_course}>
          <View style={{ flex: 1 }}>
            <SearchEnroll placeholder={"Search...."} />
          </View>
          <View style={{ width: "50%" }}>
            {/* <AccessLevel
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
            /> */}
            <SelectCourse
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                allCourses(index);
              }}
            />
          </View>
        </View>
        <View style={styles.filter_button}>
          <Add_Button title={"Filter"} />
        </View>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={{ paddingHorizontal: 10 }}>
          {courses === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {courses.map((list, index) => (
                <Course_Card1
                  key={index}
                  title={list.name}
                  status={list.Access}
                  educator={list.Email}
                  // releaseDate={list.ReleaseDate}
                  // endDate={list.EndDate}
                  editPress={() => navigation.navigate("EditCourse")}
                />
              ))}
            </>
          )}
        </ScrollView>
      )}
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
  },
  search_course: {
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "space-between",
    // width:'50%',
    alignItems: "center",
  },
  filter_button: {
    paddingVertical: 10,
    width: "40%",
    alignSelf: "center",
  },
  main_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: height / 2,
  },
  not_enrolled: {
    fontFamily: "Montserrat-Regular",
  },
});
