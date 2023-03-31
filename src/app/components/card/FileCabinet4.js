import { View, Text, StyleSheet, Linking } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import { Remove, Edit, ViewButton } from "../buttons";
// import RNFS from "react-native-fs";

export default function FileCabinet4({
  access,
  list,
  title,
  description,
  removePress,
  onPress,
  onPressEdit,
  onPressView,
}) {
  // const onPressView = async () => {
  //   // const fileUrl = list?.file_name;
  //   // Linking.openURL(fileUrl);
  //   // const { uri: localUri } = await FileSystem.downloadAsync(remoteUri, FileSystem.documentDirectory + 'name.ext');
  //   fetch(list?.file_name)
  //     .then((response) => {
  //       // Check if the response is successful
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       // Get the binary data from the response
  //       return response.arrayBuffer();
  //     })
  //     .then((data) => {
  //       console.log("data", data);
  //       // Convert the binary data to a Blob object
  //       const blob = new Blob([data], { type: "application/zip" });
  //       console.log("blob", blob);
  //       // Save the Blob object to a file
  //       // console.log("RNFS.DocumentDirectoryPath", RNFS.DocumentDirectoryPath);
  //       // const filePath = RNFS.DocumentDirectoryPath + "/file.zip";
  //       // return RNFS.writeFile(filePath, blob, "binary");
  //     })
  //     .then(() => {
  //       console.log("File downloaded successfully");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.right_side}>
          <View style={styles.arrow_container}>
            <Text style={styles.head_text}>{title}</Text>
            <Text style={styles.status_text}>{access}</Text>
          </View>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.viewbutton}>
        <Edit onPress={onPressEdit} />
        {/* <View style={{ width: 40 }}></View> */}
        {/* <ViewButton
          title={"View"}
          color={color.white}
          backgroundColor={color.purple}
          fontFamily={"Montserrat-Bold"}
          onPress={() => onPressView()}
        /> */}
        {/* <View style={{ width: 60 }}></View> */}
        <Remove onPress={removePress} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.light_skyblue,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  left_side: {
    width: "10%",
  },
  right_side: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  text_container: {
    width: "90%",
    alignSelf: "flex-end",
    paddingHorizontal: 10,
  },
  description_text: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    width: "100%",
  },
  head_text: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
  },
  status_text: {
    color: color.dark_gray,
    fontSize: 14,
    alignSelf: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  viewbutton: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    flexDirection: "row",
  },
  arrow_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
