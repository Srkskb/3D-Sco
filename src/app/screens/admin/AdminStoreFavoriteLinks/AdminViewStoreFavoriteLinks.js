import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";

export default function AdminViewStoreFavoriteLinks({ route, navigation }) {
  const { title, titleParam } = route.params;
  const { link, linkParam } = route.params;
  const { category, categoryParam } = route.params;
  const { description, descriptionParam } = route.params;
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"My Project View"}
        onPress={() => navigation.navigate("AdminStoreFavoriteLinks")}
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
              <Text style={styles.bold_text}>Link: </Text>
              <Text style={styles.data}>{link}</Text>
            </Text>
            {/* Posted by */}
            <Text>
              <Text style={styles.bold_text}>Category: </Text>
              <Text style={styles.data}>{category}</Text>
            </Text>
            <View style={styles.description}>
              <Text style={styles.description_text}>{description}</Text>
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
   
});
