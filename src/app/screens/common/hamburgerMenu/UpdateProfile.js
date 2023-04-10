import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { myHeadersData } from "../../../api/helper";
import BackButton from "../../../components/buttons/BackButton";
import color from "../../../assets/themes/Color";
import Input from "../../../components/inputs/Input";
import Input2 from "../../../components/inputs/Input2";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
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

  //   personal information states
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [university, setUniversity] = useState();
  // focus related
  const [countryFocus, setCountryFocus] = useState(false);
  const [stateFocus, setStateFocus] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);
  const [universityFocus, setUniversityFocus] = useState(false);
  // array for data
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [universityData, setUniversityData] = useState([]);

  //   educational information states
  const [schoolname, setSchoolname] = useState();
  const [collagename, setCollegename] = useState();

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
  useEffect(() => {
    const myHeaders = myHeadersData();
    var config = {
      method: "get",
      url: "https://3dsco.com/3discoapi/3dicowebservce.php?country=1",
      headers: { myHeaders },
    };
    axios(config)
      .then((response) => {
        // console.log("country",response);
        var count = Object.keys(response.data.data).length;
        let countryArray = [];
        for (var i = 0; i < count; i++) {
          countryArray.push({
            value: response.data.data[i].country_id,
            label: response.data.data[i].name,
          });
        }
        setCountryData(countryArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleState = (countryCode) => {
    const myHeaders = myHeadersData();
    var config = {
      method: "get",
      url: `https://3dsco.com/3discoapi/state.php?state=1&country_id=${countryCode}`,
      headers: { myHeaders },
    };
    axios(config)
      .then((response) => {
        // console.log("mine", response);
        var count = Object.keys(response.data.data).length;
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            value: response.data.data[i].state_id,
            label: response.data.data[i].name,
          });
        }
        setStateData(stateArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCity = (countryCode, stateCode) => {
    const myHeaders = myHeadersData();
    var config = {
      method: "get",
      url: `https://3dsco.com/3discoapi/state.php?city=1&country_id=${countryCode}&state_id=${stateCode}`,
      headers: { myHeaders },
    };
    axios(config)
      .then((response) => {
        // console.log("mine", response);
        var count = Object.keys(response.data.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: response.data.data[i].city_id,
            label: response.data.data[i].name,
          });
        }
        setCityData(cityArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUniversity = (countryCode) => {
    const myHeaders = myHeadersData();
    var config = {
      method: "get",
      url: `https://3dsco.com/3discoapi/state.php?university=1&country_id=${countryCode}`,
      headers: { myHeaders },
    };
    axios(config)
      .then((response) => {
        // console.log("mine", response);
        var count = Object.keys(response.data.data).length;
        let universityArray = [];
        for (var i = 0; i < count; i++) {
          universityArray.push({
            value: response.data.data[i].university_id,
            label: response.data.data[i].name,
          });
        }
        setUniversityData(universityArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.purple} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
       
          <HomeHeader navigation={navigation} title={"Update Profile"}/>
        <Snackbar
          visible={snackVisibleTrue}
          onDismiss={() => setSnackVisibleTrue(false)}
          action={{ label: "Close" }}
          theme={{ colors: { accent: "#82027D" } }}
          wrapperStyle={{zIndex:1}}
        >
          {getMessageTrue}
        </Snackbar>
        <Snackbar
          visible={snackVisibleFalse}
          onDismiss={() => setSnackVisibleFalse(false)}
          action={{ label: "Close" }}
          theme={{ colors: { accent: "red" } }}
          wrapperStyle={{zIndex:1}}
        >
          {getMessageFalse}
        </Snackbar>
        <View style={{ paddingHorizontal: 20 }}>
          {/*Personal Information*/}
          <Headline title={"personal information"} />
          {/* Profile Picture */}
          {/* <ProfilePicture /> */}
          <Input
            label="Name"
            placeholder="Enter your full name"
            onChangeText={(e) => setName(e)}
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

          {/* <CountryDropdown
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
          /> */}

          <Text style={styles.label_text}>Select Country</Text>
          <Dropdown
            style={[
              styles.dropdown,
              countryFocus && {
                borderColor: color.purple,
                borderWidth: 2,
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={countryData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!countryFocus ? "Select Country" : "..."}
            searchPlaceholder="Search..."
            value={country}
            onFocus={() => setCountryFocus(true)}
            onBlur={() => setCountryFocus(false)}
            onChange={(item) => {
              setCountry(item.value);
              setCountryFocus(false);
              handleState(item.value);
              handleUniversity(item.value);
            }}
            containerStyle={styles.dropdown_container}
            itemContainerStyle={styles.dropdown_data}
            itemTextStyle={styles.item_textStyle}
          />
          <Text style={styles.label_text}>Select State</Text>
          <Dropdown
            style={[
              styles.dropdown,
              stateFocus && { borderColor: color.purple, borderWidth: 2 },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={stateData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!stateFocus ? "Select State" : "..."}
            searchPlaceholder="Search..."
            value={state}
            onFocus={() => setStateFocus(true)}
            onBlur={() => setStateFocus(false)}
            onChange={(item) => {
              setState(item.value);
              setStateFocus(false);
              handleCity(country, item.value);
            }}
            containerStyle={styles.dropdown_container}
            itemContainerStyle={styles.dropdown_data}
            itemTextStyle={styles.item_textStyle}
          />
          <Text style={styles.label_text}>Select City</Text>
          <Dropdown
            style={[
              styles.dropdown,
              cityFocus && { borderColor: color.purple, borderWidth: 2 },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={cityData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!cityFocus ? "Select City" : "..."}
            searchPlaceholder="Search..."
            value={city}
            onFocus={() => setCityFocus(true)}
            onBlur={() => setCityFocus(false)}
            onChange={(item) => {
              setCity(item.value);
              setCityFocus(false);
            }}
            containerStyle={styles.dropdown_container}
            itemContainerStyle={styles.dropdown_data}
            itemTextStyle={styles.item_textStyle}
          />
          <Text style={styles.label_text}>Select University</Text>
          <Dropdown
            style={[
              styles.dropdown,
              universityFocus && {
                borderColor: color.purple,
                borderWidth: 2,
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={universityData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!universityFocus ? "Select University" : "..."}
            searchPlaceholder="Search..."
            value={university}
            onFocus={() => setUniversityFocus(true)}
            onBlur={() => setUniversityFocus(false)}
            onChange={(item) => {
              setUniversity(item.value);
              setUniversityFocus(false);
            }}
            containerStyle={styles.dropdown_container}
            itemContainerStyle={styles.dropdown_data}
            itemTextStyle={styles.item_textStyle}
          />
          {/* <Input2
            label="University Name"
            placeholder="University Name"
            onChangeText={(e) => setuniversityname(e)}
          /> */}

          {/*Login and Password*/}
          <Headline title={"Username"} />
          <Input
            label="Username"
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(e) => setusername(e)}
          />
          {/* <Input
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
          /> */}

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
          {/* <View style={{ height: 40 }}></View> */}

          {/* SignUp Button */}
          <AppButton
            title={"Update"}
            onPress={handleApi}
            btnColor={color.purple}
          />
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
    //dropdown style

    dropdown: {
      height: 50,
      borderColor: color.gray,
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 5,
    },
  
    label: {
      position: "absolute",
      backgroundColor: "white",
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      color: color.dark_gray,
      fontSize: 14,
      fontFamily: "Montserrat-Regular",
    },
    selectedTextStyle: {
      color: color.black,
      fontSize: 14,
      fontFamily: "Montserrat-Regular",
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    label_text: {
      color: color.black,
      fontSize: 13,
      fontFamily: "Montserrat-Regular",
      marginBottom: 5,
    },
    dropdown_data: {
      borderBottomColor: color.gray,
      borderBottomWidth: 1,
    },
    dropdown_container: {
      borderWidth: 1,
      borderColor: color.gray,
      borderRadius: 5,
    },
    item_textStyle: {
      fontFamily: "Montserrat-Bold",
      fontSize: 14,
    }, 
});
