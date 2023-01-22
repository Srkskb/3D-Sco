import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState,useEffect } from "react";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
import TextWithButton from "../../../../components/TextWithButton";
import SelectCourse from "../../../../components/admin_required/SelectCourse";
import Category_Card from "../../../../components/admin_required/Cards/Category_Card";
import axios from "axios";
import Forum_Card from "../../../../components/admin_required/Cards/Forum_Card";
export default function Forum({ navigation }) {
  const [selectCourse, setSelectCourse] = useState("");
  const [forums, setForums] = useState([])

  const allForumList = () => {
    const loginUID = localStorage.getItem("loginUID");
   var data = new FormData();
data.append('courses_forum_by_user_id', '1');
data.append('user_id', loginUID);

var config = {
  method: 'post',
  url: 'https://3dsco.com/3discoapi/studentregistration.php',
  headers: { 
    'Content-Type': 'multipart/form-data', 
    'Cookie': 'PHPSESSID=n1c8fh1ku6qq1haio8jmfnchv7'
  },
  data : data
};

axios(config)
.then((response)=>{
  console.log(JSON.stringify(response.data));
  if(response.data.success===1){
    setForums(response.data.data)
  }
})
.catch((error)=>{
  console.log(error);
});
  };
  const DeleteForum=()=>{
    var data = new FormData();
data.append('delete_courses_form', '1');
data.append('id', '36');
data.append('user_id', '52');

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

  useEffect(() => {
    allForumList();
    navigation.addListener("focus", () => allForumList());
  }, []);
  return (
    <View style={{backgroundColor:color.white,flex:1}}>
      <HeaderBack title={"Forums"} onPress={()=>navigation.goBack()}/>
      <ScrollView style={styles.container}>
        <TextWithButton label={"+Add"} title={"Forum Lists"} onPress={()=>navigation.navigate("AddForum")}/>
        <SelectCourse
          onSelect={(selectedItem, index) => {
            setSelectCourse(selectedItem);
          }}
        />
        {forums === undefined ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <>
              {forums.map((list, index) => (
        <Forum_Card key={index}
          title={list.forum_title}
          editPress={() => navigation.navigate("EditForum")}
          // viewPress={() => navigation.navigate("ViewForum")}
          status={"Active"}
         posted_by={"Deepak"}
         date={list.Date}
         viewPress={()=>navigation.navigate("ViewForum")}
        />
        ))}
            </>
          )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
