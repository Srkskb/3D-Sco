import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, Image, TouchableOpacity } from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import { AccessLevel } from "../../../components/dropdown";
import SmallButton from "../../../components/buttons/SmallButton";
import { myHeadersData } from "../../../api/helper";
import { Snackbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { UploadDocument } from "../../../components";
import mime from "mime";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-community/async-storage";

export default function AdminEditFileCabinet({ route, navigation }) {
  const { docId, title, docAccess, description, docImage } = route.params;
  const [access, setAccess] = useState(docAccess);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [image, setImage] = useState({ name: docImage.split("/").pop(), uri: docImage });
  const [loading, setLoading] = useState(false);

  const [updateTitle, setUpTitle] = useState(title);
  const [upDescription, setUpDescription] = useState(description);

  const pickImg = async () => {
    console.log("first");
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    console.log(result);
    if (result.uri) {
      setImage(result);
    }
  };

  const updateDocument = async (values) => {
    setLoading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    // const myHeaders = myHeadersData();
    var urlencoded = new FormData();
    urlencoded.append("update_documents", "1");
    urlencoded.append("titel", updateTitle);
    urlencoded.append("access", access);
    urlencoded.append("id", docId);
    urlencoded.append("description", upDescription);
    urlencoded.append("student_id", myData.id);
    {
      !image.uri.includes("http") &&
        urlencoded.append("image", {
          uri: image.uri,
          type: mime.getType(image.uri),
          name: image.name,
        });
    }
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Cookie: "PHPSESSID=7fqo201rhcb95rof0rq6hg3jm3",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setLoading(false);
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("AdminCabinet");
        } else {
          setLoading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      });
  };
  // ** Use Effect To get value of each and every Field
  const [showResults, setShowResults] = useState(false);
  const [showDocResults, setShowDocResults] = useState(false);

  const onClick = () => {
    setShowResults(true);
  };
  const onClickDoc = () => {
    setShowDocResults(true);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack title={"Update Document"} onPress={() => navigation.navigate("AdminCabinet")} />
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
        wrapperStyle={{ zIndex: 1 }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
        wrapperStyle={{ zIndex: 1 }}
      >
        {getMessageFalse}
      </Snackbar>
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <InputField
                label={"Document Title"}
                placeholder={"Document Title"}
                name="title"
                onChangeText={(text) => setUpTitle(text)}
                value={updateTitle}
                keyboardType="text"
              />

              {showResults ? (
                <>
                  <AccessLevel
                    required
                    label={"Access Level"}
                    onSelect={(selectedItem) => {
                      setAccess(selectedItem);
                    }}
                  />
                </>
              ) : (
                <>
                  <View style={styles.selectedDataCon}>
                    <Text>Access Level</Text>
                    <View style={styles.selectedData}>
                      <Text>{docAccess}</Text>
                      <TouchableOpacity onPress={onClick}>
                        <Text>close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
              {/* {showDocResults ? (
                <> */}
              <UploadDocument type={"pdf"} pickImg={pickImg} />
              <View>{image?.name && <Text style={styles.uploadCon}>{image.name}</Text>}</View>
              {/* </> */}
              {/* // ) : (
              //   <>
              //     <View style={styles.selectedDataCon}>
              //       <Text>Uploaded Document</Text>
              //       <View style={styles.selectedData}>
              //         {docImage && <Image source={{ uri: docImage }} style={styles.uploadImg} />}
              //         <TouchableOpacity onPress={onClickDoc}>
              //           <Text>close</Text>
              //         </TouchableOpacity>
              //       </View>
              //     </View>
              //   </>
              // )} */}

              <InputField
                label={"Description"}
                placeholder={"Description"}
                name="description"
                multiline={true}
                numberOfLines={6}
                keyboardType="default"
                textAlignVertical="top"
                onChangeText={(text) => setUpDescription(text)}
                value={upDescription}
              />

              <View style={styles.button}>
                <SmallButton
                  title={"Cancel"}
                  color={color.purple}
                  fontFamily={"Montserrat-Medium"}
                  onPress={() => navigation.goBack()}
                />
                <SmallButton
                  onPress={updateDocument}
                  loading={loading}
                  title="Update"
                  backgroundColor={color.purple}
                  fontFamily={"Montserrat-Bold"}
                  color={color.white}
                />
              </View>
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
    padding: 20,
  },

  description: {
    fontFamily: "Montserrat-Medium",
    fontSize: 13,
    textAlign: "justify",
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
  },
  uploadImg: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 5,
  },
  uploadCon: {
    textAlign: "right",
    color: "red",
  },
  selectedData: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    paddingRight: 20,

    borderWidth: 2,
    borderColor: color.gray,
    borderRadius: 8,
  },
});
