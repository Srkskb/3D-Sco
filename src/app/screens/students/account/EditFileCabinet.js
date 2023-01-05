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
import { myHeadersData } from "../../../api/helper";
import { Snackbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { UploadDocument } from "../../../components";
import mime from "mime";
import axios from "axios";

export default function EditFileCabinet({ route, navigation }) {
  const { docId, docIdParam } = route.params; // ! Current Event ID
  const { title, titleParam } = route.params;
  const { docAccess, docAccessParam } = route.params;
  const { description, descriptionParam } = route.params;
  const { docImage, docImageParam } = route.params;
  const [access, setAccess] = useState(docAccess);
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [image, setImage] = useState(docImage);

  const [updateTitle, setUpTitle] = useState(title);
  const [upDescription, setUpDescription] = useState(description);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const updateDocument = (values) => {
    // const myHeaders = myHeadersData();
    // console.log(updateTitle, access, docId, upDescription, loginUID, image);
    // var urlencoded = new FormData();
    // urlencoded.append("update_documents", "1");
    // urlencoded.append("titel", updateTitle);
    // urlencoded.append("access", access);
    // urlencoded.append("id", docId);
    // urlencoded.append("description", upDescription);
    // urlencoded.append("student_id", loginUID);
    // urlencoded.append("image", {
    //   uri: image, //"file:///" + image.split("file:/").join(""),
    //   type: mime.getType(image),
    //   name: `abc.jpg`,
    // });
    // fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
    //   method: "POST",
    //   body: urlencoded,
    //   headers: {
    //     myHeaders,
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //     if (res.success == 1) {
    //       setSnackVisibleTrue(true);
    //       setMessageTrue(res.message);
    //       navigation.navigate("FileCabinet");
    //     } else {
    //       setSnackVisibleFalse(true);
    //       setMessageFalse(res.message);
    //     }
    //   });
    var data = new FormData();
data.append('update_documents', '1');
data.append('titel', updateTitle);
data.append('access', access);
data.append('id', docId);
data.append('description', upDescription);
data.append('student_id', loginUID);
data.append('image', {
  uri: image,//"file:///" + image.split("file:/").join(""),
  type: mime.getType(image),
 name: `abc.jpg`
});

var config = {
  method: 'post',
  url: 'https://3dsco.com/3discoapi/3dicowebservce.php',
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'PHPSESSID=80v5ri841lnv0mm25nrbq2tl83', 
    ...data
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  if(response.data.success==1){
    navigation.navigate("Filecabinet")
  }
})
.catch(function (error) {
  console.log(error);
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
      <HeaderBack
        title={"Update Document"}
        onPress={() => navigation.navigate("FileCabinet")}
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
              {showDocResults ? (
                <>
                  <UploadDocument onPress={pickImage} />
                  <View style={styles.uploadCon}>
                    {image && (
                      <Image source={{ uri: image }} style={styles.uploadImg} />
                    )}
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.selectedDataCon}>
                    <Text>Uploaded Document</Text>
                    <View style={styles.selectedData}>
                      {docImage && (
                        <Image
                          source={{ uri: docImage }}
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
                />
                <SmallButton
                  onPress={updateDocument}
                  title="Save"
                  backgroundColor={color.purple}
                  fontFamily={"Montserrat-Bold"}
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
    textAlign: "center",
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
