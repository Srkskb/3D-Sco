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
export default function EditMyProjects({ route, navigation }) {
  const { projectID, docIdParam } = route.params; // ! Current Event ID
  const { title, titleParam } = route.params;
  const [loading, setloading] = useState(false);
  const { duration, durationParam } = route.params;
  const { description, descriptionParam } = route.params;
  const { pjImage, pjImageParam } = route.params;

  const [access, setAccess] = useState("Private");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [image, setImage] = useState(pjImage);
  const [updateTitle, setUpTitle] = useState(title);
  const [upDescription, setUpDescription] = useState(description);
  const [upDuration, setUpDuration] = useState(duration);

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
    setloading(true);
    console.log(projectID,updateTitle,loginUID,upDuration,description,image)
    const myHeaders = myHeadersData();

    var urlencoded = new FormData();
    urlencoded.append("update_project", "1");
    urlencoded.append("id", projectID);
    urlencoded.append("titel", updateTitle);
    urlencoded.append("user_id", loginUID);
    urlencoded.append("project_duration", upDuration);
    urlencoded.append("description", description);
    urlencoded.append("image", {
      uri: image, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(image),
      name: `abc.jpg`,
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
          navigation.navigate("MyProjects");
        } else {
          setloading(false);
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      });
  };
  // ** Use Effect To get value of each and every Field
  const [showDocResults, setShowDocResults] = useState(false);
  const onClickDoc = () => {
    setShowDocResults(true);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack
        title={"Update Project"}
        onPress={() => navigation.navigate("MyProjects")}
      />
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
                      {pjImage && (
                        <Image
                          source={{ uri: pjImage }}
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
                label={"Project Duration"}
                placeholder={"Project Duration"}
                name="title"
                  onChangeText={(text) => setUpDuration(text)}
                value={upDuration}
                keyboardType="text"
              />
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
                  title="Update"
                  backgroundColor={color.purple}
                  fontFamily={"Montserrat-Bold"}
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
