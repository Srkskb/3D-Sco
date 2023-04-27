import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import about_us from "../../../documents/about_us";

export default function ParentViewEventDetails({ route, navigation }) {
  const { title, titleParam } = route.params;
  const { status, linkParam } = route.params;
  const { Date, categoryParam } = route.params;
  const { description, descriptionParam } = route.params;
  return (
    <View style={styles.container}>
      <HeaderBack title={"Event Detail"} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll_view}>
        <View style={styles.detail_box}>
          <Text style={styles.head_text}>{title}</Text>
          <View style={styles.detail}>
            {/* Date */}
            <Text>
              <Text style={styles.bold_text}>Status: </Text>
              <Text style={styles.data}>{status}</Text>
            </Text>
            {/* Posted by */}
            <Text>
              <Text style={styles.bold_text}>Date: </Text>
              <Text style={styles.data}>{Date}</Text>
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
