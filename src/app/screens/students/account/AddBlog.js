import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";
import color from "../../../assets/themes/Color";
import HeaderBack from "../../../components/header/Header";
import InputField from "../../../components/inputs/Input";
import { AccessLevel } from "../../../components/dropdown";
import SmallButton from "../../../components/buttons/SmallButton";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import AppButton from "../../../components/buttons/AppButton";
import { Snackbar } from "react-native-paper";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function AddBlog() {
  const navigation = useNavigation();
  const [access, setAccess] = useState("Private");
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  const loginUID = localStorage.getItem("loginUID");
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    console.log(date);
    hideDatePicker();
  };
  const addFileCabinet = (values) => {
    console.log(
      values.blogTitle,
      access,
      loginUID,
      selectedDate,
      values.description
    );
    const myHeaders = myHeadersData();
    var urlencoded = new FormData();

    urlencoded.append("blogs", "1");
    urlencoded.append("titel", values.blogTitle);
    urlencoded.append("access", access);
    urlencoded.append("user_id", loginUID);
    // urlencoded.append("added_by", loginUID);

    urlencoded.append("date", "2022-02-01");
    urlencoded.append("description", values.description);
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
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
          navigation.navigate("Blogs");
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
        title={"Add Blog"}
        onPress={() => navigation.navigate("Blogs")}
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
          <View style={{paddingVertical:10}}>
            <Formik
              initialValues={{
                blogTitle: "",
                description: "",
              }}
              validationSchema={Yup.object().shape({
                blogTitle: Yup.string()
                  .required("Document Title is required")
                  .min(3, "Document Title must be at least 3 characters")
                  .max(150, "Document Title cannot be more than 150 characters"),
                description: Yup.string()
                  .required("Description is required")
                  .min(20, "Description must be at least 20 characters")
                
              })}
              onSubmit={(values) => addFileCabinet(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <View>
                  <InputField
                    label={"Blog Title"}
                    placeholder={"Blog Title"}
                    name="title"
                    onChangeText={handleChange("blogTitle")}
                    onBlur={handleBlur("blogTitle")}
                    value={values.blogTitle}
                    keyboardType="text"
                  />
                  {errors.blogTitle && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.blogTitle}
                    </Text>
                  )}
                  <Text style={{ marginBottom: 5 }}>
                    <Text style={styles.label_text}>Event Date</Text>
                    <Text style={{ color: color.red }}>*</Text>
                  </Text>
                  <View style={styles.calendar_input}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "No date selected"}
                    </Text>
                    <View style={styles.selectDate}>
                      <TouchableOpacity onPress={showDatePicker}>
                        {/* <Text>Select Date</Text> */}
                        <Entypo
                          name="calendar"
                          size={24}
                          color={color.purple}
                        />
                      </TouchableOpacity>
                    </View>

                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      date={selectedDate}
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>

                  <AccessLevel
                    required
                    label={"Access Level"}
                    onSelect={(selectedItem, index) => {
                      setAccess(selectedItem);
                      console.log(selectedItem, index);
                    }}
                    value={access}
                  />
                  {errors.selectedItem && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.selectedItem}
                    </Text>
                  )}
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
                    textAlignVertical='top'
                  />
                  {errors.description && (
                    <Text
                      style={{ fontSize: 14, color: "red", marginBottom: 10 }}
                    >
                      {errors.description}
                    </Text>
                  )}
                  <View style={styles.button}>
                  <SmallButton title={"Cancel"} color={color.purple} 
                    fontFamily={'Montserrat-Medium'}/>
                    <SmallButton
                      onPress={handleSubmit}
                      title="Save"
                      disabled={!isValid}
                      color={color.white}
                      backgroundColor={color.purple}
                      fontFamily={'Montserrat-Bold'}
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
    borderRadius:8,
    justifyContent: 'space-between',
    paddingHorizontal:10,
    paddingVertical:12,
    paddingRight:20,
    marginBottom:10
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
