import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import { Image } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
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
import * as Yup from "yup";
import { Formik } from "formik";

export default function AdminAddBook({ navigation }) {
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [image, setImage] = useState("");
  const [doc, setDoc] = useState("");
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

  const handleCreateBook = async (bookData) => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    setLoading(true);
    var data = new FormData();
    data.append("add_book", "1");
    data.append("title", bookData?.bookTitle);
    data.append("course_id", bookData?.courseId);
    data.append("detail", bookData?.description);
    data.append("author", bookData?.author);
    data.append("pdf", {
      uri: doc.uri, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(doc.uri),
      name: doc.name,
    });
    data.append("image", {
      uri: image.uri, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(image.uri),
      name: image.name,
    });
    data.append("publisher", bookData?.publisher);
    data.append("user_id", userData.id);
    console.log("payload", data);

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=a780e1f8925e5a3d9ebcdbb058ff0885");

    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: data,
      headers: myHeaders,
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
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };
  const pickImg = async () => {
    console.log("first");
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    console.log(result);
    if (result.uri) {
      setImage(result);
    }
  };

  const pickImgPdf = async () => {
    console.log("first");
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/*",
    });
    console.log(result);
    if (result.uri) {
      setDoc(result);
    }
  };
  return (
    <View style={styles.container}>
      <HeaderBack title={"Add Book"} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            courseId: "",
            bookTitle: "",
            author: "",
            publisher: "",
            description: "",
          }}
          validationSchema={Yup.object().shape({
            courseId: Yup.string().required("Category is required"),
            bookTitle: Yup.string().required("Book Title is required"),
            author: Yup.string().required("author is required"),
            publisher: Yup.string().required("Publisher is required"),
            description: Yup.string().required("Description is required"),
          })}
          onSubmit={(values) => handleCreateBook(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
            <View style={styles.scroll_view}>
              <SelectCourse
                label={"Course"}
                onSelect={(selectedItem) => {
                  setFieldValue("courseId", selectedItem.id);
                  setSelectedCourse(selectedItem);
                }}
                value={selectedCourse}
              />
              <Input
                label={"Book Title"}
                placeholder={"Enter Book Name"}
                value={values?.bookTitle}
                onChangeText={handleChange("bookTitle")}
              />
              <Input
                label={"Author"}
                placeholder={"Enter Author Name"}
                value={values?.author}
                onChangeText={handleChange("author")}
              />
              <Input
                label={"Publisher"}
                placeholder={"Enter Publisher Name"}
                value={values?.publisher}
                onChangeText={handleChange("publisher")}
              />
              <UploadDocument pickImg={pickImgPdf} type={"Book (pdf,doc,ppt,xls)"} />
              {doc?.name && <Text style={{ color: "red", textAlign: "right" }}>{doc?.name}</Text>}
              <UploadDocument pickImg={pickImg} type={"Book Image"} />
              {image?.name && <Text style={{ color: "red", textAlign: "right" }}>{image?.name}</Text>}
              <Input
                label={"Description"}
                placeholder={"Enter your book description"}
                multiline={true}
                numberOfLines={6}
                textAlignVertical={"top"}
                value={values?.description}
                onChangeText={handleChange("description")}
              />
              <View style={styles.button}>
                <SmallButton
                  title={"Cancel"}
                  color={color.purple}
                  fontFamily={"Montserrat-Medium"}
                  onPress={() => navigation.goBack()}
                />

                <SmallButton
                  title="Update"
                  color={color.white}
                  backgroundColor={color.purple}
                  fontFamily={"Montserrat-Bold"}
                  onPress={() => handleSubmit()}
                  loading={loading}
                />
              </View>
            </View>
          )}
        </Formik>
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
