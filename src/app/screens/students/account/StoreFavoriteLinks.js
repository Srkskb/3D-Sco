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
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import { Snackbar } from "react-native-paper";
import WebLinkCard from "../../../components/card/WebLinkCard";
import TextWithButton from "../../../components/TextWithButton";
import RoundCategory from "../../../components/dropdown/RoundCategory";
import WeblinkSearch from "../../../components/WeblinkSearch";
import { FontAwesome } from "@expo/vector-icons";
import qs from "qs";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import DeletePopup from "../../../components/popup/DeletePopup";
export default function StoreFavoriteLinks() {
  const navigation = useNavigation();

  const [storeLinks, setStoreLinks] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
const [deletePop, setDeletePop] = useState(false);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [filter, setFilter] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [initialStoreLinks, setInitialStoreLinks] = useState([]);
  const user_type = localStorage.getItem("userID"); // ! user Type student or other

  const allLearnerList = async (text = "") => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const loginUID = localStorage.getItem("loginUID");
    setLoading(true);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?link=1&student_id=${myData.id}&type=${user_type}&category=${filter}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setStoreLinks(result.data);
        setSearchData(result.data);
        setInitialStoreLinks(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const category = () => {
    const myHeaders = myHeadersData();
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php?category_list=1", {
      method: "GET",
      headers: {
        myHeaders,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success == 1) {
          setCategoryList(res.data);
        } else {
          alert("Try after sometime");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const deleteProject = async (id) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/3dicowebservce.php?delete_link=1&id=${id}&user_id=${myData.id}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.success === 1) {
          setDeletePop(false);
          setSnackVisibleTrue(true);
          setMessageTrue(result.message);
          let temp = [];
          storeLinks.forEach((item) => {
            if (item.id !== id) temp.push(item);
          });
          setStoreLinks(temp);
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const onRefresh = () => {
    setRefreshing(true);
    // allLearnerList();
    setTimeout(() => {
      changeColor("green");
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    category();
    navigation.addListener("focus", () => category());
  }, [navigation]);
  useEffect(() => {
    filter && allLearnerList();
  }, [filter]);

  const searchText = (searchTerm) => {
    const filteredData = storeLinks?.filter((el) => {
      if (searchTerm === "") {
        return storeLinks;
      } else {
        return el.Titel.toLowerCase().includes(searchTerm);
      }
    });
    setSearchData(filteredData);
  };
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
          onPress={() => navigation.navigate("AddLink")}
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
                // let catid = categoryList?.filter((i) => i.Name === selectedItem).map((i) => i.id);
                console.log(selectedItem);
                // setFilter(catid && catid[0]);
                setSearchTerm("");
              }}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setSearchTerm(text)}
              value={searchTerm}
              placeholder={"Search title, author..."}
            />
          </View>
          <View style={styles.search_button}>
            {/* <TouchableOpacity onPress={() => allLearnerList()}> */}
            <TouchableOpacity onPress={() => searchText(searchTerm)}>
              <FontAwesome name="search" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.main}>
            <View style={{ flex: 1 }}>
              {storeLinks === undefined ? (
                <>
                  <NoDataFound />
                </>
              ) : (
                <>
                  {searchData?.map((list, index) => (
                    <WebLinkCard
                      key={index}
                      title={list.Titel}
                      link={list.url}
                      description={list.Detail}
                      category={list.Category}
                      viewPress={() =>
                        navigation.navigate("ViewStoreFavoriteLinks", {
                          title: list.Titel,
                          link: list.url,
                          description: list.Detail,
                          category: list.Category,
                        })
                      }
                      removePress={() => {
                        setId(list.id);
                        setDeletePop(true);
                      }}
                      pressEdit={() =>
                        navigation.navigate("EditStoreFavoriteLinks", {
                          linkID: list.id,
                          title: list.Titel,
                          link: list.url,
                          description: list.Detail,
                          linkCategory: list.Category,
                        })
                      }
                    />
                  ))}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      {deletePop ? (
        <DeletePopup
          cancelPress={() => setDeletePop(false)}
          deletePress={() => deleteProject(id)}
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
