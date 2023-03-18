import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import Category_Card from "../../../../components/admin_required/Cards/Category_Card";
import axios from "axios";
import Forum_Card from "../../../../components/admin_required/Cards/Forum_Card";
import { NoDataFound } from "../../../../components";
import { myHeadersData } from "../../../../api/helper";
import * as qs from "qs";

export default function Forum({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");
  const [forums, setForums] = useState([]);
  const allForumList = (id) => {
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/studentregistration.php?courses_forum_by_courses_id=1&course_id=${id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setForums(result?.data);
      })
      .catch((error) => console.log("error", error));
  };
  const DeleteForum = (id) => {
    var data = qs.stringify({
      delete_courses_form: "1",
      id: id,
      user_id: localStorage.getItem("loginUID"),
    });
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=n1c8fh1ku6qq1haio8jmfnchv7",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log("dele for", response);
        if (response.data.success == 1) {
          // allLearnerList();
          setForums((prev) => prev.filter((item) => item.id != id));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    // allForumList();
    navigation.addListener("focus", () => setForums([]));
  }, []);
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack title={"Forums"} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <TextWithButton label={"+Add"} title={"Forum Lists"} onPress={() => navigation.navigate("AddForum")} />
        <SelectCourse
          onSelect={(selectedItem, index) => {
            setSelectCourse(selectedItem);
            console.log(index);
            allForumList(index);
          }}
          value={selectCourse}
        />
        {forums === undefined ? (
          <>
            <NoDataFound />
          </>
        ) : (
          <>
            {forums.map((list, index) => (
              <Forum_Card
                key={index}
                title={list.forum_title}
                editPress={() => navigation.navigate("EditForum")}
                // viewPress={() => navigation.navigate("ViewForum")}
                status={"Active"}
                posted_by={"Deepak"}
                date={list.Date}
                viewPress={() => navigation.navigate("ViewForum")}
                removePress={() => DeleteForum(list.id)}
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
    paddingHorizontal: 15,
  },
});
