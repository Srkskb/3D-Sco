import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import HeaderBack from "../../../../components/header/Header";
import color from "../../../../assets/themes/Color";
import Input from "../../../../components/inputs/Input";
import CommonDropdown from "../../../../components/dropdown/CommonDropdown";
import NewCheckbox from "../../../../components/NewCheckbox";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";
import { UploadDocument } from "../../../../components";
import SmallButton from "../../../../components/buttons/SmallButton";
import InitialContent from "../../../../components/dropdown/admin_user/InitialContent";
import ExportContent from "../../../../components/dropdown/admin_user/ExportContent";
import Syndicate from "../../../../components/dropdown/admin_user/SyndicateAnnouncement";
import AccessLevel from "../../../../components/dropdown/admin_user/AccessLevel";

const { width, height } = Dimensions.get("window");
export default function EditCourse({ navigation }) {
  const [checked, setChecked] = React.useState("first");
  const [end, setEnd] = React.useState("first1");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState();
  const [selectedEnd, setSelectedEnd] = useState();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirmRelease = (date) => {
    setSelectedRelease(date);
    console.log(date);
    hideDatePicker();
  };
  const handleConfirmEnd = (date) => {
    setSelectedEnd(date);
    console.log(date);
    hideDatePicker2();
  };

  const EditCourse=()=>{
    var data = qs.stringify({
      'Update_courses': '1',
      'user_id': '265',
      'course_name': 'BA.PASSsss',
      'language': 'English',
      'Description': 'This is first event creted by admin everyone need be attend the event so this is very important',
      'Syndicate': '1',
      'export_content': 'all',
      'Access': 'Public',
      'notify_enroll': '0',
      'hide_course': '0',
      'ReleaseDate': '2022-12-27',
      'EndDate': '2023-12-27',
      'Banner': 'Hi, This is engineering drawing',
      'initial_content': '2',
      'quota': 'Unlimited',
      'quota_other': '',
      'filesize': '1',
      'filesize_other': '100',
      'Copyright': 'no',
      'subject': 'BA',
      'num_week': '0',
      'Syllabus': 'three year diploma courses',
      'JobSheet': 'semester',
      'catID': '2',
      'id': '46' 
    });
    var config = {
      method: 'post',
      url: 'https://3dsco.com/3discoapi/studentregistration.php',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <View style={styles.container}>
      <HeaderBack title={"Edit Course"} onPress={() => navigation.goBack()} />

      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ marginVertical: 10 }}>
          <CommonDropdown label={"Category"} />
          <CommonDropdown label={"Primary Language"} />
          <Input placeholder={"Course Title"} label={"Course Title"} />
          <Input
            placeholder={"Topic/Subject"}
            label={"Topic/Subject"}
            onChangeText={(text) => setSubject(text)}
          />
          <Input
            placeholder={"Description"}
            label={"Description"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
          />
          <Input
            placeholder={"Syllabus"}
            label={"Syllabus"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
          />
          <Input
            placeholder={"Job Sheets"}
            label={"Job Sheets"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
          />
         <ExportContent label={"Export Content"}marginBottom={10}/>
          <Syndicate label={"Syndicate Announcements"} marginBottom={10}/>
          <AccessLevel label={"Access"} marginBottom={10}/>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <NewCheckbox />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Montserrat-Regular",
                marginLeft: 10,
              }}
            >
              Email me when new enrollments require approval.
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <NewCheckbox />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Montserrat-Regular",
                marginLeft: 10,
              }}
            >
              Hide this course from the Browse Courses list.
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.radioText}>Release Date</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
                color={color.purple}
              />
              <Text style={styles.radioText}>Release Immediately</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => setChecked("second")}
                color={color.purple}
              />
              <Text style={styles.radioText}>Release on</Text>
            </View>
            <View>
              <Text style={styles.calendar_input}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  {selectedRelease
                    ? selectedRelease.toLocaleDateString()
                    : "No date selected"}
                  {`  `}
                  {selectedRelease
                    ? selectedRelease.toLocaleTimeString()
                    : "No date selected"}
                </Text>
              </Text>
              <View style={styles.selectDate}>
                <TouchableOpacity
                  style={{ position: "absolute", bottom: 22, right: 20 }}
                  onPress={showDatePicker}
                >
                  {/* <Text>Select Date</Text> */}
                  <Entypo name="calendar" size={24} color={color.purple} />
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={selectedRelease}
                onConfirm={handleConfirmRelease}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
          <View>
            <Text style={styles.radioText}>End Date</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="first1"
                status={end === "first1" ? "checked" : "unchecked"}
                onPress={() => setEnd("first1")}
                color={color.purple}
              />
              <Text style={styles.radioText}>No End Date</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="second1"
                status={end === "second1" ? "checked" : "unchecked"}
                onPress={() => setEnd("second1")}
                color={color.purple}
              />
              <Text style={styles.radioText}>End on</Text>
            </View>
            <View>
              <Text style={styles.calendar_input}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  {selectedEnd
                    ? selectedEnd.toLocaleDateString()
                    : "No date selected"}
                  {`  `}

                  {selectedEnd
                    ? selectedEnd.toLocaleTimeString()
                    : "No date selected"}
                </Text>
              </Text>
              <View style={styles.selectDate}>
                <TouchableOpacity
                  style={{ position: "absolute", bottom: 22, right: 20 }}
                  onPress={showDatePicker2}
                >
                  {/* <Text>Select Date</Text> */}
                  <Entypo name="calendar" size={24} color={color.purple} />
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                mode="datetime"
                date={selectedEnd}
                onConfirm={handleConfirmEnd}
                onCancel={hideDatePicker2}
                is24Hour={true}
                // isDarkModeEnabled={true}
              />
            </View>
          </View>
          <Input
            placeholder={"Banner"}
            label={"Banner"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
          />
          <InitialContent label={"Initial Content"}/>
          <Input
            label={"Course Quota"}
            placeholder={"in MB"}
            onChangeText={(text) => setCourseQuota(text)}
            keyboardType="number-pad"
          />
          <Input
            label={"Max File Size"}
            placeholder={"in MB"}
            onChangeText={(text) => setMaxsize(text)}
            keyboardType="number-pad"
          />
          <Input
            placeholder={"Banner"}
            label={"Banner"}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
          />
          <UploadDocument type={"Icon"} />
          <View style={styles.button}>
            <SmallButton
              title={"Cancel"}
              color={color.purple}
              fontFamily={"Montserrat-Medium"}
            />
            <SmallButton
              title="Update"
              color={color.white}
              backgroundColor={color.purple}
              fontFamily={"Montserrat-Bold"}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main: {
    paddingHorizontal: 10,
  },
  search_course: {
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "space-between",
    // width:'50%',
    alignItems: "center",
  },
  filter_button: {
    paddingVertical: 10,
    width: "40%",
    alignSelf: "center",
  },
  main_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: height / 2,
  },
  not_enrolled: {
    fontFamily: "Montserrat-Regular",
  },
  radioText: {
    fontFamily: "Montserrat-Regular",
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
  label_text: {
    color: color.black,
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
  },
});
