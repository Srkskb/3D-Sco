import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../assets/themes/Color";
import View_Resume from "../../../components/card/View_Resume";
import StudentCornerCard from "../../../components/card/StudentCornerCard";
import Project_Card from "../../../components/card/Project_Card";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "./../../../api/helper";
import TextWithButton from "../../../components/TextWithButton";
import CourseHeader from "../../../components/courselist/CourseHeader";
import CourseData from "../../../components/courselist/CourseData";
import moment from "moment";
import UploadResume from "../../../components/card/UploadResume";
export default function StudentCorner() {
  const navigation = useNavigation();
  const userFName = localStorage.getItem("userFName");
  const user_id = localStorage.getItem("user_id"); // ! loged user id
  const loginUID = localStorage.getItem("loginUID"); // ! loged user type
  const [courseRoomAccess, setCourseRoomAccess] = useState([]);
  const [getCourseList, setCourseList] = useState([]);
  const [getAccomplish, setAccomplish] = useState();
  const [getObjectives, setObjectives] = useState();
  const [getPhilosophy, setPhilosophy] = useState();
  const [getSkills, setSkills] = useState();
  const [getResume, setResume] = useState();
  const [getImage, setImages] = useState();
  const showUserDetails = () => {
    console.log("loginUID", loginUID);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?profile=1&student_id=${loginUID}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAccomplish(res.Profile_Detail.accomplish);
        setObjectives(res.Profile_Detail.objectives);
        setPhilosophy(res.Profile_Detail.philosophy);
        setSkills(res.Profile_Detail.skills);
        setCourseRoomAccess(res.Projects);
        setResume(res.Profile_Detail.resume);
        setImages(res.Profile_Detail.image);
        console.log(".........", res.Profile_Detail.image);
        console.log(".........", res.Profile_Detail.resume);
      })
      .catch((error) => console.log("error", error));
  };
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
        setCourseList(res.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    selectedCourseList();
    showUserDetails();
    navigation.addListener("focus", () => selectedCourseList());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profile}>
          <Image style={styles.profile_img} source={{ uri: getImage && getImage }} />
          <Text style={styles.user_name}>{userFName}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddEditStudentCorner", {
                accomplishments: getAccomplish,
                objective: getObjectives,
                philosophy: getObjectives,
                skills: getSkills,
                userProfileImage: getImage,
                userResume: getResume,
              })
            }
          >
            <Text style={styles.edit_resume}>Edit Resume</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={styles.top_button}>
            <TextWithButton
              title={"Course Enrolled"}
              label={"Join New Courses"}
              onPress={() => navigation.navigate("JoinNewCourse")}
            />
            <CourseHeader />
            {getCourseList &&
              getCourseList.map((data, index) => (
                <CourseData
                  course={data.Courses}
                  institute={data.subject}
                  date={data.CreatedDate}
                  onPress={() =>
                    navigation.navigate("InstituteInfo", {
                      adminID: data.user_id,
                    })
                  }
                />
              ))}
          </View>

          {getResume == "https://3dsco.com/documents/no-product.jpg" ? (
            <>
              <UploadResume
                uploadPress={() =>
                  navigation.navigate("AddEditStudentCorner", {
                    accomplishments: getAccomplish,
                    objective: getObjectives,
                    philosophy: getObjectives,
                    skills: getSkills,
                    resume: getResume,
                    profileImage: getImage,
                  })
                }
              />
            </>
          ) : (
            <View_Resume />
          )}

          <StudentCornerCard
            title={"Educational Accomplishments"}
            description={getAccomplish}
          />
          <StudentCornerCard title={"Objective"} description={getObjectives} />
          <StudentCornerCard title={"Philosophy"} description={getPhilosophy} />
          <StudentCornerCard title={"Skills"} description={getSkills} />
          <View style={styles.title_box}>
            <Text style={styles.title}>Projects</Text>
            <TouchableOpacity onPress={() => navigation.navigate("MyProjects")}>
              <View style={styles.edit}>
                <Image
                  style={styles.edit_img}
                  source={require("../../../assets/images/common/edit.png")}
                />
                <Text style={styles.edit_text}>Manage</Text>
              </View>
            </TouchableOpacity>
          </View>
          {courseRoomAccess &&
            courseRoomAccess.map((list, index) => (
              <Project_Card
                title={list.Projects}
                date={moment(list && list?.Date).format("LL")}
                duration={list && list.Duration}
                description={list.Detail}
              />
            ))}
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
  profile_img: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: color.purple,
  },
  profile: {
    alignItems: "center",
    paddingVertical: 20,
  },
  user_name: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    textTransform: "uppercase",
    color: color.black,
  },
  edit_resume: {
    color: color.purple,
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
  },
  top_button: {
    marginBottom: 15,
  },
  title_box: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Montserrat-Bold",
    textTransform: "uppercase",
    fontSize: 18,
  },
  edit_img: {
    height: 20,
    width: 20,
  },
  edit: {
    flexDirection: "row",
  },
  edit_text: {
    fontFamily: "Montserrat-Regular",
  },
});
