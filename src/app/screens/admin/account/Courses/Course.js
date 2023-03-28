import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import HeaderBack from "../../../../components/header/Header";
import TextWithButton from "../../../../components/TextWithButton";
import color from "../../../../assets/themes/Color";
import SearchEnroll from "../../../../components/admin_required/SearchEnroll";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import Add_Button from "../../../../components/buttons/Add_Button";
import Course_Card from "../../../../components/admin_required/Cards/CourseCard";
import axios from "axios";
import qs from "qs";
import { myHeadersData } from "../../../../api/helper";
import AccessLevel from "../../../../components/dropdown/admin_user/AccessLevel";
import Loader from "../../../../utils/Loader";
import AsyncStorage from "@react-native-community/async-storage";
import { NoDataFound } from "../../../../components";

const { width, height } = Dimensions.get("window");
export default function Course({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseKey, setCourseKey] = useState("");
  const [input, setInput] = useState("");

  const DeleteCourse = (id, userId) => {
    console.log("first", id, userId);
    var data = qs.stringify({
      delete_courses: "1",
      id: id,
      user_id: userId,
    });
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=pae8vgg24o777t60ue1clbj6d5",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("response", response.data);
        setCourses((prev) => prev.filter((item) => item.id != id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const allCourses = async (access) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    setLoading(true);
    var config = {
      method: "get",

      url: `https://3dsco.com/3discoapi/studentregistration.php?courses_filter=1&Access=${courseKey}&SearchKey=${input}&user_id=${myData.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=ksrmsjn33kam2917j4475ihmv4",
      },
    };

    axios(config)
      .then((response) => {
        if (response.data.data) {
          setCourses(response.data.data);
        } else {
          setCourses([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   courseKey&&allCourses();
  //   navigation.addListener("focus", () => allCourses());
  // }, [courseKey]);

  return (
    <View style={styles.container}>
      <HeaderBack title={"Course"} onPress={() => navigation.goBack()} />
      <View style={styles.main}>
        <TextWithButton
          title={"Courses Lists"}
          label={"Create Course"}
          onPress={() => navigation.navigate("CreateCourse")}
        />
        <View style={styles.search_course}>
          <View style={{ flex: 1 }}>
            <SearchEnroll value={input} onChangeText={(e) => setInput(e)} placeholder={"Search...."} />
          </View>
          <View style={{ width: "50%" }}>
            {/* <AccessLevel
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
            /> */}
            <AccessLevel
              label
              onSelect={(selectedItem, index) => {
                setCourseKey(selectedItem);
              }}
            />
          </View>
        </View>
        <View style={styles.filter_button}>
          <Add_Button title={"Filter"} onPress={() => allCourses()} />
        </View>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={{ paddingHorizontal: 10 }}>
          {!!courses?.length ? (
            courses.map((list, index) => (
              <Course_Card
                key={index}
                title={list.course_name}
                status={list.Access}
                educator={list.assigned_tutor}
                releaseDate={list.ReleaseDate}
                endDate={list.EndDate}
                removePress={() => DeleteCourse(list.id, list.user_id)}
                editPress={() => navigation.navigate("EditCourse", { editData: list })}
              />
            ))
          ) : (
            <NoDataFound />
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
    // paddingVertical: 10,
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
