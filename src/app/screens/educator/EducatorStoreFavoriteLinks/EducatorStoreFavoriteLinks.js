import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TextInput,
  TouchableOpacity,
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
export default function EducatorStoreFavoriteLinks() {
  const navigation = useNavigation();
  const [storeLinks, setStoreLinks] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [filter, setFilter] = useState("");
  const [initialStoreLinks, setInitialStoreLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user_type = localStorage.getItem("userID"); // ! user Type student or other
  const allLearnerList = () => {
    const loginUID = localStorage.getItem("loginUID");
    console.log(loginUID, filter,user_type);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?link=1&student_id=${loginUID}&category=${filter}&type=${user_type}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        setStoreLinks(result.data);
        setInitialStoreLinks(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const deleteProject = (id) => {
    const loginUID = localStorage.getItem("loginUID");
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?delete_link=1&id=${id}&user_id=${loginUID}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success === 1) {
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
    allLearnerList();
    setTimeout(() => {
      changeColor("green");
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    allLearnerList();
    navigation.addListener("focus", () => allLearnerList());
  }, [filter]);

  // ! For Input Box Search Data List
  useEffect(() => {
    if (!searchTerm) return setStoreLinks(initialStoreLinks);
    let temp = [];
    initialStoreLinks.forEach((item) => {
      if (item.Titel.toLowerCase().includes(searchTerm.toLowerCase()))
        temp.push(item);
    });

    setStoreLinks(temp);
  }, [searchTerm]);
  return (
    <View style={styles.container}>
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
        style={{zIndex:1}}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
        style={{zIndex:1}}
      >
        {getMessageFalse}
      </Snackbar>

      <HeaderBack
        title={"Store Favorite Links"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main_box}>
        <TextWithButton
          title={"Store Favorite Links"}
          label={"+Add"}
          onPress={() => navigation.navigate("EducatorAddLinks")}
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
              onSelect={(selectedItem, index) => {
                setFilter(index + 1);
                console.log(index + 1);
              }}
            />

            <TextInput
              style={styles.input}
              onChangeText={setSearchTerm}
              value={searchTerm}
              placeholder={"Search title, author..."}
            />
          </View>
          <View style={styles.search_button}>
            <TouchableOpacity style={styles.search_button}>
              <FontAwesome name="search" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.main}>
            <View style={{ flex: 1 }}>
              {storeLinks === undefined ? (
                <>
                  <NoDataFound />
                </>
              ) : (
                <>
                  {storeLinks.map((list, index) => (
                    <WebLinkCard
                      title={list.Titel}
                      link={list.url}
                      description={list.Detail}
                      category={list.Category}
                      viewPress={() =>
                        navigation.navigate("EducatorViewStoreFavoriteLinks", {
                          title: list.Titel,
                          link: list.url,
                          description: list.Detail,
                          category: list.Category,
                        })
                      }
                      removePress={() => deleteProject(list.id)}
                      pressEdit={() =>
                        navigation.navigate("EducatorEditStoreFavoriteLinks", {
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

    width: "28%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",

    width: 45,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  category_search: {
    width: "80%",
    flexDirection: "row",
  },
});
