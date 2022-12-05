import React from "react";
import { View, Text, StyleSheet, ScrollView,Image,Dimensions } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
const{height,width}=Dimensions.get("window")
export default function ViewMyProject({ route, navigation }) {
  const { title, titleParam } = route.params;
  const { date, dateParam } = route.params;
  const { duration, durationParam } = route.params;
  const { description, descriptionParam } = route.params;
  const { image, imageParam } = route.params;

  return (
    <View style={styles.container}>
      <HeaderBack
        title={"My Project View"}
        onPress={() => navigation.navigate("MyProjects")}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll_view}
      >
        <View style={styles.detail_box}>
          <Text style={styles.head_text}>{title}</Text>
          <View style={styles.detail}>
            {/* Date */}
            <Text>
              <Text style={styles.bold_text}>Date: </Text>
              <Text style={styles.data}>{date}</Text>
            </Text>
            {/* Posted by */}
            <Text>
              <Text style={styles.bold_text}>Duration: </Text>
              <Text style={styles.data}>{duration}</Text>
            </Text>
            <View style={styles.description}>
              <Text style={styles.description_text}>{description}</Text>
            </View>
            <View style={styles.documentView}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `${image}`,
                }}
              />
            </View>
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
  scroll_view: {
    margin: 10,
    backgroundColor: color.gray_light,
  },
    documentView: {
    marginTop: 30,
  },
    tinyLogo: {
      height: height/2,
      resizeMode:'contain'
  },
  img: {
    width: 300,
    height: 500,
    borderWidth: 1,
    resizeMode:'contain'
  },
});
