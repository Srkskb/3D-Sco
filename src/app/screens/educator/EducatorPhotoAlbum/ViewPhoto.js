import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
const{height,width}=Dimensions.get('window')
export default function ViewPhoto({ route, navigation }) {
  const { title, titleParam } = route.params;
  const { access, accessParam } = route.params;
  const { description, descriptionParam } = route.params;
  const { image, imageParam } = route.params;

  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Photo Gallery"}
        onPress={() => navigation.navigate("EducatorPhotoAlbum")}
      />
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
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
