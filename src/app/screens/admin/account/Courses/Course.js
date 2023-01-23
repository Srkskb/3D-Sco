import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useState,useEffect } from "react";
import HeaderBack from "../../../../components/header/Header";
import TextWithButton from "../../../../components/TextWithButton";
import color from "../../../../assets/themes/Color";
import SearchEnroll from "../../../../components/admin_required/SearchEnroll";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import Add_Button from "../../../../components/buttons/Add_Button";
import Course_Card from "../../../../components/admin_required/Cards/CourseCard";
import axios from "axios";
import { myHeadersData } from "../../../../api/helper";
import AccessLevel from "../../../../components/dropdown/admin_user/AccessLevel";

const { width, height } = Dimensions.get("window");
export default function Course({ navigation }) {
  const [courses, setCourses] = useState([])
  const DeleteCourse=()=>{
    var data = qs.stringify({
      'delete_courses': '1',
      'id': '49',
      'user_id': '232' 
    });
    var config = {
      method: 'post',
      url: 'https://3dsco.com/3discoapi/studentregistration.php',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'PHPSESSID=hc3kbqpelmbu5cl5em37e2j4j7'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  const allCourses=()=>{

var config = {
  method: 'get',
  url: 'https://3dsco.com/3discoapi/3dicowebservce.php?Course=1',
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'PHPSESSID=ksrmsjn33kam2917j4475ihmv4'
  }
};

axios(config)
.then((response)=>{
  console.log(JSON.stringify(response.data));
  setCourses(response.data.data)
})
.catch((error)=>{
  console.log(error);
});

  }
  useEffect(() => {
    allCourses();
    navigation.addListener("focus", () => allCourses());
  }, []);
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
            <SearchEnroll placeholder={"Search...."} />
          </View>
          <View style={{ width: "50%" }}>
            {/* <AccessLevel
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
            /> */}
            <AccessLevel label/>
          </View>
        </View>
        <View style={styles.filter_button}>
          <Add_Button title={"Filter"} />
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 10 }}>
      {courses === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {courses.map((list, index) => (
        <Course_Card key={index}
          title={list.Courses}
          status={list.Access}
          educator={list.assigned_tutor}
          releaseDate={list.ReleaseDate}
          endDate={list.EndDate}
          editPress={()=>navigation.navigate("EditCourse")}
        />
        ))}
            </>
          )}
      </ScrollView>
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
