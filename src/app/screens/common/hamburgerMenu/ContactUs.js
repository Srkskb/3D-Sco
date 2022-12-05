import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import color from "../../../assets/themes/Color";
import HeaderBack from "./../../../components/header/Header";
import contact_us from "../../../documents/contact_us";
import HomeHeader from "../../../components/header/HomeHeader";

export default function ContactUs({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      {/* <HeaderBack
        title={"contact us"}
        onPress={() => navigation.navigate("HomeScreen")}
      /> */}
      <HomeHeader navigation={navigation} title={"Contact Us"}/>
      <View style={styles.main}>
        <ScrollView>
          <View>
            <Text style={styles.dataline}>{contact_us}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.dataline}>• By email: </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "mailto:3dscosmart@gmail.com?subject=SendMail&body=Description"
                  )
                }
                title="3dscosmart@gmail.com"
              >
                <Text style={[styles.dataline,{color:color.purple}]}>3dscosmart@gmail.com</Text>
              </TouchableOpacity>
            </View>
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
  main: {
    flex: 1,
    backgroundColor: color.gray_white,
    margin: 20,
    padding: 20,
  },
  headline: {
    fontFamily: "Montserrat-Bold",
    color: color.purple,
    textTransform: "uppercase",
    marginBottom: 20,
    fontSize: 14,
  },
  dataline: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: color.black,
  },
});
