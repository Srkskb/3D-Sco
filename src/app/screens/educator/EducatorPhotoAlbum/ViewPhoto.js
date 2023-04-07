import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
const { height, width } = Dimensions.get("window");
import { myHeadersData } from "../../../api/helper";
import CommentCard from "../../../components/card/CommentCard";
import Input2 from "../../../components/inputs/Input2";
import SmallButton from "../../../components/buttons/SmallButton";
export default function ViewPhoto({ route, navigation }) {
  const {loading,setloading}=useState(false)
  const [comment, setComment] = useState("");
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
      <HeaderBack title={"Photo Gallery"} onPress={() => navigation.navigate("EducatorPhotoAlbum")} />
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
          <View>
            {comments.map((list, index) => (
              <CommentCard key={list.id} name={list.user_id} comments={list.comments} CommentDate={list.Date} />
            ))}
          </View>
          <Input2
            label={"Leave a Comment"}
            multiline={true}
            numberOfLines={5}
            textAlignVertical={"top"}
            onChange={(e) => console.log(e)}
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
              // onPress={addComment}
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
flex:1,
    backgroundColor: color.white,
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
});
