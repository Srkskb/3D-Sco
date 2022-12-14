import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  
} from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import Input2 from "../../../components/inputs/Input2";
import SmallButton from "../../../components/buttons/SmallButton";
import CommentCard from "../../../components/card/CommentCard";
import { myHeadersData } from "../../../api/helper";
const{height,width}=Dimensions.get('window')
export default function ViewBlogs({ route, navigation }) {
    const { Titel, titleParam } = route.params;
  const { Date, accessParam } = route.params;
  const { description, descriptionParam } = route.params;

  return (
    <View style={styles.container}>
      <HeaderBack
        title={"view blogs"}
        onPress={() => navigation.navigate("Blogs")}
      />
      <ScrollView
       
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.main}>
          <View style={styles.detail_box}>
            <Text style={styles.head_text}>{Titel}</Text>
            <View style={styles.detail}>
              {/* Date */}
              <Text>
                <Text style={styles.bold_text}>Date: </Text>
                <Text style={styles.data}>{Date}</Text>
              </Text>
              {/* Time */}
            
              {/* Posted by */}
              <Text>
                <Text style={styles.bold_text}>Posted By: </Text>
                <Text style={styles.data}>ArmanD suarez</Text>
              </Text>
              <View style={styles.description}>
                <Text style={styles.description_text}>
                  {description} 
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.comment_section}>
            <Text style={styles.comment_text}>
              <Text>comments</Text>
              <Text>( 1 )</Text>
            </Text>
            <CommentCard />
          </View>
          <Input2
            label={"Leave a Comment"}
            multiline={true}
            numberOfLines={5}
            textAlignVertical={"top"}
            placeholder={"Type Your Comment Here..."}
          />
          <View style={styles.button_container}>
            <SmallButton
              title={"Cancel"}
              color={color.purple}
              fontFamily={"Montserrat-Medium"}
            />
            <SmallButton
              title={"Submit"}
              color={color.white}
              fontFamily={"Montserrat-Bold"}
              backgroundColor={color.purple}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
  main: {
    paddingHorizontal: 10,
  },
  detail_box: {
    backgroundColor: color.gray_light,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 20,
    borderRadius: 3,
   
  },
  head_text: {
    color: color.purple,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
    marginBottom: 20,
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
  button_container: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 40,
  },
});
