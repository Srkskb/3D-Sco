import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import Input from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { UploadDocument } from "../../../../components";
import ActiveStatus from "../../../../components/dropdown/ActiveStatus";
export default function AddForum({navigation}) {
  const AddForum=()=>{
    var data = qs.stringify({
      'add_courses_forum': '1',
      'user_id': '176',
      'admin_id': '176',
      'forum_title': 'Reply',
      'Description': 'Distance education and virtual connection in cyber...',
      'course_id': '5',
      'topic_id': '3' 
    });
    var config = {
      method: 'post',
      url: 'https://3dsco.com/3discoapi/studentregistration.php',
      headers: { 
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
    <View style={{backgroundColor:color.white,flex:1}}>
      <HeaderBack title={"Add Forum"} onPress={()=>navigation.goBack()} />
      <ScrollView style={styles.container}>
        <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {}}
        />
        <Input label={"Forum Title"} placeholder={"Forum Title"} />
        <ActiveStatus  onSelect={(selectedItem, index) => {}}/>
        <Input
          label={"Description"}
          placeholder={"Description"}
          multiline={true}
          numberOfLines={5}
          textAlignVertical={"top"}
        />
        {/* <UploadDocument type={"File"}/> */}
        <View style={styles.button}>
          <SmallButton
            title={"Cancel"}
            color={color.purple}
            fontFamily={"Montserrat-Medium"}
          />
          <SmallButton
            title="Save"
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
});
