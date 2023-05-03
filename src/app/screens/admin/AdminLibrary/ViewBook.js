import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import { Image } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Edit, Remove, ViewButton } from "../../../components/buttons";
import AsyncStorage from "@react-native-community/async-storage";

export default function ViewBook({ navigation, route }) {
  const [viewData, setData] = useState(route.params.list);
  const [loading, setLoading] = useState(false);

  const handleDeleteBook = async () => {
    console.log("enterrrr", viewData);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    // console.log("value", values);
    setLoading(true);
    let data = new FormData();
    data.append("delete_book", "1");
    data.append("book_id", viewData?.id);
    data.append("user_id", myData?.id);
    console.log("data", data);
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: "PHPSESSID=a780e1f8925e5a3d9ebcdbb058ff0885",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("first", res);
        if (res.success == 1) {
          setLoading(false);
          // navigation.navigate("AdminManageLibrary");
          // navigation.replace();
          navigation.goBack();
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <HeaderBack title={"Book Detail"} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll_view}>
        <View style={styles.detail_box}>
          <Image source={require("../../../assets/images/logo12.png")} style={{ width: wp(16), height: wp(16) }} />
          <Text style={styles.head_text}>Course</Text>
          <Text style={styles.detail_text}>{viewData?.course_name}</Text>
          <Text style={styles.head_text}>Book Title</Text>
          <Text style={styles.detail_text}>{viewData?.titel}</Text>
          <Text style={styles.head_text}>Author</Text>
          <Text style={styles.detail_text}>{viewData?.author}</Text>
          <Text style={styles.head_text}>Publisher</Text>
          <Text style={styles.detail_text}>{viewData?.publisher}</Text>
          {viewData?.description && (
            <>
              <Text style={styles.head_text}>Book Description</Text>
              <Text style={styles.detail_text}>{viewData?.description}</Text>
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ViewButton onPress={() => Linking.openURL(viewData?.pdf || viewData?.resume)} />
        <Edit onPress={() => navigation.navigate("AdminEditBook", { list: viewData })} />
        <Remove onPress={() => handleDeleteBook()} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
  detail_box: {
    backgroundColor: color.gray_light,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 3,
    height: "100%",
  },
  head_text: {
    color: color.purple,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
    marginTop: 20,
  },
  bold_text: {
    textTransform: "capitalize",
    fontFamily: "Montserrat-SemiBold",
  },
  data: {
    fontFamily: "Montserrat-Regular",
  },
  description_text: {
    fontFamily: "Montserrat-Regular",
    textAlign: "justify",
  },
  description: {
    marginTop: 20,
  },
  scroll_view: {
    margin: 10,
    backgroundColor: color.gray_light,
  },
  detail_text: {
    fontFamily: "Montserrat-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
});
