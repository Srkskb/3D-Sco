import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import {
  CountryDropdown,
  CityDropdown,
  StateDropdown,
  UniversityDropdown,
} from "../../../components/dropdown";

import CourseHeader from "../../../components/courselist/CourseHeader";
import CourseData from "../../../components/courselist/CourseData";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import AppButton from "../../../components/buttons/AppButton";
export default function AdminJoinNewCourse() {
  const navigation = useNavigation();
  const countryName = localStorage.getItem("countryName");
  const stateName = localStorage.getItem("stateName");
  const cityName = localStorage.getItem("cityName");
  const universityName = localStorage.getItem("universityName");
  const [getCourseList, setCourseList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const toGetCourseList = () => {
    console.log(countryName, stateName, cityName, universityName);
    const myHeaders = myHeadersData();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://3dsco.com/3discoapi/filterCourse.php?country=${countryName}&state=${stateName}&city=${cityName}&university=${universityName}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCourseList(result.data);
        console.log("result", result.data);
      })
      .catch((error) => console.log("error", error));
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Join New Course"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll_view}
      >
        <View style={styles.detail_box}>
          <Text style={styles.head_text}>Join New Course</Text>
          <CountryDropdown
            label={"Select Country"}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
          />
          <StateDropdown
            label={"Select State"}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
          />
          <CityDropdown
            label={"Select City"}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
          />

          <UniversityDropdown
            label={"Select University"}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
          />
          <View style={styles.button_container}>
            <AppButton
              btnColor={color.purple}
              onPress={toGetCourseList}
              title={"Submit"}
            />
          </View>
   
          {getCourseList  ? (
            <>
              <View style={styles.top_button}>
                <CourseHeader />
                {getCourseList && getCourseList.map((data, index) => (
                  <CourseData
                    course={data.course_name}
                    institute={data.university}
                    date={data.CreatedDate}
                    onPress={() =>
                      navigation.navigate("AdminInstituteInfo", {
                        toJoinCID: data.id,
                          adminID: data.user_id,
                      })
                    }
                  />
                ))}
              </View>
            </>
          ) : null}
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
  detail_box: {
    backgroundColor: color.gray_light,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 3,
    height: "100%",
  },
  head_text: {
    color: color.purple,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
    marginBottom: 20,
  },
  bold_text: {
    textTransform: "capitalize",
    fontFamily: "Montserrat-SemiBold",
  },
  data: {
    fontFamily: "Montserrat-Regular",
  },
  description_text: {
    fontFamily: "Montserrat-Regular",
    textAlign: "justify",
  },
  description: {
    marginTop: 20,
  },
  scroll_view: {
    margin: 10,
    backgroundColor: color.gray_light,
  },
  top_button: {
    marginTop: 20,
  },
});
