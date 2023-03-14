import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import InputField from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { UploadDocument } from "../../../../components";
import { myHeadersData } from "../../../../api/helper";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import mime from "mime";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from 'expo-document-picker';
export default function EditBackup({ navigation, route }) {
  const { title, titleParam, id } = route.params.title;
  const { docAccess, docAccessParam } = route.params;
  const { description, descriptionParam } = route.params;
  const { docImage, docImageParam } = route.params;
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState("Select Course");
  const loginUID = localStorage.getItem("loginUID");
  const [image, setImage] = useState(route.params.title.file_name);
  // const [showDocResults, setShowDocResults] = useState(false);
  const [updateTitle, setUpTitle] = useState(title);
  const [upDescription, setUpDescription] = useState(description);

  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type:'application/zip'
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const EditBackupFun = (values) => {
    console.log(values.docTitle, route.params.title.course_id, loginUID, values.description, route.params.title.id, mime.getType(image));

    const myHeaders = myHeadersData();
    var formdata = new FormData();
    formdata.append("Update_backup", "1");
    formdata.append("user_id", route.params.title.user_id);
    formdata.append("course_id", route.params.title.course_id);
    formdata.append("title", values.docTitle);
    formdata.append("detail", values.description);
    formdata.append("image", {
      uri: image, //"file:///" + image.split("file:/").join(""),
      type: mime.getType(image),
      name: `test.zip`,
    });
    formdata.append("id", route.params.title.id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        //Add navigation here
        navigation.navigate("Backup");
      })
      .catch((error) => console.log("error", error));
  };

  // const onClickDoc = () => {
  //   setShowDocResults(true);
  // };
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <HeaderBack title={"Edit Backup"} onPress={() => navigation.goBack()} />
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Formik
              initialValues={{
                docTitle: route.params.title.title,
                description: route.params.title.detail,
              }}
              validationSchema={Yup.object().shape({
                docTitle: Yup.string()
                  .required("Document Title is required")
                  .min(3, "Document Title must be at least 3 characters")
                  .max(50, "Document Title cannot be more than 50 characters"),
                description: Yup.string()
                  .required("Description is required")
                  .min(20, "Description must be at least 20 characters")
                  .max(250, "Description cannot be more than 50 characters"),
              })}
              onSubmit={(values) => EditBackupFun(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                <View>
                  <InputField
                    label={"Document Title"}
                    placeholder={"Document Title"}
                    name="title"
                    onChangeText={handleChange("docTitle")}
                    onBlur={handleBlur("docTitle")}
                    value={values.docTitle}
                    keyboardType="text"
                  />
                  {errors.docTitle && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.docTitle}</Text>
                  )}
                  {/* <AccessLevel
                    required
                    label={"Access Level"}
                    onSelect={(selectedItem, index) => {
                      setAccess(selectedItem);
                      console.log(selectedItem, index);
                    }}
                    value={access}
                  /> */}
                  <SelectCourse
                    label={"Select Course"}
                    onSelect={(selectedItem, index) => {
                      setCourse(index);
                      console.log(selectedItem, index);
                    }}
                    value={course}
                  />

                  {errors.selectedItem && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.selectedItem}</Text>
                  )}

                  <UploadDocument onPress={pickImage} />
                  <View style={styles.uploadCon}>
                    {image && <><Image source={require('../../../../assets/images/account/file.png')}
                    style={styles.uploadImg} resizeMode={'contain'} />
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>{image}</Text>
                    </>}
                  </View>
                  {/* <View style={styles.selectedDataCon}>
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
                  </View> */}
                  <InputField
                    label={"Description"}
                    placeholder={"Description"}
                    name="description"
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    keyboardType="default"
                    textAlignVertical="top"
                  />
                  {errors.description && (
                    <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>{errors.description}</Text>
                  )}

                  <View style={styles.button}>
                    <SmallButton
                      title={"Cancel"}
                      color={color.purple}
                      fontFamily={"Montserrat-Medium"}
                      onPress={() => console.log(route.params)}
                    />
                    <SmallButton
                      onPress={handleSubmit}
                      title="Save"
                      loading={loading}
                      color={color.white}
                      backgroundColor={color.purple}
                      fontFamily={"Montserrat-Bold"}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
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
  main: {
    flex: 1,
    padding: 20,
  },
  headline: {
    fontFamily: "Montserrat-Regular",
    color: "#081F32",
    marginBottom: 20,
    fontSize: 13,
  },
  datalines: {
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
    color: color.black,
    textAlign: "justify",
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    paddingBottom: 20,
    marginBottom: 20,
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
});
// import React, { useState } from "react";
// import { View, Text, StyleSheet, ScrollView, StatusBar, Image, TouchableOpacity } from "react-native";
// import color from "../../../../assets/themes/Color";
// import HeaderBack from "../../../../components/header/Header";
// import InputField from "../../../../components/inputs/Input";
// import { AccessLevel } from "../../../../components/dropdown";
// import SmallButton from "../../../../components/buttons/SmallButton";
// import { myHeadersData } from "../../../../api/helper";
// import { Snackbar } from "react-native-paper";
// import * as ImagePicker from "expo-image-picker";
// import { UploadDocument } from "../../../../components";
// import SelectCourse from "../../../../components/admin_required/SelectCourse";
// import mime from "mime";

