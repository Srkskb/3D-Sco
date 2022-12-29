import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect }  from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import TextWithButton from "../../../components/TextWithButton";
import Event_Card from "../../../components/card/Event_Card";
import { myHeadersData } from "../../../api/helper";

export default function ManageResources({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");
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
    <View style={styles.main}>
      <HeaderBack title={"Manage Resources"} onPress={()=>navigation.goBack()}/>
      <ScrollView style={styles.container}>
        <TextWithButton
          label={"Post"}
          title={"Post Your Question"}
          onPress={() => navigation.navigate("EducatorAddResources")}
        />
        {myResourcesData === undefined ? (
              <>
                <NoDataFound />
              </>
            ) : (
              <>
                {myResourcesData.map((list, index) => (
                  <>
        <Event_Card
          title={list.Question}
          description={list.Answer}
          date={"24/05/2023"}
          editPress={() => navigation.navigate("EducatorEditResources")}
        />
        </>
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
  main: {
    backgroundColor: color.white,
    flex: 1,
  },
});
