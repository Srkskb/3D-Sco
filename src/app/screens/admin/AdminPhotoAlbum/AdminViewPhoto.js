import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
const { height, width } = Dimensions.get("window");
import { myHeadersData } from "../../../api/helper";
import CommentCard from "../../../components/card/CommentCard";
import Input2 from "../../../components/inputs/Input2";
import SmallButton from "../../../components/buttons/SmallButton";
import AsyncStorage from "@react-native-community/async-storage";
import * as qs from "qs";

export default function AdminViewPhoto({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const { title, titleParam } = route.params;
  const { access, accessParam } = route.params;
  const { description, descriptionParam } = route.params;
  const { id, image, imageParam } = route.params;
  const [comments, setComments] = useState([]);

  const addPhotoComment = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setLoading(true);
    var myHeaders = myHeadersData();
    // var formdata = new FormData();
    // formdata.append("add_photos_comments", "1");
    // formdata.append("photo_id", route.params.id);
    // formdata.append("comments", comment);
    // formdata.append("user_id", myData.id);
    const formdata = qs.stringify({
      add_photos_comments: "1",
      photo_id: route.params.id,
      comments: comment,
      user_id: myData.id,
    });

    var requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=7fqo201rhcb95rof0rq6hg3jm3",
      },
      body: formdata,
    };
    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.success == 1) {
          // commentList();
          setComments((prev) => [
            ...prev,
            { id: myData.id, User_name: myData.name, comments: comment, CommentDate: Date.now() },
          ]);
          setComment("");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  const myHeaders = myHeadersData();
  const commentList = () => {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://3dsco.com/3discoapi/studentregistration.php?photos_comments_list=1&photo_id=${route.params.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success != 0) {
          setComments(result.data);
        } else {
          setComments([]);
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    commentList();
    // navigation.addListener("focus", () => commentList());
  }, [navigation]);

  return (
    <View style={styles.container}>
      <HeaderBack title={"Photo Gallery"} onPress={() => navigation.navigate("AdminPhotoAlbum")} />
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
        <ScrollView style={{ paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
          <View style={styles.documentView}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: `${image}`,
              }}
            />
          </View>
          <View style={styles.comment_section}>
            <Text style={styles.comment_text}>
              <Text>comments</Text>
              <Text> ({comments && comments.length})</Text>
            </Text>
            {comments.map((list, index) => (
              <CommentCard key={list.id} name={list.User_name} comments={list.comments} CommentDate={list.Date} />
            ))}
          </View>
          <Input2
            label={"Leave a Comment"}
            multiline={true}
            numberOfLines={5}
            textAlignVertical={"top"}
            // onChange={(e) => console.log(e)}
            placeholder={"Type Your Comment Here..."}
            onChangeText={(text) => setComment(text)}
            // onChangeText={(text) => console.log(text)}
            value={comment}
          />
          <View style={styles.button_container}>
            <SmallButton
              title={"Cancel"}
              color={color.purple}
              fontFamily={"Montserrat-Medium"}
              onPress={() => navigation.goBack()}
            />
            <SmallButton
              title={"Submit"}
              color={color.white}
              loading={loading}
              fontFamily={"Montserrat-Bold"}
              backgroundColor={color.purple}
              onPress={() => addPhotoComment()}
            />
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

    backgroundColor: color.white,
    flex: 1,
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
  button_container: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 40,
  },
  comment_section: {
    marginTop: 10,
  },
  comment_text: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: color.black,
    textTransform: "capitalize",
    marginVertical: 10,
  },
});
