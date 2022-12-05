import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import SmallButton from "../../../components/buttons/SmallButton";
import { UploadDocument } from "../../../components";
import * as ImagePicker from "expo-image-picker";
import { myHeadersData } from "../../../api/helper";
import { Snackbar } from "react-native-paper";
import mime from "mime";
export default function AddEditStudentCorner({ route, navigation }) {
  const { accomplishments, accomplishmentsParam } = route.params;
  const { objective, objectiveParam } = route.params;
  const { philosophy, philosophyParam } = route.params;
  const { skills, skillsParam } = route.params;
  const { userProfileImage, ProfileImageParam } = route.params;
  const { userResume, ResumeParam } = route.params;
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [getAccomplish, setAccomplish] = useState(accomplishments);
  const [getObjectives, setObjectives] = useState(objective);
  const [getPhilosophy, setPhilosophy] = useState(philosophy);
  const [getSkills, setSkills] = useState(skills);
  const [getImage, setImage] = useState(userProfileImage);
  const [resume, setResume] = useState(userResume);

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
  const pickResume = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setResume(result.uri);
    }
  };
  const uploadDoc = (values) => {
    const myHeaders = myHeadersData();
    console.log(
      "000000.....",
      loginUID,
      getAccomplish,
      getObjectives,
      getPhilosophy,
      getSkills,
      getImage,
      resume
    );
    var formdata = new FormData();
    formdata.append("cover_letter", "1");
    formdata.append("type", "1");
    formdata.append("id", loginUID);
    formdata.append("accomplish", getAccomplish);
    formdata.append("objectives", getObjectives);
    formdata.append("philosophy", getPhilosophy);
    formdata.append("skills", getSkills);
    formdata.append("image", getImage);
    formdata.append("image", {
      uri: resume,
      type: mime.getType(getImage),
      name: `abc.jpg`,
    });
    formdata.append("resume", {
      uri: resume,
      type: mime.getType(resume),
      name: `abc.jpg`,
    });
    fetch("https://3dsco.com/3discoapi/studentregistration.php", {
      method: "POST",
      body: formdata,
      headers: {
        myHeaders,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success == 1) {
          setSnackVisibleTrue(true);
          setMessageTrue(res.message);
          navigation.goBack();
        } else {
          setSnackVisibleFalse(true);
          setMessageFalse(res.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <HeaderBack
        title={"Update Profile Details"}
        onPress={() => navigation.navigate("StudentCorner")}
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
          <View style={{ paddingVertical: 10 }}>
            <View>
              <UploadDocument type={"Profile Picture"} onPress={pickImage} />
              <View style={styles.uploadCon}>
                {getImage && (
                  <Image source={{ uri: getImage }} style={styles.uploadImg} />
                )}
              </View>

              <UploadDocument type={"Document"} onPress={pickResume} />
              <View style={styles.uploadCon}>
                {resume && (
                  <Image source={{ uri: resume }} style={styles.uploadImg} />
                )}
              </View>
              <InputField
                label={"Education Accomplishments"}
                placeholder={"Education Accomplishments"}
                name="getAccomplish"
                multiline={true}
                numberOfLines={6}
                onChangeText={(text) => setAccomplish(text)}
                value={getAccomplish}
                keyboardType="default"
                textAlignVertical="top"
              />
              <InputField
                label={"Objective"}
                placeholder={"Objective"}
                name="getObjectives"
                multiline={true}
                numberOfLines={6}
                onChangeText={(text) => setObjectives(text)}
                value={getObjectives}
                keyboardType="default"
                textAlignVertical="top"
              />
              <InputField
                label={"Philosophy"}
                placeholder={"Philosophy"}
                name="getPhilosophy"
                multiline={true}
                numberOfLines={6}
                onChangeText={(text) => setPhilosophy(text)}
                value={getPhilosophy}
                keyboardType="default"
                textAlignVertical="top"
              />
              <InputField
                label={"Skills"}
                placeholder={"Skills"}
                name="getSkills"
                multiline={true}
                numberOfLines={6}
                onChangeText={(text) => setSkills(text)}
                value={getSkills}
                keyboardType="default"
                textAlignVertical="top"
              />
              <View style={styles.button}>
                <SmallButton
                  title={"Cancel"}
                  color={color.purple}
                  fontFamily={"Montserrat-Medium"}
                />
                <SmallButton
                  onPress={uploadDoc}
                  title="Update"
                  color={color.white}
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
    paddingHorizontal: 20,
  },
  headline: {
    fontFamily: "Montserrat-Regular",
    color: "#081F32",
    marginBottom: 20,
    fontSize: 13,
  },
  calendar_input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: color.gray,
    borderRadius: 8,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    paddingRight: 20,
    marginBottom: 10,
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
  label_text: {
    color: color.black,
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
  },
});
