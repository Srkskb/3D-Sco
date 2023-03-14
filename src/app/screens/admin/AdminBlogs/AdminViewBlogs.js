import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  
} from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import Input2 from "../../../components/inputs/Input2";
import SmallButton from "../../../components/buttons/SmallButton";
import CommentCard from "../../../components/card/CommentCard";
import axios from "axios";
import { myHeadersData } from "../../../api/helper";
const{height,width}=Dimensions.get('window')
export default function AdminViewBlogs({ route, navigation }) {
    const { Titel, titleParam } = route.params.list;
  const { Date, accessParam } = route.params.list;
  const { Description, descriptionParam } = route.params.list;
const [comment, setComment] = useState('')
const [comments, setComments] = useState([])
const [loading, setLoading] = useState(false)
const loginUID = localStorage.getItem("loginUID");

const addComment=()=>{
  setLoading(true)
  var formdata = new FormData();
  var myHeaders = myHeadersData()
formdata.append("comment", "1");
formdata.append("titel", "newdocument");
formdata.append("blog_id", route.params.list.id);
formdata.append("description", comment);
formdata.append("user_id", loginUID);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://3dsco.com/3discoapi/3dicowebservce.php", requestOptions)
  .then(response => response.json())
  .then(result => {
    setLoading(false)
    console.log(result)
    if(result.success==1){
    getComments()
    setComment('')
    }
  })
  .catch(error => {
    setLoading(false)
    console.log('error', error)});

}

const getComments=()=>{
  var myHeaders = myHeadersData()

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://3dsco.com/3discoapi/state.php?comments_list=1&blog_id=${route.params.list.id}`, requestOptions)
  .then(response => response.json())
  .then(result =>{
    if(result.success!=0){
      setComments(result.data)
    }else{
      setComments([])
    }
    console.log(result)
  })
  .catch(error => console.log('error', error));
}

useEffect(() => {
  getComments()
}, [navigation])


  return (
    <View style={styles.container}>
      <HeaderBack
        title={"view blogs"}
        onPress={() => navigation.navigate("AdminBlogs")}
      />
      <ScrollView showsVerticalScrollIndicator={false}
      >
        <View style={styles.main}>
          <View style={styles.detail_box}>
            <Text style={styles.head_text}>{Titel}</Text>
            <View style={styles.detail}>
              {/* Date */}
              <Text>
                <Text style={styles.bold_text}>Date: </Text>
                <Text style={styles.data}>{Date}</Text>
              </Text>
              {/* Time */}
            
              {/* Posted by */}
              <Text>
                <Text style={styles.bold_text}>Posted By: </Text>
                <Text style={styles.data}>ArmanD suarez</Text>
              </Text>
              <View style={styles.description}>
                <Text style={styles.description_text}>
                  {Description} 
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.comment_section}>
            <Text style={styles.comment_text}>
              <Text>comments</Text>
              <Text> ({comments&&comments.length})</Text>
            </Text>
            {comments.map((list, index) => (<CommentCard
            key={index}
            comments={list.titel}
            name={list.User_name}
            />))}
          </View>
          <Input2
            label={"Leave a Comment"}
            multiline={true}
            numberOfLines={5}
            textAlignVertical={"top"}
            placeholder={"Type Your Comment Here..."}
            onChangeText={(text)=>setComment(text)}
            value={comment}
          />
          <View style={styles.button_container}>
            <SmallButton
              title={"Cancel"}
              color={color.purple}
              fontFamily={"Montserrat-Medium"}
              onPress={()=>console.log(route.params.list.id)}
            />
            <SmallButton
              title={"Submit"}
              color={color.white}
              loading={loading}
              fontFamily={"Montserrat-Bold"}
              backgroundColor={color.purple}
              onPress={addComment}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
  main: {
    paddingHorizontal: 10,
  },
  detail_box: {
    backgroundColor: color.gray_light,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 20,
    borderRadius: 3,
   
  },
  head_text: {
    color: color.purple,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
    marginBottom: 20,
  },
  bold_text: {
    textTransform: "capitalize",
    fontFamily: "Montserrat-SemiBold",
  },
  data: {
    fontFamily: "Montserrat-Regular",
  },
  description_text: {
    fontFamily: "Montserrat-Regular",
    textAlign: "justify",
  },
  description: {
    marginTop: 20,
  },
  comment_section: {
    marginTop: 10,
  },
  comment_text: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: color.black,
    textTransform: "capitalize",
    marginVertical: 10,
  },
  button_container: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 40,
  },
});
