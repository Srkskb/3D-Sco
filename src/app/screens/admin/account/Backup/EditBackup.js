import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import Input from "../../../../components/inputs/Input";
import SmallButton from "../../../../components/buttons/SmallButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import { UploadDocument } from "../../../../components";
export default function EditBackup({navigation}) {
  const EditBackup=()=>{
    var data = new FormData();
data.append('Update_backup', '1');
data.append('user_id', '17');
data.append('course_id', '12');
data.append('title', 'room ');
data.append('detail', 'details ');
data.append('image', fs.createReadStream('/C:/Users/krish/Downloads/error_log-20220913.gz'));
data.append('id', '51');

var config = {
  method: 'post',
  url: 'https://3dsco.com/3discoapi/studentregistration.php',
  headers: { 
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
      <HeaderBack title={"Edit Backup"} onPress={()=>navigation.goBack()}/>
      <ScrollView style={styles.container}>
        <SelectCourse
          onSelect={(selectedItem, index) => {}}
          label={"Select Course"}
        />
        <Input label={"File Title"} placeholder={"File Title"} />
        <Input
          label={"Description"}
          placeholder={"Description"}
          multiline={true}
          numberOfLines={5}
          textAlignVertical={"top"}
        />
        <UploadDocument type={"Zip File"}/>
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
