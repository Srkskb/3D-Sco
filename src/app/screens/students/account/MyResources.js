import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import HeaderBack from "../../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import color from "../../../assets/themes/Color";
import HeaderText from "../../../components/HeaderText";
import { myHeadersData } from "../../../api/helper";
import { NoDataFound } from "../../../components";
import TextWithButton from "../../../components/TextWithButton";

export default function MyResources() {
  const navigation = useNavigation();
  const [myResourcesData, setMyResourcesData] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = React.useState(false);
  const allLearnerList = () => {
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?faq=1`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => setMyResourcesData(result.data))
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
  return (
    <View style={styles.container}>
      <HeaderBack title={"FAQ"} onPress={() => navigation.goBack()} />
      <View style={styles.main_box}>
        <HeaderText title={"FREQUENTLY ASKED QUESTIONS ( FAQ )"} />
        <TextWithButton title={"Manage My Resources"} label={"Manage"} onPress={()=>navigation.navigate("ManageResources")}/>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.main}>
            {myResourcesData === undefined ? (
              <>
                <NoDataFound />
              </>
            ) : (
              <>
                {myResourcesData.map((list, index) => (
                  <>
                    <View style={styles.faqBlock}>
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            marginBottom: 10,
                          }}
                        >
                          <View style={{ flex: 0.2 }}>
                            <Text style={styles.queT}>Que. {index + 1}</Text>
                          </View>
                          <View style={{ flex: 0.8, paddingRight: 5 }}>
                            <Text
                              style={[styles.queT, { textAlign: "justify" }]}
                            >
                              {list.Question}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <View style={{ flex: 0.2 }}>
                            <Text style={styles.queT}> Ans.</Text>
                          </View>
                          <View style={{ flex: 0.8, paddingRight: 5 }}>
                            <Text
                              style={[styles.answer, { textAlign: "justify" }]}
                            >
                              {list.Answer}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
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
    paddingHorizontal: 20,
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
  faqBlock: {
    display: "flex",
    marginBottom: 20,
  },
  questionBlock: {
    marginBottom: 10,
    display: "flex",
    flex: 1,
  },
  queT: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
    textTransform: "capitalize",
  },
  answer: {
    fontSize: 14,
    fontFamily: "Montserrat-Normal",
    textTransform: "capitalize",
  },
});
