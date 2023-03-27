import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
const { height, width } = Dimensions.get("window");
import { myHeadersData } from "../../../api/helper";
import CommentCard from "../../../components/card/CommentCard";

export default function AffiliateViewPhoto({ route, navigation }) {
  const { title, titleParam } = route.params;
  const { access, accessParam } = route.params;
  const { description, descriptionParam } = route.params;
  const { id, image, imageParam } = route.params;
  const [comments, setComments] = useState([]);

  const loginUID = localStorage.getItem("loginUID");
  const myHeaders = myHeadersData();
  const commentList = () => {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      // `https://3dsco.com/3discoapi/studentregistration.php?photos_comments_list=1&photo_id=${id}`,
      `https://3dsco.com/3discoapi/studentregistration.php?photos_comments_list=1&photo_id=16`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success == 1) setComments(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    commentList();
    navigation.addListener("focus", () => commentList());
  }, []);

  return (
    <View style={styles.container}>
      <HeaderBack title={"Photo Gallery"} onPress={() => navigation.navigate("AffiliateViewPhoto")} />
      <View style={styles.inner_view}>
        <Text>
          <Text style={styles.text}>Title : {title}</Text>
        </Text>
        <Text>
          <Text style={styles.title}>Access Level: {access}</Text>
        </Text>
        <Text>
          <Text style={styles.title}>Description : {description}</Text>
        </Text>
        <ScrollView style={{ paddingHorizontal: 10 }}>
          <View style={styles.documentView}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: `${image}`,
              }}
            />
          </View>
          <View>
            {comments.map((list, index) => (
              <CommentCard key={list.id} name={list.user_id} comments={list.comments} CommentDate={list.Date} />
            ))}
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
  tinyLogo: {
    height: height / 2,
    resizeMode: "contain",
  },
  img: {
    width: 300,
    height: 500,
    borderWidth: 1,
    resizeMode: "contain",
  },
  inner_view: {
    margin: 10,
    padding: 10,

    backgroundColor: color.gray_white,
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
  },
  text: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: color.purple,
  },
  documentView: {
    marginTop: 30,
  },
});
