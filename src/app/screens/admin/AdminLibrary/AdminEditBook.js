import React, { useState } from "react";
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
import SelectCourse from "../../../components/admin_required/SelectCourse";
import * as Yup from "yup";
import { Formik } from "formik";
import AsyncStorage from "@react-native-community/async-storage";
import * as DocumentPicker from "expo-document-picker";
import mime from "mime";

export default function AdminEditBook({ navigation, route }) {
  const [data, setData] = useState(route.params.list);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({ name: data?.course_id, id: data?.course_id });
  const [image, setImage] = useState("");
  const [doc, setDoc] = useState("");

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
  const editCourse = async (values) => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    setLoading(true);
    let payload = new FormData();
    payload.append("update_book", "1");
    payload.append("title", values?.bookTitle);
    payload.append("course_id", values?.courseId);
    payload.append("detail", values?.description);
    payload.append("author", values?.author);
    payload.append("publisher", values?.publisher);
    payload.append("user_id", myData?.id);
    payload.append("id", data?.id);
    payload.append("image", {
      uri: image.uri, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(image.uri),
      name: image.name,
    });
    payload.append("pdf", {
      uri: doc.uri, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(doc.uri),
      name: doc.name,
    });
    console.log("value", payload);

    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: "PHPSESSID=a780e1f8925e5a3d9ebcdbb058ff0885",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (res.success == 1) {
          setLoading(false);
          // navigation.navigate("AdminManageLibrary");
          navigation.goBack();
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <HeaderBack title={"Edit Book"} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            courseId: data?.courseId,
            bookTitle: data?.titel,
            author: data?.author,
            publisher: data?.publisher,
            description: data?.detail,
          }}
          validationSchema={Yup.object().shape({
            courseId: Yup.string().required("Category is required"),
            bookTitle: Yup.string().required("Book Title is required"),
            author: Yup.string().required("author is required"),
            publisher: Yup.string().required("Publisher is required"),
            description: Yup.string().required("Description is required"),
          })}
          onSubmit={(values) => editCourse(values)}
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
