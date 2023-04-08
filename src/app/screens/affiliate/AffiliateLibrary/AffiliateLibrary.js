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
  Linking,
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
import AsyncStorage from "@react-native-community/async-storage";
import Loader from "../../../utils/Loader";

export default function AffiliateLibrary() {
  const navigation = useNavigation();
  const [studentLibrary, setStudentLibrary] = useState([]);
  const [initialStudentLibrary, setInitialStudentLibrary] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);

  const allLearnerList = async (id) => {
    setLoading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php?library_list=1", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setStudentLibrary(result.data);
          setInitialStudentLibrary(result.data);
        } else {
          setStudentLibrary([]);
          setInitialStudentLibrary([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
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
      if (item.titel.toLowerCase().includes(searchTerm.toLowerCase())) temp.push(item);
    });

    setStudentLibrary(temp);
  }, [searchTerm]);
  return (
    <View style={styles.container}>
      <HeaderBack title={"Library"} onPress={() => navigation.goBack()} />
      <View style={styles.main_box}>
        <HeaderText title={"Library Access"} />
        {/* <TextInput
          onChangeText={setSearchTerm}
          value={searchTerm}
          style={styles.search_text}
          
        /> */}
        {/* <TextWithButton
          title={"Library Access"}
          label={"Manage Library"}
          onPress={() => navigation.navigate("AdminManageLibrary")}
        /> */}
        <View style={styles.search_box}>
          <View style={styles.icon_box}>
            <Image style={styles.icon} source={require("../../../assets/images/Search.png")} />
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
        {/* <SelectCourse
          // label={"Select Course"}
          onSelect={(selectedItem, index) => {
            setCourseId(selectedItem.id);
          }}
        /> */}
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.book_container}>
            {loading ? (
              <Loader />
            ) : (
              <>
                {studentLibrary?.length ? (
                  studentLibrary.map((list) => (
                    <Book_Card
                      title={list.titel}
                      author={list.author}
                      // onPress={() => navigation.navigate("ViewBook", { list })}
                      onPress={() => Linking.openURL(list.pdf)}
                    />
                  ))
                ) : (
                  <NoDataFound />
                )}
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
