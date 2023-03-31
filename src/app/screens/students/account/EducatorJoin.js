import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import color from "../../../assets/themes/Color";
import TextWithButton from "../../../components/TextWithButton";
import CourseHeader from "../../../components/courselist/CourseHeader";
import CourseData from "../../../components/courselist/CourseData";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import AsyncStorage from "@react-native-community/async-storage";
export default function EducatorJoin() {
  const navigation = useNavigation();
  const loginUID = localStorage.getItem("loginUID"); // ! loged user type
  const [getCourseList, setCourseList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const showCourseDetail =async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=p24ghdtaoc0j53ahbsg91pvks6");
    var urlencoded = new URLSearchParams();
    urlencoded.append("user_courses_list", "1");
    urlencoded.append("user_id", myData.id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      `https://3dsco.com/3discoapi/studentregistration.php?user_courses_list=1&user_id=${myData.id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        setCourseList(res.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    showCourseDetail();
    navigation.addListener("focus", () => showCourseDetail());
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={styles.center_align}>
      <View style={styles.top_button}>
        <TextWithButton
          title={"Course Enrolled"}
          label={"Join  New Courses"}
          onPress={() => navigation.navigate("EducatorJoinNewCourse")}
        />

        <CourseHeader />
        {getCourseList ? (
          <>
            <>
              {getCourseList &&
                getCourseList.map((data, index) => (
                  <CourseData
                    course={data.Courses}
                    institute={data.subject}
                    date={data.CreatedDate}
                    onPress={() =>
                      navigation.navigate("EducatorInstituteInfo", {
                        adminID: data.user_id,
                      })
                    }
                  />
                ))}
            </>
          </>
        ) : (
          <>
            <NoDataFound />
          </>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  banner: {
    height: "20%",
    width: "100%",
  },
  picker_container: {
    paddingHorizontal: 10,
  },
  button_container: {},
  center_align: {
    flex: 1,
    justifyContent: "center",
  },
  comming_text: {
    alignSelf: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: color.purple,
  },
  top_button: {
    padding: 10,
  },
  table_header: {
    flexDirection: "row",
  },
  head: {
    flex: 1,
    borderWidth: 1,
    borderColor: color.light_skyblue,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  head_text: {
    fontFamily: "Montserrat-Medium",
  },
  button_container: {
    marginVertical: 20,
  },
});
