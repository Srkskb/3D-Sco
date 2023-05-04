import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import { Snackbar } from "react-native-paper";
import WebLinkCard from "../../../components/card/WebLinkCard";
import TextWithButton from "../../../components/TextWithButton";
import RoundCategory from "../../../components/dropdown/RoundCategory";
import WeblinkSearch from "../../../components/WeblinkSearch";
import { FontAwesome } from "@expo/vector-icons";

import AsyncStorage from "@react-native-community/async-storage";
import DeletePopup from "../../../components/popup/DeletePopup";

export default function AdminStoreFavoriteLinks() {
  const navigation = useNavigation();

  const [storeLinks, setStoreLinks] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [linkId, setLinkId] = useState("");
  const [deletePop, setDeletePop] = useState(false);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [filter, setFilter] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  // const [categoryList, setCategoryList] = useState([]);
  // const [initialStoreLinks, setInitialStoreLinks] = useState([]);
  // const user_type = localStorage.getItem("userID"); // ! user Type student or other
  console.log("filter", filter);
  const allLearnerList = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    console.log("first", myData.id);
    const type =
      myData.type == "admin"
        ? 4
        : myData.type == "tutor"
        ? 2
        : myData.type == "affiliate"
        ? 5
        : myData.type == "student"
        ? 1
        : 3;
    setLoading(true);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?link=1&student_id=${myData.id}&type=${type}&category=${filter}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const filteredItems = result?.data?.filter((item) =>
          item?.Titel?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchTerm("");
        setStoreLinks(filteredItems);
        // setSearchData(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  // const category = () => {
  //   const myHeaders = myHeadersData();
  //   fetch("https://3dsco.com/3discoapi/3dicowebservce.php?category_list=1", {
  //     method: "GET",
  //     headers: {
  //       myHeaders,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.success == 1) {
  //         setCategoryList(res.data);
  //       } else {
  //         alert("Try after sometime");
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  const deleteProject = async (linkId) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setDeleteLoading(true);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?delete_link=1&id=${linkId}&user_id=${myData.id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success == 1) {
          setLinkId("");
          setSnackVisibleTrue(true);
          setMessageTrue(result.message);
          // let temp = [];
          // storeLinks.forEach((item) => {
          //   if (item.id !== linkId) temp.push(item);
          // });
          setStoreLinks((prev) => prev.filter((item) => item.id != linkId));
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(result.message);
        }
        setDeleteLoading(false);
      });
    setDeleteLoading(true).catch((error) => {
      setDeleteLoading(false);
      console.log("error", error);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    allLearnerList();
    setTimeout(() => {
      // changeColor("green");

      setRefreshing(false);
    }, 2000);
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    // navigation.addListener("focus", () => {
    //   // setSelectCategory({});
    //   // setStoreLinks([]);
    //   // allLearnerList();
    // });
    allLearnerList();
  }, [isFocused]);

  // const searchText = (searchTerm) => {
  //   const filteredData = storeLinks?.filter((el) => {
  //     if (searchTerm === "") {
  //       return storeLinks;
  //     } else {
  //       return el.Titel.toLowerCase().includes(searchTerm);
  //     }
  //   });
  //   setSearchData(filteredData);
  // };
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
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
        wrapperStyle={{ zIndex: 1 }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
        wrapperStyle={{ zIndex: 1 }}
      >
        {getMessageFalse}
      </Snackbar>

      <HeaderBack title={"Store Favorite Links"} onPress={() => navigation.goBack()} />
      <View style={styles.main_box}>
        <TextWithButton
          title={"Store Favorite Links"}
          label={"+Add"}
          onPress={() => {
            setFilter("");
            navigation.navigate("AdminAddLinks");
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <View style={styles.category_search}>
            <RoundCategory
              onSelect={(selectedItem, index, item) => {
                setFilter(selectedItem.id);
                setSelectCategory(selectedItem);
              }}
              value={selectCategory}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setSearchTerm(text)}
              value={searchTerm}
              placeholder={"Search title, author..."}
            />
          </View>
          <View style={styles.search_button}>
            <TouchableOpacity onPress={() => allLearnerList()}>
              <FontAwesome name="search" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView refreshControl={!refreshing && <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.main}>
            <View style={{ flex: 1 }}>
              {storeLinks === undefined ? (
                <>
                  <NoDataFound />
                </>
              ) : (
                <>
                  {storeLinks?.map((list, index) => (
                    <WebLinkCard
                      key={index}
                      title={list.Titel}
                      link={list.url}
                      description={list.Detail}
                      category={list.Category}
                      viewPress={() =>
                        navigation.navigate("AdminViewStoreFavoriteLinks", {
                          title: list.Titel,
                          link: list.url,
                          description: list.Detail,
                          category: list.Category,
                        })
                      }
                      removePress={() => {
                        setLinkId(list.id);
                        // setDeletePop(true);
                      }}
                      pressEdit={() => {
                        navigation.navigate("AdminEditStoreFavoriteLinks", {
                          editData: list,
                        });
                      }}
                    />
                  ))}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      {linkId?.length ? (
        <DeletePopup
          deleteLoading={deleteLoading}
          cancelPress={() => setDeletePop(false)}
          deletePress={() => deleteProject(linkId)}
        />
      ) : null}
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
  blogList: {
    borderWidth: 1,
    borderColor: color.light_skyblue,
    padding: 10,

    borderRadius: 8,
    marginBottom: 20,
  },
  url: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Normal",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  Category: {
    fontSize: 16,
    color: color.dark_gray,
    fontFamily: "Montserrat-Normal",
    textTransform: "capitalize",
    marginBottom: 5,
  },

  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
  },

  input: {
    width: "56%",
    borderWidth: 1,
    borderColor: color.purple,
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    borderRadius: 50,
    fontFamily: "Montserrat-Regular",

    marginRight: "2%",

    marginLeft: 10,
  },
  search_button: {
    backgroundColor: color.purple,
    // width: "20%",
    paddingHorizontal: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  category_search: {
    width: "80%",
    flexDirection: "row",
  },
});
