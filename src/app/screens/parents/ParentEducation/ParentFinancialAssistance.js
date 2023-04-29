import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import TextWithButton from "../../../components/TextWithButton";
import { Remove, Edit } from "../../../components/buttons";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import DeletePopup from "../../../components/popup/DeletePopup";
import Loader from "../../../utils/Loader";

export default function ParentFinancialAssistance() {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [deletePop, setDeletePop] = useState(false);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  // const loginUID = localStorage.getItem("loginUID");
  const [loginUID, setloginUID] = useState("");
  const [assistanceData, setAssistanceData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setloginUID(myData?.id);
  }, []);

  const financialAssistanceList = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=4molrg4fbqiec2tainr98f2lo1");
    var formdata = new FormData();
    formdata.append("select_financial_assistance", "1");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`https://3dsco.com/3discoapi/studentregistration.php`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAssistanceData(result?.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  const deleteBlog = async (id) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setDeleteLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=a780e1f8925e5a3d9ebcdbb058ff0885");
    var formdata = new FormData();
    formdata.append("delete_financial_assistance", "1");
    formdata.append("user_id", myData.id);
    formdata.append("id", id);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/studentregistration.php`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success === 1) {
          setDeletePop(false);
          setSnackVisibleTrue(true);
          setMessageTrue(result.message);
          let temp = [];
          assistanceData.forEach((item) => {
            if (item.id !== id) temp.push(item);
          });
          setAssistanceData(temp);
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(result.message);
        }
        setDeleteLoading(false);
      })
      .catch((error) => {
        setDeleteLoading(false);
        console.log("error", error);
      });
  };
  useEffect(() => {
    financialAssistanceList();
    navigation.addListener("focus", () => financialAssistanceList());
  }, []);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
        style={styles.snackText}
        wrapperStyle={{ zIndex: 1 }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
        style={styles.snackText}
        wrapperStyle={{ zIndex: 1 }}
      >
        {getMessageFalse}
      </Snackbar>
      <HeaderBack title={"Financial assistance"} onPress={() => navigation.goBack()} />

      <View style={styles.main_box}>
        <TextWithButton
          title={"Financial Assistance"}
          label={"+Add"}
          onPress={() => navigation.navigate("ParentAddFinancial")}
        />
        {loading && <Loader />}
        <ScrollView>
          {assistanceData.map((list, index) => (
            <View key={index} style={styles.financialAssis}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.right_view}>
                  <Text style={styles.title}>{list.Titel} </Text>
                  <Text style={styles.link}>
                    <Text style={styles.url}>URL : </Text>
                    {list.url}
                  </Text>
                  <Text style={styles.link}>
                    <Text style={styles.url}>Added By : </Text>
                    {list.name}({list.user_type})
                  </Text>
                </View>
              </View>
              <View style={styles.button_container}>
                {list?.user_id === loginUID ? (
                  <>
                    <Remove
                      onPress={() => {
                        setId(list?.id);
                        setDeletePop(true);
                      }}
                    />
                    <View style={{ width: 20 }}></View>
                    <Edit
                      onPress={() =>
                        navigation.navigate("ParentEditFinancial", {
                          editData: list,
                        })
                      }
                    />
                  </>
                ) : null}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {deletePop ? (
        <DeletePopup
          deleteLoading={deleteLoading}
          cancelPress={() => setDeletePop(false)}
          deletePress={() => deleteBlog(id)}
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
  financialAssis: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: color.light_skyblue,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: color.black,
    textTransform: "capitalize",
    marginBottom: 5,
  },

  link: {
    fontFamily: "Montserrat-Regular",
    color: color.purple,
    fontSize: 13,
    marginBottom: 5,
  },
  right_view: {
    width: "90%",
  },
  button_container: {
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "flex-end",
  },
  url: {
    fontFamily: "Montserrat-Bold",
    color: "#000",
    fontSize: 13,
  },
  snackText: {
    position: "relative",
    zIndex: 9999,
  },
});
