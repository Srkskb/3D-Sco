import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TextInput,
  TouchableOpacity,ActivityIndicator
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
export default function AdminStoreFavoriteLinks() {
  
  const navigation = useNavigation();
  const [storeLinks, setStoreLinks] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true)
    console.log(loginUID, filter,user_type);
    const myHeaders = myHeadersData();
    var data = qs.stringify({
  'link': '1',
  'student_id': loginUID,
  'category':filter,
  'type': user_type
});
var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://3dsco.com/3discoapi/3dicowebservce.php?link=1',
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'PHPSESSID=41mqd76dj1dbfh1dbhbrkk6jv5'
  },
  data : data
};

axios(config)
      .then((result) => {
        console.log(result.data)
        setStoreLinks(result.data.data);
        setInitialStoreLinks(result.data.data);
    setLoading(false)
  })
      .catch((error) =>{ console.log("error", error)
      setLoading(false)
    });
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
    // allLearnerList();
    setTimeout(() => {
      changeColor("green");
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    // allLearnerList();
    // navigation.addListener("focus", () =>
    // allLearnerList()
    // );
  }, [navigation]);

  // ! For Input Box Search Data List
  const searchText=(searchTerm) => {
    setSearchTerm(searchTerm)
    if (!searchTerm) return setStoreLinks(initialStoreLinks);
    if(initialStoreLinks&&initialStoreLinks.length>0){
        let temp = initialStoreLinks.filter((item) => {
          if (item.Titel.toLowerCase().includes(searchTerm.toLowerCase()))
            temp.push(item);
        });
    
        // setStoreLinks(temp);
        console.log(temp);}
  }
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
          onPress={() => navigation.navigate("AdminAddLinks")}
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
              onChangeText={(text)=>searchText(text)}
              value={searchTerm}
              placeholder={"Search title, author..."}
            />
          </View>
          <View style={styles.search_button}>
            <TouchableOpacity onPress={allLearnerList}>
              <FontAwesome name="search" size={24} color="#fff"/>
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
                      removePress={() => deleteProject(list.id)}
                      pressEdit={() =>
                        navigation.navigate("AdminEditStoreFavoriteLinks", {
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
    // width: "20%",
    paddingHorizontal:10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  category_search: {
    width: "80%",
    flexDirection: "row",
  },
});
