import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderBack from "../../../components/header/Header";
import color from "../../../assets/themes/Color";
import {
  CountryDropdown,
  CityDropdown,
  StateDropdown,
  UniversityDropdown,
} from "./../../../components/dropdown";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import CourseHeader from "../../../components/courselist/CourseHeader";
import CourseData from "../../../components/courselist/CourseData";
import { useNavigation } from "@react-navigation/native";
import { myHeadersData } from "../../../api/helper";
import AppButton from "../../../components/buttons/AppButton";
export default function JoinNewCourse() {
  const navigation = useNavigation();
  // const countryName = localStorage.getItem("countryName");
  // const stateName = localStorage.getItem("stateName");
  // const cityName = localStorage.getItem("cityName");
  // const universityName = localStorage.getItem("universityName");
  const [getCourseList, setCourseList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
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
  // country name
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [cityName, setCityName] = useState();
  const [universityName, setUniversityName] = useState();
  const [loading, setloading] = useState(false);

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
  const toGetCourseList = () => {
    setloading(true);
    console.log(
      "country",
      country,
      "state",
      state,
      "city",
      city,
      "university",
      university
    );
    const myHeaders = myHeadersData();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://3dsco.com/3discoapi/filterCourse.php?country=${countryName}&state=${stateName}&city=${cityName}&university=${universityName}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setloading(false);
        setCourseList(result.data);
        console.log("result", result.data);
      })
      .catch((error) => console.log("error", error));
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  console.log(
    "akldfjaklsjdf;asjdf;asdkf",
    countryName,
    stateName,
    cityName,
    universityName
  );
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Join New Course"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll_view}
      >
        <View style={styles.detail_box}>
          <Text style={styles.head_text}>Join New Course</Text>
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
              setCountryName(item.label);
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
              setStateName(item.label);
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
              setCityName(item.label);
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
              setUniversityName(item.label);
            }}
            containerStyle={styles.dropdown_container}
            itemContainerStyle={styles.dropdown_data}
            itemTextStyle={styles.item_textStyle}
          />
          {/* <CountryDropdown
            label={"Select Country"}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
          />
          <StateDropdown
            label={"Select State"}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
          />
          <CityDropdown
            label={"Select City"}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
          />

          <UniversityDropdown
            label={"Select University"}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
          /> */}
          <View style={styles.button_container}>
            <AppButton
              btnColor={color.purple}
              onPress={toGetCourseList}
              title={"Submit"}
              loading={loading}
            />
          </View>

          {getCourseList ? (
            <>
              <View style={styles.top_button}>
                <CourseHeader />
                {getCourseList &&
                  getCourseList.map((data, index) => (
                    <CourseData
                      course={data.course_name}
                      institute={data.university}
                      date={data.CreatedDate}
                      onPress={() =>
                        navigation.navigate("InstituteInfo", {
                          toJoinCID: data.id,
                          adminID: data.user_id,
                        })
                      }
                    />
                  ))}
              </View>
            </>
          ) : null}
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
  detail_box: {
    backgroundColor: color.gray_light,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 3,
    height: "100%",
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
  scroll_view: {
    margin: 10,
    backgroundColor: color.gray_light,
  },
  top_button: {
    marginTop: 20,
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
