import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import { AccessLevel } from "../../../components/dropdown";
import SmallButton from "../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import { Snackbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { UploadDocument } from "../../../components";
import mime from "mime";
import AsyncStorage from "@react-native-community/async-storage";
import * as DocumentPicker from "expo-document-picker";

export default function EditMyJournal({ route, navigation }) {
  const { jID, docIdParam } = route.params; // ! Current Event ID
  const { title, titleParam } = route.params;
  const { jAccess, docAccessParam } = route.params;
  const { description, descriptionParam } = route.params;
  const { jImage, docImageParam } = route.params;

  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [image, setImage] = useState({
    name: jImage.split("https://3dsco.com/images/")[1],
    uri: jImage,
  });
  const [updateTitle, setUpTitle] = useState(title);
  const [loading, setloading] = useState(false);
  const [upDescription, setUpDescription] = useState(description);
  const [access, setAccess] = useState({ name: jAccess, id: jAccess });
  const pickImg = async () => {
    console.log("first");
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    if (result.uri) {
      setImage(result);
    }
  };

  const updateDocument = async () => {
    setloading(true);
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    console.log(updateTitle, access, upDescription, loginUID, jID, image);
    const myHeaders = myHeadersData();
    var urlencoded = new FormData();
    urlencoded.append("update_journals", "1");
    urlencoded.append("titel", updateTitle);
    urlencoded.append("access_level", access?.name);
    urlencoded.append("description", upDescription);
    urlencoded.append("user_id", myData.id);
    urlencoded.append("id", jID);
    urlencoded.append("image", {
      uri: image.uri, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(image.uri),
      name: image.name,
    });
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: {
        myHeaders,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setloading(false);
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.navigate("MyJournal");
        } else {
          setloading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      });
  };
  // ** Use Effect To get value of each and every Field
  const [showResults, setShowResults] = useState(false);
  const [showDocResults, setShowDocResults] = useState(true);

  const onClick = () => {
    setShowResults(true);
  };
  const onClickDoc = () => {
    setShowDocResults(false);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack
        title={"Update Journal"}
        onPress={() => navigation.navigate("MyJournal")}
      />
      <Snackbar
        visible={snackVisibleTrue}
        onDismiss={() => setSnackVisibleTrue(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "#82027D" } }}
      >
        {getMessageTrue}
      </Snackbar>
      <Snackbar
        visible={snackVisibleFalse}
        onDismiss={() => setSnackVisibleFalse(false)}
        action={{ label: "Close" }}
        theme={{ colors: { accent: "red" } }}
      >
        {getMessageFalse}
      </Snackbar>
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <InputField
                label={"Journal Title"}
                placeholder={"Journal Title"}
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
                    value={access}
                  />
                </>
              ) : (
                <>
                  <View style={styles.selectedDataCon}>
                    <Text>Access Level</Text>
                    <View style={styles.selectedData}>
                      <Text>{jAccess}</Text>
                      <TouchableOpacity onPress={onClick}>
                        <Text>close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
              {showDocResults ? (
                <>
                  <UploadDocument
                    type={"(pdf, doc, ppt,xls)"}
                    pickImg={pickImg}
                  />
                  <View>
                    {image?.name && (
                      <Text style={styles.uploadCon}>{image.name}</Text>
                    )}
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.selectedDataCon}>
                    <Text>Uploaded Document</Text>
                    <View style={styles.selectedData}>
                      {jImage && (
                        <Image
                          source={{ uri: jImage }}
                          style={styles.uploadImg}
                        />
                      )}
                      <TouchableOpacity onPress={onClickDoc}>
                        <Text>close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}

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
                  title="Save"
                  backgroundColor={color.purple}
                  fontFamily={"Montserrat-Bold"}
                  color={color.white}
                  loading={loading}
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
