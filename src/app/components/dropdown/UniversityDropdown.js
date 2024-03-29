import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from "react-native-element-dropdown";

import { myHeadersData } from "../../api/helper";
import { styles } from "./Styles";
const down_img = require("../../assets/images/down.png");

export default function UniversityDropdown({ label, onSelect, countryId, ...props }) {
  const [getUniversityList, setUniversityList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  // const country_id = localStorage.getItem("countryId");
  // const { country_id } = JSON.parse(localStorage.getItem("loginData"));

  const fetch = async () => {
    const myData = await AsyncStorage.getItem("userData");
    const { country_id } = JSON.parse(myData);
    // if (country_id == null || (country_id === "" && state_id == null) || state_id === "") {
    //   return;
    // }

    axios
      .get(`https://3dsco.com/3discoapi/state.php?university=1&country_id=${countryId || country_id}`)
      .then(function (res) {
        if (res.data.success == 1) {
          setUniversityList(res.data.data);
        } else {
          console.log("university list can't fetch right now");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch();
  }, [getUniversityList, countryId]);
  // useEffect(
  // (async) => {
  //   const myHeaders = myHeadersData();
  //   if (country_id == null || country_id === "") {
  //     return;
  //   }
  //   fetch(`https://3dsco.com/3discoapi/state.php?university=1&country_id=${country_id}`, {
  //     method: "GET",
  //     headers: {
  //       myHeaders,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.success == 1) {
  //         setUniversityList(res.data);
  //       } else {
  //         alert("Please after sometime");
  //       }
  //     });
  //   },
  //   []
  // );
  return (
    <View>
      {label && <Text style={styles.label_text}>{label}</Text>}
      <View style={{ flexDirection: "row", paddingVertical: 6 }}>
        {/* <SelectDropdown
          data={
            getUniversityList && getUniversityList.map((list, index) => ({ name: list.name, id: list.university_id }))
          }
          buttonTextAfterSelection={(selectedItem, index) => {
            localStorage.setItem("university_id", getUniversityList[index].university_id);
            localStorage.setItem("universityName", getUniversityList[index].name);

            return selectedItem.name;
          }}
          rowTextForSelection={(item, index) => {
            return item.name;
          }}
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.text_button}
          rowTextStyle={styles.row_text}
          dropdownStyle={styles.dropdown_style}
          {...props}
        />
        <Image style={styles.downimg} source={down_img}></Image> */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "#82027D" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={getUniversityList.map((item, index) => ({ name: item.name, id: item.university_id }))}
          search
          maxHeight={300}
          disable={!countryId?.length}
          labelField="name"
          valueField="id"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setIsFocus(false);
            onSelect(item);
          }}
          {...props}
          // renderLeftIcon={() => (
          //   <AntDesign style={styles.icon} color={isFocus ? "#82027D" : "black"} name="Safety" size={20} />
          // )}
        />
      </View>
    </View>
  );
}
