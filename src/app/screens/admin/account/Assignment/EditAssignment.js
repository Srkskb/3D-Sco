import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import Input from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { UploadDocument } from "../../../../components";
import mime from "mime";
import * as DocumentPicker from "expo-document-picker";

export default function EditAssignment({ navigation, route }) {
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    setData(route.params);
  }, [route]);

  const pickImg = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.uri) {
      setImage(result);
    }
  };

  const editAssignment = () => {
    setloading(true);
    var data = new FormData();
    data.append("Update_courses_assignment", "1");
    data.append("user_id", data.userId);
    data.append("assignment_title", data.title);
    data.append("Description", data.description);
    data.append("course_id", data.course);
    data.append("id", data.id);
    data.append("image", {
      uri: image.uri, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(image.uri),
      name: image.name,
    });
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Cookie", "PHPSESSID=pae8vgg24o777t60ue1clbj6d5'");
    var config = {
      method: "POST",
      headers: myHeaders,
      body: data,
    };

    // axios(config)
    fetch("https://3dsco.com/3discoapi/studentregistration.php", config)
      .then((res) => res.json())
      .then(function (response) {
        if (res.success) {
          setloading(false);
          navigation.goBack();
        } else {
          setloading(false);
          console.log(res.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack title={"Edit Assignment"} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {
            setData((prev) => ({ ...prev, course: selectedItem.id }));
          }}
        />
        <Input
          value={data.title}
          onChangeText={(text) => setData((prev) => ({ ...prev, title: text }))}
          label={"Assignment Title"}
          placeholder={"Assignment Title"}
        />
        <Input
          label={"Description"}
          placeholder={"Description"}
          value={data.description}
          onChangeText={(text) => setData((prev) => ({ ...prev, description: text }))}
          multiline={true}
          numberOfLines={5}
          textAlignVertical={"top"}
        />
        <UploadDocument type={"File"} pickImg={pickImg} />
        <View>{image?.name && <Text style={styles.uploadCon}>{image.name}</Text>}</View>

        <View style={styles.button}>
        <SmallButton
                  title={"Cancel"}
                  color={color.purple}
                  fontFamily={"Montserrat-Medium"}
                  onPress={() => navigation.goBack()}
                />
          <SmallButton
            title="Update"
            onPress={() => editAssignment()}
            loading={loading}
            color={color.white}
            backgroundColor={color.purple}
            fontFamily={"Montserrat-Bold"}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
  },
  uploadCon: {
    textAlign: "right",
    color: "red",
  },
});