// export default function EditBackup({ route, navigation }) {
//   const { docId, docIdParam } = route.params; // ! Current Event ID
//   const { title, titleParam } = route.params;
//   const { docAccess, docAccessParam } = route.params;
//   const { description, descriptionParam } = route.params;
//   const { docImage, docImageParam } = route.params;
//   const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
//   const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
//   const [getMessageTrue, setMessageTrue] = useState();
//   const [getMessageFalse, setMessageFalse] = useState();
//   const [course, setCourse] = useState(docAccess);
//   const loginUID = localStorage.getItem("loginUID");
//   const [image, setImage] = useState(docImage);
//   const [loading, setLoading] = useState(false);
//   const [updateTitle, setUpTitle] = useState(title);
//   const [upDescription, setUpDescription] = useState(description);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     console.log(result);
//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   const updateDocument = (values) => {
//     const myHeaders = myHeadersData();
//     console.log(updateTitle, route.params.title.id, upDescription, loginUID, image);
//     var urlencoded = new FormData();
//     urlencoded.append("Update_backup", "1");
//     urlencoded.append("title", updateTitle);
//     urlencoded.append("course_id", course);
//     urlencoded.append("id", route.params.title.id);
//     urlencoded.append("detail", upDescription);
//     urlencoded.append("student_id", loginUID);
//     // urlencoded.append("image", {
//     //   uri: image, //"file:///" + image.split("file:/").join(""),
//     //   type: mime.getType(image),
//     //   name: `abc.jpg`,
//     // });
//     fetch("https://3dsco.com/3discoapi/studentregistration.php", {
//       method: "POST",
//       body: urlencoded,
//       headers: {
//         myHeaders,
//         "Content-Type": "multipart/form-data",
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//         if (res.success == 1) {
//           setSnackVisibleTrue(true);
//           setMessageTrue(res.message);
//           console.log("res", route.params);
//           navigation.navigate("Backup");
//         } else {
//           setSnackVisibleFalse(true);
//           setMessageFalse(res.message);
//         }
//       });
//   };
//   // ** Use Effect To get value of each and every Field
//   const [showResults, setShowResults] = useState(false);
//   const [showDocResults, setShowDocResults] = useState(false);

//   const onClick = () => {
//     setShowResults(true);
//   };
//   const onClickDoc = () => {
//     setShowDocResults(true);
//   };
//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={color.purple} />
//       <HeaderBack title={"Update Backup"} onPress={() => navigation.navigate("Backup")} />
//       <Snackbar
//         visible={snackVisibleTrue}
//         onDismiss={() => setSnackVisibleTrue(false)}
//         action={{ label: "Close" }}
//         theme={{ colors: { accent: "#82027D" } }}
//       >
//         {getMessageTrue}
//       </Snackbar>
//       <Snackbar
//         visible={snackVisibleFalse}
//         onDismiss={() => setSnackVisibleFalse(false)}
//         action={{ label: "Close" }}
//         theme={{ colors: { accent: "red" } }}
//       >
//         {getMessageFalse}
//       </Snackbar>
//       <View style={styles.main}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View>
//             <View>
//               <InputField
//                 label={"Document Title"}
//                 placeholder={"Document Title"}
//                 name="title"
//                 onChangeText={(text) => setUpTitle(text)}
//                 value={updateTitle}
//                 keyboardType="text"
//               />

//               {showResults ? (
//                 <>
//                   {/* <AccessLevel
//                     required
//                     label={"Access Level"}
//                     onSelect={(selectedItem) => {
//                       setAccess(selectedItem);
//                     }}
//                   /> */}
//                   <SelectCourse
//                     label={"Select Course"}
//                     onSelect={(selectedItem, index) => {
//                       setCourse(selectedItem);
//                       console.log(selectedItem, index);
//                     }}
//                     value={course}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <View style={styles.selectedDataCon}>
//                     <Text>Access Level</Text>
//                     <View style={styles.selectedData}>
//                       <Text>{docAccess}</Text>
//                       <TouchableOpacity onPress={onClick}>
//                         <Text>close</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </>
//               )}
//               {showDocResults ? (
//                 <>
//                   <UploadDocument onPress={pickImage} />
//                   <View style={styles.uploadCon}>
//                     {image && <Image source={{ uri: image }} style={styles.uploadImg} />}
//                   </View>
//                 </>
//               ) : (
//                 <>
//                   <View style={styles.selectedDataCon}>
//                     <Text>Uploaded Document</Text>
//                     <View style={styles.selectedData}>
//                       {docImage && <Image source={{ uri: docImage }} style={styles.uploadImg} />}
//                       <TouchableOpacity onPress={onClickDoc}>
//                         <Text>close</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </>
//               )}

//               <InputField
//                 label={"Description"}
//                 placeholder={"Description"}
//                 name="description"
//                 multiline={true}
//                 numberOfLines={6}
//                 keyboardType="default"
//                 textAlignVertical="top"
//                 onChangeText={(text) => setUpDescription(text)}
//                 value={upDescription}
//               />

//               <View style={styles.button}>
//                 <SmallButton onPress={()=>console.log(route.params.title.id)}
//                 title={"Cancel"} color={color.purple} fontFamily={"Montserrat-Medium"} />
//                 <SmallButton
//                   onPress={updateDocument}
//                   loading={loading}
//                   title="Save"
//                   backgroundColor={color.purple}
//                   fontFamily={"Montserrat-Bold"}
//                 />
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: color.white,
//   },
//   main: {
//     flex: 1,
//     padding: 20,
//   },

//   description: {
//     fontFamily: "Montserrat-Medium",
//     fontSize: 13,
//     textAlign: "justify",
//   },
//   button: {
//     flexDirection: "row",
//     marginTop: 20,
//   },
//   uploadImg: {
//     height: 100,
//     width: 100,
//     borderWidth: 2,
//     borderRadius: 8,
//     marginTop: 5,
//   },
//   uploadCon: {
//     textAlign: "center",
//   },
//   selectedData: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     paddingRight: 20,

//     borderWidth: 2,
//     borderColor: color.gray,
//     borderRadius: 8,
//   },
// });
