import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import Book_Card from "../../../components/card/Book_Card";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import Library_Search from "../../../components/LibrarySearch";
import TextWithButton from "../../../components/TextWithButton";
import SelectCourse from "../../../components/admin_required/SelectCourse";

export default function LibraryAccess() {
  const navigation = useNavigation();
  const [studentLibrary, setStudentLibrary] = useState([]);
  const [initialStudentLibrary, setInitialStudentLibrary] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const allLearnerList = (id) => {
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?student_library=1&student_id=${loginUID}&course_id=${id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setStudentLibrary(result.data);
        setInitialStudentLibrary(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  const onRefresh = () => {
    setRefreshing(true);
    allLearnerList();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    allLearnerList();
  }, []);

  useEffect(() => {
    if (!searchTerm) return setStudentLibrary(initialStudentLibrary);
    let temp = [];
    initialStudentLibrary.forEach((item) => {
      if (item.titel.toLowerCase().includes(searchTerm.toLowerCase()))
        temp.push(item);
    });

    setStudentLibrary(temp);
  }, [searchTerm]);
  return (
    <View style={styles.container}>
      <HeaderBack title={"Library"} onPress={() => navigation.goBack()} />
      <View style={styles.main_box}>
        {/* <HeaderText title={"Library Access"} /> */}
        {/* <TextInput
          onChangeText={setSearchTerm}
          value={searchTerm}
          style={styles.search_text}
          
        /> */}
        <TextWithButton
          title={"Library Access"}
          label={"Manage Library"}
          onPress={() => navigation.navigate("AdminManageLibrary")}
        />
        <View style={styles.search_box}>
          <View style={styles.icon_box}>
            <Image
              style={styles.icon}
              source={require("../../../assets/images/Search.png")}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              style={styles.text_input}
              onChangeText={setSearchTerm}
              value={searchTerm}
              placeholder={"Search title, author..."}
            />
          </View>
          <TouchableOpacity style={styles.search_button}>
            <View>
              <Text style={styles.search_text}>SEARCH</Text>
            </View>
          </TouchableOpacity>
        </View>
        <SelectCourse
          // label={"Select Course"}
          onSelect={(selectedItem, index) => {
            console.log(index);
            allLearnerList(index);
          }}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.book_container}>
            {studentLibrary === undefined ? (
              <>
                <NoDataFound />
              </>
            ) : (
              <>
                {studentLibrary.map((list) => (
                  <Book_Card title={list.titel} author={list.author} onPress={()=>navigation.navigate("ViewBook")}/>
                ))}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main_box: {
    paddingHorizontal: 10,
    flex: 1,
  },
  subhead_text: {
    fontSize: 14,
    color: color.black,
    textTransform: "uppercase",
    marginBottom: 30,
    fontFamily: "Montserrat-Bold",
  },
  book_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  search_box: {
    borderWidth: 1,
    borderColor: color.purple,
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: 20,
    height: 40,
  },
  text_input: {
    fontFamily: "Montserrat-Regular",
    padding: 5,
    flex: 3,
    flexDirection: "row",
    width: "100%",
  },
  search_button: {
    backgroundColor: color.purple,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  input: {
    width: "60%",
  },
  search_text: {
    fontFamily: "Montserrat-Bold",
    color: color.white,
    fontSize: 12,
  },
  icon: {
    height: 25,
    width: 25,
    justifyContent: "center",
  },
  icon_box: { width: "10%", justifyContent: "center", alignItems: "center" },
});
