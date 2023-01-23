import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import HeaderBack from "../../../../components/header/Header";
import color from "../../../../assets/themes/Color";
import Headline from "../../../../components/Headline";
import Input from "../../../../components/inputs/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import User from "../../../../components/dropdown/User";
import GenderDropdown from "../../../../components/dropdown/GenderDropdown";
import CountryDropdown from "../../../../components/dropdown/CountryDropdown";
import CityDropdown from "../../../../components/dropdown/CityDropdown";
import UniversityDropdown from "../../../../components/dropdown/UniversityDropdown";
import StateDropdown from "../../../../components/dropdown/StateDropdown";
import CategoryDropdown from "../../../../components/dropdown/CategoryDropdown";
import Input2 from "../../../../components/inputs/Input2";
import { AppButton } from "../../../../components/buttons";
import ActiveStatus from "../../../../components/dropdown/ActiveStatus";
import AccountType from "../../../../components/dropdown/AccountType";
import { myHeadersData } from "../../../../api/helper";
import axios from "axios";
export default function CreateUser() {
  const [isVisibleEntry, setIsVisibleEntry] = useState(true);
  const [isVisibleEntry2, setIsVisibleEntry2] = useState(true);
  const[name,setName]=useState("")
  const[mobile,setMobile]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[address,setAddress]=useState("")
  const[school,setSchool]=useState("")
  const[collage,setCollage]=useState("")
  const[state,setState]=useState("")
  const[city,setCity]=useState("")
  const[university,setUniversity]=useState("")
  const[user,setUser]=useState("")
  const[gender,setGender]=useState("")
  const[category,setCatrgory]=useState("")
  const[type,setType]=useState("")
  const[country,setCountry]=useState("")
  const[Comment,setComment]=useState("")
  const[dob,setDob]=useState("")
  const loginUID = localStorage.getItem("loginUID");
   const NewStudent=()=>{
    var myHeaders = myHeadersData();
    
    var formdata = new FormData();
    formdata.append("add_master_student", "1");
    formdata.append("name", name);
    formdata.append("mobile", mobile);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("address", address);
    formdata.append("schoolname", school);
    formdata.append("collagename", collage);
    formdata.append("state", state);
    formdata.append("city",city);
    formdata.append("university", university);
    formdata.append("username", user);
    formdata.append("gender", gender);
    formdata.append("category", category);
    formdata.append("type", "1");
    formdata.append("country", country);
    formdata.append("Comment", "test");
    formdata.append("Organization", "tester");
    formdata.append("Description", dob);
    formdata.append("Experience", "fewvvwe");
    formdata.append("Occupation", "vrewvervw");
    formdata.append("Education", "vrewverwvr");
    formdata.append("Levels", "vefwverewver");
    formdata.append("institute", "vewrvervewvewr");
    formdata.append("Tnc", "yes");
    formdata.append("created_by", loginUID);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://3dsco.com/3discoapi/studentregistration.php", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

   }
  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <Headline title={"Required information"} />
        <Input label={"Username"} placeholder={"Enter Username"}
        value={user}
        onChangeText={(text)=>{setUser(text)}}

        />
        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsVisibleEntry(!isVisibleEntry)}
          >
            <MaterialCommunityIcons
              name={
                isVisibleEntry === false ? "eye-outline" : "eye-off-outline"
              }
              size={24}
              color={isVisibleEntry === false ? color.dark_gray : color.purple}
            />
          </TouchableOpacity>
          <Input
            label={"Password"}
            placeholder={"Enter Password"}
            secureTextEntry={isVisibleEntry}
            autoCapitalize="none"
            value={password}
            onChangeText={(text)=>{setPassword(text)}}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsVisibleEntry2(!isVisibleEntry2)}
          >
            <MaterialCommunityIcons
              name={
                isVisibleEntry2 === false ? "eye-outline" : "eye-off-outline"
              }
              size={24}
              color={isVisibleEntry2 === false ? color.dark_gray : color.purple}
            />
          </TouchableOpacity>
          <Input
            label={"Confirm Password"}
            placeholder={"Confirm Password"}
            secureTextEntry={isVisibleEntry}
            autoCapitalize="none"
          />
        </View>
        <Input label={"Email"} placeholder={"Enter Email Address"} 
          value={email}
          onChangeText={(text)=>{setEmail(text)}}
        />
        <Input label={"Name"} placeholder={"Name"}
        
        
        value={name}
        onChangeText={(text)=>{setName(text)}}/>
        {/* <User onSelect={(item, index) => console.log(item)} label={"Account Type"} /> */}
        <AccountType 
        // onSelect={(item, index) => console.log(item)}
         label={"Account Type"} 
         onSelect={(item, index) => {
          setType(item);
          console.log(item, index);
        }}
        value={type}
        
        />
        <ActiveStatus  onSelect={(selectedItem, index) => {
          
        }}/>
        <Headline title={"Personal information (Optional)"} />
        <Input2 label={"Date of Birth"} placeholder={"DD-MMM-YYYY"} 
          value={dob}
          onChangeText={(text)=>{setDob(text)}}
        />
        <GenderDropdown
          label={"Select Gender"} 
          // onSelect={(item, index) => 
          //   console.log(item)}
          onSelect={(item, index) => {
            setGender(item);
            console.log(item, index);
          }}
          value={gender}
          
        />
        <Input2 label={"Street Address"} placeholder={"Street Address"}
         value={address}
         onChangeText={(text)=>{setAddress(text)}}
        />
        <Input2 label={"Postal/Zip Code"} placeholder={"Postal/Zip Code"} />
        <Input2 label={"School Name"} placeholder={"School Name"} 
         value={school}
         onChangeText={(text)=>{setSchool(text)}}
        />
        <Input2 label={"College Name"} placeholder={"College Name"} 
         value={collage}
         onChangeText={(text)=>{setCollage(text)}}
        />
        <CountryDropdown
          label={"Country"}
          // onSelect={(item, index) => console.log(item)}
          onSelect={(item, index) => {
            setCountry(item);
            console.log(item, index);
          }}
          value={country}
        />
        <StateDropdown
          label={"State"}
          // onSelect={(item, index) => console.log(item)}
          onSelect={(item, index) => {
            setState(item);
            console.log(item, index);
          }}
          value={state}
        />
        <CityDropdown
          label={"City"}
          // onSelect={(item, index) => console.log(item)}
          onSelect={(item, index) => {
            setCity(item);
            console.log(item, index);
          }}
          value={city}
        />
        <UniversityDropdown
          label={"University"}
          // onSelect={(item, index) => console.log(item)}
          onSelect={(item, index) => {
            setUniversity(item);
            console.log(item, index);
          }}
          value={university}
        />
        <Input2 label={"Telephone"} placeholder={"Enter Mobile Number"}
         value={mobile}
         onChangeText={(text)=>{setMobile(text)}}
        />
        <Input2 label={"Website"} placeholder={"http://"} />
        <CategoryDropdown
          label={"Category"}
          // onSelect={(item, index) => console.log(item)}
          onSelect={(item, index) => {
            setCatrgory(item);
            console.log(item, index);
          }}
          value={category}
        />
        <AppButton title={"Continue"} btnColor={color.purple} 
        onPress={NewStudent}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  icon: {
    position: "absolute",
    right: 15,
    top: "45%",
    zIndex: 1,
  },
});
