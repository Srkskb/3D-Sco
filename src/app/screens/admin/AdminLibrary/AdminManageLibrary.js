import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, TextInput, Image, TouchableOpacity, Text } from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import Book_Card from "../../../components/card/Book_Card";
import { NoDataFound } from "../../../components";
import TextWithButton from "../../../components/TextWithButton";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export default function AdminManageLibrary() {
  const navigation = useNavigation();
  const [manageLibrary, setManageLibrary] = useState([]);

  const fetch = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    axios
      .get(`https://3dsco.com/3discoapi/3dicowebservce.php?student_library=1&student_id=${myData?.id}`)
      .then(function (res) {
        if (res.data.success == 1) {
          if (res.data.data) {
            console.log("data222", res.data.data);
            setManageLibrary(res.data.data);
          } else setManageLibrary([{ Course: "Please add the course", id: 0 }]);
        } else {
          console.log("Course List can't fetch right now");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    !manageLibrary.length && fetch();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderBack title={"Library"} onPress={() => navigation.goBack()} />
      <View style={styles.main_box}>
        <TextWithButton title={"Books"} label={"Add Books"} onPress={() => navigation.navigate("AdminAddBook")} />

        <ScrollView>
          <View style={styles.book_container}>
            {manageLibrary.map((item) => (
              <Book_Card
                image={item?.image}
                title={item?.titel}
                author={item?.author}
                onPress={() => navigation.navigate("ViewBook", { list: item })}
              />
            ))}
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
