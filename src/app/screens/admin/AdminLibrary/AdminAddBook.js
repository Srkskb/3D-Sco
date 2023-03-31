import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import { Image } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Edit, Remove, ViewButton } from "../../../components/buttons";
import CommonDropdown from "../../../components/dropdown/CommonDropdown";
import Input from "../../../components/inputs/Input";
import { UploadDocument } from "../../../components";
import SmallButton from "../../../components/buttons/SmallButton";
import * as DocumentPicker from "expo-document-picker";
import adminServices from "../../../services/admin/adminServices";
import * as qs from "qs";
import { Snackbar } from "react-native-paper";
import SelectCourse from "../../../components/admin_required/SelectCourse";
import AsyncStorage from "@react-native-community/async-storage";
import mime from "mime";

export default function AdminAddBook({ navigation }) {
  const [access, setAccess] = useState("Private");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [loading, setloading] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [image, setImage] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const initialObj = {
    add_book: "",
    title: "",
    course_id: "",
    detail: "",
    author: "",
    image: "",
    pdf: "",
    publisher: "",
    user_id: "",
  };
  const [bookData, setBookData] = useState(initialObj);

  useEffect(() => {
    (async () => {
      const res = await adminServices.getCourseList({ userId: 163, id: 16 });
      setCourseList(res?.data);
    })();
  }, []);

  const handleCreateBook = async () => {
    setloading(true);
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    var data = new FormData();
    data.append("add_book", "1");
    data.append("title", bookData?.title);
    data.append("course_id", bookData?.course_id);
    data.append("detail", bookData?.detail);
    data.append("author", bookData?.author);
    data.append("pdf", {
      uri: bookData?.pdf.uri, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(bookData?.pdf.uri),
      name: bookData?.pdf.name,
    });
    data.append("image", {
      uri: bookData?.image.uri, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(bookData?.image.uri),
      name: bookData?.image.name,
    });
    data.append("publisher", bookData?.publisher);
    data.append("user_id", userData.id);

    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: "PHPSESSID=8us3uou5gm35l17b3eo0lfb334",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (res.success == 1) {
          setBookData(initialObj);
          setSnackVisibleTrue(true);
          setLoading(false);
          navigation.navigate("AdminLibrary");
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const pickPdf = async () => {
    console.log("pdf");
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    console.log(result);
    if (result.uri) {
      // setImage(result);
      setBookData((prev) => ({ ...prev, pdf: { name: result?.name, uri: result?.uri } }));
    }
    return;
  };
  const pickImg = async () => {
    console.log("first");
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    console.log(result);
    if (result.uri) {
      // setImage(result);
      setBookData((prev) => ({ ...prev, image: { name: result?.name, uri: result?.uri } }));
    }
  };
  return (
    <View style={styles.container}>
      <HeaderBack title={"Add Book"} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scroll_view}>
          {/* <CommonDropdown
            value={courseList.map((item) => ({ name: item?.Course, id: item?.id }))}
            label={"Course"}
            marginBottom={10}
            onChange={(item) => setBookData((prev) => ({ ...prev, course_id: item?.id }))}
          /> */}
          <SelectCourse
            onSelect={(selectedItem, index) => {
              console.log(selectedItem);
              // setSelectCourseId(selectedItem.id);
              setBookData((prev) => ({ ...prev, course_id: selectedItem?.id }));
            }}
          />
          <Input
            value={bookData?.title}
            onChangeText={(title) =>
              setBookData((prev) => ({ ...prev, title }))
            }
            label={"Book Title"}
            placeholder={"Enter Book Name"}
          />
          <Input
            value={bookData?.author}
            onChangeText={(author) =>
              setBookData((prev) => ({ ...prev, author }))
            }
            label={"Author"}
            placeholder={"Enter Author Name"}
          />
          <Input
            value={bookData?.publisher}
            onChangeText={(publisher) =>
              setBookData((prev) => ({ ...prev, publisher }))
            }
            label={"Publisher"}
            placeholder={"Enter Publisher Name"}
          />
          <UploadDocument
            onChange={(e) =>
              setBookData((prev) => ({
                ...prev,
                pdf: { name: e?.name, uri: e?.uri },
              }))
            }
            pickImg={() => pickPdf()}
            // onChange={(e) => setBookData((prev) => ({ ...prev, pdf: { name: e?.name, uri: e?.uri } }))}
            type={"Book (pdf)"}
          />
          {bookData?.pdf?.name && (
            <Text style={{ textAlign: "right" }}>{bookData?.pdf?.name}</Text>
          )}
          <UploadDocument
            onChange={(e) =>
              setBookData((prev) => ({
                ...prev,
                image: { name: e?.name, uri: e?.uri },
              }))
            }
            pickImg={() => pickImg()}
            // onChange={(e) => setBookData((prev) => ({ ...prev, image: { name: e?.name, uri: e?.uri } }))}
            type={"Book (Image)"}
          />
          {bookData?.image?.name && (
            <Text style={{ textAlign: "right" }}>{bookData?.image?.name}</Text>
          )}

          <Input
            label={"Description"}
            value={bookData?.detail}
            placeholder={"Enter your book description"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            onChangeText={(detail) =>
              setBookData((prev) => ({ ...prev, detail }))
            }
          />
          <View style={styles.button}>
          <SmallButton
                  title={"Cancel"}
                  color={color.purple}
                  fontFamily={"Montserrat-Medium"}
                  onPress={() => navigation.goBack()}
                />
            <SmallButton
              title="Save"
              loading={loading}
              onPress={handleCreateBook}
              color={color.white}
              backgroundColor={color.purple}
              fontFamily={"Montserrat-Bold"}
            />
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={snackVisibleTrue}
        style={{ backgroundColor: "green" }}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
        duration={2000}
      >
        <Text>Book Added SuccessFully</Text>
      </Snackbar>
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
    marginTop: 20,
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
    padding: 15,
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
  },
});
