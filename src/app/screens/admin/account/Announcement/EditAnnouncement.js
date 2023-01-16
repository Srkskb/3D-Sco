import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import Input from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { UploadDocument } from "../../../../components";
export default function EditAnnouncement({navigation}) {
  const EditAnnouncement=()=>{
    var data = new FormData();
data.append('Update_courses_announcement', '1');
data.append('user_id', '176');
data.append('announcement_title', 'goooooo');
data.append('Description', 'gdfs');
data.append('course_id', '17');
data.append('image', fs.createReadStream('/C:/Users/krish/Downloads/4941665926887.jpg'));
data.append('id', '25');

var config = {
  method: 'post',
  url: 'https://3dsco.com/3discoapi/studentregistration.php',
  headers: { 
    'Cookie': 'PHPSESSID=hc3kbqpelmbu5cl5em37e2j4j7', 
    ...data.getHeaders()
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
      <HeaderBack title={"Edit Announcement"} onPress={()=>navigation.goBack()} />
      <ScrollView style={styles.container}>
        <SelectCourse
          label={"Select Course"}
          onSelect={(selectedItem, index) => {}}
        />
        <Input label={"Announcement Title"} placeholder={"Announcement Title"} />
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
            title="Update"
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
