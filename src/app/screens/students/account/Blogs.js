import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { Snackbar } from "react-native-paper";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import moment from "moment";
import TextWithButton from "../../../components/TextWithButton";
import { Edit, Remove, ViewButton } from "../../../components/buttons";
import AsyncStorage from "@react-native-community/async-storage";

export default function Blogs() {
  const navigation = useNavigation();
  const [blogListData, setBlogListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [loading, setLoading] = useState(false);
  const loginUID = localStorage.getItem("loginUID");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("userData"));
    setUserId(data?.id);
    allLearnerList();
  };

  const allLearnerList = async () => {
    console.log("Enter");
    setLoading(true);
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?blog_list=1`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result.data);
        setBlogListData(result.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  // Delete Blog
  const deleteBlog = (id) => {
    // const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?delete_blog=1&id=${id}&user_id=${userId}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success === 1) {
          setSnackVisibleTrue(true);
          setMessageTrue(result.message);
          let temp = [];
          blogListData.forEach((item) => {
            if (item.id !== id) temp.push(item);
          });
          setBlogListData(temp);
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(result.message);
        }
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

  // useEffect(() => {
  //   navigation.addListener("focus", () => allLearnerList());
  // }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffffcc",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : null}
      <HeaderBack title={"Blogs"} onPress={() => navigation.goBack()} />
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
      >
        {getMessageFalse}
      </Snackbar>
      <View style={styles.main_box}>
        <TextWithButton title={"My Blog"} label={"+Add"} onPress={() => navigation.navigate("AddBlogs")} />
        <View style={styles.main_box2}>
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}>
            <View style={styles.main}>
              <View style={{ flex: 1 }}>
                {blogListData === undefined ? (
                  <>
                    <NoDataFound />
                  </>
                ) : (
                  <>
                    {blogListData.map((list, index) => (
                      <View style={styles.containerBlog} key={index}>
                        <View style={{ flexDirection: "row" }}>
                          <View style={styles.right_side}>
                            <View style={{ width: "100%" }}>
                              <Text style={styles.head_text}>{list.Titel}</Text>
                              <Text style={styles.date}>Last Updated - {moment(list && list?.Date).format("LL")}</Text>
                              <Text style={styles.description_text} numberOfLines={1}>
                                {list.Description}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.button_container}>
                          <ViewButton
                            onPress={() =>
                              navigation.navigate("ViewBlogs", {
                                Titel: list.Titel,
                                Date: moment(list && list?.Date).format("LL"),
                                description: list.Description,
                                list: list,
                              })
                            }
                          />
                          <View style={{ width: 20 }}></View>

                          {list.added_by == userId ? (
                            <>
                              <Edit
                                onPress={() =>
                                  navigation.navigate("EditBlogs", {
                                    blogID: list.id,
                                    title: list.Titel,
                                    date: moment(list && list?.Date).format("LL"),
                                    description: list.Description,
                                  })
                                }
                              />
                              <View style={{ width: 20 }}></View>
                              <Remove onPress={() => deleteBlog(list.id)} />
                            </>
                          ) : null}
                        </View>
                      </View>
                    ))}
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
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
  main_box2: {
    flex: 1,
  },
  blogList: {
    borderWidth: 1,
    borderColor: color.light_skyblue,
    borderRadius: 8,
    marginBottom: 20,
  },

  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },
  containerBlog: {
    borderWidth: 1,
    borderColor: color.light_skyblue,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  left_side: {
    width: "10%",
  },
  right_side: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  description_text: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    width: "100%",
    textAlign: "justify",
  },
  head_text: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
  },
  date: {
    fontFamily: "Montserrat-SemiBold",
    color: color.dark_gray,
    fontSize: 12,
  },
  button_container: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "center",
  },
});
