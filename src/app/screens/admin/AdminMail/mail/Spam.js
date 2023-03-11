import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import color from "../../../../assets/themes/Color";
import Mail_Card from "../../../../components/card/Mail_Card";
import { myHeadersData } from "../../../../api/helper";
import { NoDataFound } from "../../../../components";
export default function Spam({ navigation }) {
  const [mailListData, setMailListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const loginUID = localStorage.getItem("loginUID");

  const SpamMessage = () => {
    var myHeaders = myHeadersData();

    var formdata = new FormData();
    formdata.append("spam_message_view", "1");
    formdata.append("user_id", loginUID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMailListData(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    SpamMessage();
    navigation.addListener("focus", () => SpamMessage());
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    SpamMessage();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.main}>
          {mailListData === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {mailListData.map((list, index) => (
                <Mail_Card
                  key={index}
                  spam
                  title={list.Subject}
                  description={list.Message}
                  sender={list.RecieverName}
                  onPress={() =>
                    navigation.navigate("ViewMail", { msgType: "spam",msg:list })
                  }
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main: {
    paddingHorizontal: 20,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 40,
  },
  clear_all: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
    color: color.dark_gray,
  },
  day: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: color.purple,
    textTransform: "uppercase",
  },
});
