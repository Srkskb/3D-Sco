import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../../../assets/themes/Color";
import Account_Tabs from "../../../components/Account_Tabs";
import { useNavigation } from "@react-navigation/native";
import HomeHeader from "../../../components/header/HomeHeader";
export default function Account() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader navigation={navigation}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <View style={styles.main_container}>
            <View
              style={[
                styles.vertical_list,
                { borderColor: color.gray, borderRightWidth: 1 },
              ]}
            >
              {/* <Account_Tabs
                imgsrc={require("./../../../assets/images/account/mail.png")}
                title={"Mail"}
                onPress={() => navigation.navigate("StudentMailPage")}
              /> */}

              <Account_Tabs
                imgsrc={require("./../../../assets/images/account/file.png")}
                title={"File Cabinet"}
                onPress={() => navigation.navigate("FileCabinet")}
              />

              <Account_Tabs
                imgsrc={require("./../../../assets/images/account/unknown.png")}
                title={"My Resources"}
                onPress={() => navigation.navigate("MyResources")}
              />

              {/* <Account_Tabs
                imgsrc={require("./../../../assets/images/account/unknown.png")}
                title={"Previous courses"}
                onPress={() => navigation.navigate("PreviousCourses")}
              /> */}

              <Account_Tabs
                imgsrc={require("./../../../assets/images/account/journal.png")}
                title={"My Journal"}
                onPress={() => navigation.navigate("MyJournal")}
              />

              <Account_Tabs
                imgsrc={require("./../../../assets/images/account/file.png")}
                title={"My Projects"}
                onPress={() => navigation.navigate("MyProjects")}
              />
              <Account_Tabs
                imgsrc={require("./../../../assets/images/account/blogs.png")}
                title={"Blogs"}
                onPress={() => navigation.navigate("Blogs")}
              />
            </View>
            <View style={styles.vertical_list}>
              <Account_Tabs
                imgsrc={require("./../../../assets/images/account/calendar.png")}
                title={"Event Calendar"}
                onPress={() => navigation.navigate("Calendar")}
              />

              <Account_Tabs
                imgsrc={require("./../../../assets/images/account/library.png")}
                title={"Library Acess"}
                onPress={() => navigation.navigate("LibraryAccess")}
              />

              <Account_Tabs
                imgsrc={require("./../../../assets/images/account/room_access.png")}
                title={"Course room"}
                onPress={() => navigation.navigate("CourceRoomAccess")}
              />

              {/* <Account_Tabs
                imgsrc={require("./../../../assets/images/account/unknown.png")}
                title={"Course presently enrolled in"}
                onPress={() => navigation.navigate("CoursePresentlyEnrolled")}
              /> */}

              <Account_Tabs
                imgsrc={require("./../../../assets/images/account/links.png")}
                title={"Store Favorite Links (Weblinks)"}
                onPress={() => navigation.navigate("StoreFavoriteLinks")}
              />
              
              {/* <Account_Tabs
                imgsrc={require("./../../../assets/images/account/file.png")}
                title={"Export Content"}
                onPress={() => navigation.navigate("ExportContent")}
              /> */}
            </View>
          </View>
        </View>
        <View style={{ height: 10 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main_container: {
    backgroundColor: color.gray_light,
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
  },
  vertical_list: {
    width: "50%",
    paddingVertical: 20,
  },
});
