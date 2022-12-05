import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import BackButton from "../../../components/buttons/BackButton";
import color from "../../../assets/themes/Color";
import Input from "../../../components/inputs/Input";
import Input2 from "../../../components/inputs/Input2";

import AppButton from "../../../components/buttons/AppButton";

import Headline from "../../../components/Headline";
import ProfilePicture from "../../../components/view/ProfilePicture";
import {
  CategoryDropdown,
  StateDropdown,
  CountryDropdown,
  GenderDropdown,
  UniversityDropdown,
  CityDropdown,
} from "../../../components/dropdown";
import { Snackbar } from "react-native-paper";
import HomeHeader from "../../../components/header/HomeHeader";
const { height, width } = Dimensions.get("window");
export default function UpdateProfile({ navigation }) {
  const [isfocused, setIsfococused] = useState(false);
  // Alert Message or SnakesBar
  const [snackVisibleTrue, setSnackVisibleTrue] = useState(false);
  const [snackVisibleFalse, setSnackVisibleFalse] = useState(false);
  const [getMessageTrue, setMessageTrue] = useState();
  const [getMessageFalse, setMessageFalse] = useState();
  //   personal information states
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setaddress] = useState();

  //   educational information states
  const [schoolname, setSchoolname] = useState();
  const [collagename, setCollegename] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [university, setuniversity] = useState();
  const [universityname, setuniversityname] = useState();

  //   login information states
  const [username, setusername] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [gender, setGender] = useState();
  const [category, setCategory] = useState();
  const [comment, setComment] = useState();
  const [check, setChck] = useState();

  const user_id = localStorage.getItem("userID"); // role

  let dataToSend = {
    studentregistration: "1",
    first_name: name,
    mobile: phone,
    email: email,
    password: password,
    address: address,
    schoolname: schoolname,
    collagename: collagename,
    country: country,
    state: state,
    city: city,
    univercity: university,
    username: username,
    gender: gender,
    category: category,
    comments: comment,
    tandc: "1",
    role: "1",
  };

  const handleApi = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=ckmj4nc6enk1u3e0rle62m3l64");
    var urlencoded = new FormData();
    urlencoded.append("studentregistration", "1");
    urlencoded.append("first_name", name);
    urlencoded.append("mobile", phone);
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    // address
    urlencoded.append("address", address);
    urlencoded.append("schoolname", schoolname);
    urlencoded.append("collagename", collagename);
    urlencoded.append("country", country);
    urlencoded.append("state", state);
    urlencoded.append("city", city);
    urlencoded.append("univercity", university);
    // login
    urlencoded.append("username", username);
    urlencoded.append("gender", gender);
    urlencoded.append("category", category);
    urlencoded.append("comments", comment);
    // static value
    urlencoded.append("tandc", "1");
    urlencoded.append("role", user_id);

    console.log(urlencoded);
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php", {
      method: "POST",
      body: urlencoded,
      headers: {
        myHeaders,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader

        if (responseJson.success == 0) {
          setSnackVisibleFalse(true);
          setMessageFalse(responseJson.message);
        } else {
          setMessageTrue(responseJson.message);
          setSnackVisibleTrue(true);
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          });
          navigation.replace("HomeScreen");
        }

        console.log(responseJson);
      })
      .catch((error) => {
        //Hide Loader
        alert("Invalid credential ");

        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <BackButton />
          
        </TouchableOpacity>
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
        <View style={{ paddingHorizontal: 20 }}>
          {/*Personal Information*/}
          <Headline title={"personal information"} />
          {/* Profile Picture */}
          <ProfilePicture />
          <Input
            label="Name"
            placeholder="Enter your full name"
            onChangeText={(e) => setName(e)}
          />
          <Input
            label="Email ID"
            placeholder="Enter your E-mail ID"
            keyboardType="email-address"
            onChangeText={(e) => setEmail(e)}
          />
          <Input
            label="Contact No"
            placeholder="Enter mobile number"
            keyboardType="number-pad"
            onChangeText={(e) => setPhone(e)}
          />
          <Input
            multiline={true}
            numberOfLines={3}
            label="Address"
            placeholder="Enter your Address"
            textAlignVertical={"top"}
            onChangeText={(e) => setaddress(e)}
          />

          {/*Educational Information*/}
          <Headline title={"EDUCATIONAL INFORMATION"} />
          <Input
            label="School Name"
            placeholder="School Name"
            onChangeText={(e) => setSchoolname(e)}
          />

          <Input
            label="College Name"
            placeholder="College Name"
            onChangeText={(e) => setCollegename(e)}
          />

          <CountryDropdown
            label={"Country"}
            onSelect={(selectedItem, index) => {
              setCountry(selectedItem);
              console.log(selectedItem, index);
            }}
          />
          <StateDropdown
            label={"State"}
            onSelect={(selectedItem, index) => {
              setState(selectedItem);
              console.log(selectedItem, index);
            }}
          />
          <CityDropdown
            label={"City"}
            onSelect={(selectedItem, index) => {
              setCity(selectedItem);
              console.log(selectedItem, index);
            }}
          />
          <UniversityDropdown
            label={"University"}
            onSelect={(selectedItem, index) => {
              setuniversity(selectedItem);
              console.log(selectedItem, index);
            }}
          />

          {/* <Input2
            label="University Name"
            placeholder="University Name"
            onChangeText={(e) => setuniversityname(e)}
          /> */}

          {/*Login and Password*/}
          <Headline title={"login and password"} />
          <Input
            label="Username"
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(e) => setusername(e)}
          />
          <Input
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(e) => setPassword(e)}
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(e) => setConfirmpassword(e)}
          />

          {/*Other Preference*/}
          <Headline title={"other preference"} />
          <GenderDropdown
            label={"Gender"}
            onSelect={(selectedItem, index) => {
              setGender(selectedItem);
              console.log(selectedItem, index);
            }}
          />
          <CategoryDropdown
            label={"Category"}
            onSelect={(selectedItem, index) => {
              setCategory(selectedItem);
              console.log(selectedItem, index);
            }}
          />
          <Input2
            label="Comments"
            placeholder="Comments"
            multiline={true}
            numberOfLines={3}
            textAlignVertical={"top"}
            onChangeText={(e) => setComment(e)}
          />

          {/*Extra Space*/}
          <View style={{ height: 40 }}></View>

          {/* SignUp Button */}
          <AppButton title={"Update"} onPress={handleApi} />
        </View>

        {/*Extra Space*/}
        <View style={{ height: 30 }}></View>

      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  heading_line: {
    color: color.purple,
    fontWeight: "bold",
    marginVertical: 20,
  },
  term_condition: {
    height: height / 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: color.gray,
    flexDirection: "row",
  },
  term_text: {
    fontSize: 16,
    color: color.black,
  },
  checkbox_container: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  agree_text: {
    alignSelf: "center",
    color: color.dark_gray,
    marginLeft: 10,
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
  account_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 60,
  },
  no_account: {
    color: color.dark_gray,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  login_text: {
    color: color.purple,
    fontSize: 16,
    marginLeft: 2,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontFamily: "Montserrat-Bold",
  },
});