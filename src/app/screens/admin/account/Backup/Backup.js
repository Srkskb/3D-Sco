import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, Platform, Linking } from "react-native";
import color from "../../../../assets/themes/Color";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../../components/header/Header";
import { myHeadersData } from "../../../../api/helper";
import { NoDataFound } from "../../../../components";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import FileCabinet2 from "../../../../components/card/FileCabinet2";
import * as qs from "qs";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import Loader from "../../../../utils/Loader";
// import * as MediaLibrary from "expo-media-library";
// import { requestPermissionsAsync } from "expo-media-library";
import { StorageAccessFramework } from "expo-file-system";
import { Snackbar } from "react-native-paper";

export default function Backup() {
  const navigation = useNavigation();
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const [selectCourse, setSelectCourse] = useState("Select Course");
  const [fileCabinetData, setFileCabinetData] = useState([]);
  const [color, changeColor] = useState("red");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("fileCabinetData", fileCabinetData);
  const allLearnerList = (id) => {
    setLoading(true);
    const myHeaders = myHeadersData();
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://3dsco.com/3discoapi/studentregistration.php?backup_course_id=1&course_id=${id}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setFileCabinetData(result?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  const deleteEvent = (id) => {
    var data = qs.stringify({
      delete_backup: "1",
      id: id,
    });
    var config = {
      method: "post",
      url: "https://3dsco.com/3discoapi/studentregistration.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "PHPSESSID=n1c8fh1ku6qq1haio8jmfnchv7",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log("dele for", response);
        if (response.data.success == 1) {
          // allLearnerList();
          setFileCabinetData((prev) => prev.filter((item) => item.id != id));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    // allLearnerList();
    setTimeout(() => {
      changeColor("green");
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    // allLearnerList();
    navigation.addListener("focus", () => setFileCabinetData([]));
    // setFileCabinetData([]);
  }, [navigation]);

  const downloadFile = (url) => {
    Linking.openURL(url);
    return;
    // console.log("url", url);
    // const fileUri = url;
    // const downloads = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    // console.log("Downloads:", downloads);
    // // const fileUri = 'https://example.com/file.pdf'; // replace with your file URL
    // const fileExtension = fileUri.split(".").pop(); // get the file extension
    // console.log(FileSystem.documentDirectory + "file." + fileExtension, "pathhhhh");
    // const downloadResumable = FileSystem.createDownloadResumable(
    //   fileUri,
    //   FileSystem.documentDirectory + "file." + fileExtension
    // );

    // try {
    //   const { uri } = await downloadResumable.downloadAsync();
    //   console.log("File downloaded at:", uri);
    // } catch (error) {
    //   console.error(error);
    // }
    // let filePath = FileSystem.documentDirectory + "Images/";
    // let filename = "file.zip";
    // saveQRAsImage(filePath, filename, uri);
    // FileSystem.downloadAsync(uri, fileUri)
    //   .then(async (res) => {
    //     const permission = await requestPermissionsAsync();
    //     if (permission.status === "granted") {
    //       MediaLibrary.createAssetAsync(res.uri)
    //         .then((asset) => {
    //           console.log("asset", asset);
    //           MediaLibrary.createAlbumAsync("myfolder", asset)
    //             .then((res) => {
    //               console.log(res);
    //             })
    //             .catch((error) => {
    //               console.log(error);
    //             });
    //         })
    //         .catch((er) => console.log(er));
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // };
    // const saveQRAsImage = async (qrImagesDirectory, fileName, imageSource) => {
    //   //Get folder
    //   const folder = await FileSystem.getInfoAsync(qrImagesDirectory);
    //   console.log(folder, "folder");
    //   // Check if folder does not exist, create one furthermore
    //   if (!folder.exists) {
    //     await FileSystem.makeDirectoryAsync(qrImagesDirectory).then((res) =>
    //       console.log(res, "exists").catch((er) => console.log(er, "err exists"))
    //     );
    //   }

    // Write file into the source of program
    // await FileSystem.writeAsStringAsync(qrImagesDirectory + fileName, imageSource, {
    //   encoding: FileSystem.EncodingType.Base64,
    // })
    //   .then((res) => console.log(res, "finalres"))
    //   .catch((er) => console.log(er, "lasterr"));

    // const ans = await FileSystem.getInfoAsync(qrImagesDirectory + fileName);

    // Make the file accessible through mobile phone
    // FileSystem.getContentUriAsync(ans.uri).then((cUri) => {
    //   //Open save image options
    //   IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
    //     data: cUri,
    //     flags: 1,
    //   });
    // });
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={"Backup"} onPress={() => navigation.goBack()} />
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
      {loading && <Loader />}
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ paddingHorizontal: 10 }}
      >
        <TextWithButton title={"Course Category"} label={"+Add"} onPress={() => navigation.navigate("AddBackup")} />
        <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {
            allLearnerList(selectedItem.id);
          }}
          // value={selectCourse}
        />
        <View>
          {fileCabinetData?.length ? (
            fileCabinetData?.map((list, index) => (
              <FileCabinet2
                key={index}
                list={list}
                title={list.title}
                description={list.detail}
                onPressEdit={() =>
                  navigation.navigate("EditBackup", {
                    title: list,
                  })
                }
                onPressView={() => downloadFile(list.file_name)}
                removePress={() => deleteEvent(list.id)}
              />
            ))
          ) : (
            <NoDataFound />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
    textAlign: "left",
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
  },
  manage: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: color.dark_gray,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: color.black,
    textTransform: "uppercase",
  },
});
