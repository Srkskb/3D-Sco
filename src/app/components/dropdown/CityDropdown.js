import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./Styles";
// import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from "react-native-element-dropdown";

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
const down_img = require("../../assets/images/down.png");

export default function CityDropdown({ label, stateId, onSelect, countryId, ...props }) {
  const [getCityList, setCityList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  // const country_id = localStorage.getItem("countryId");
  // const state_id = localStorage.getItem("stateID");
  // const { country_id, state_id } = JSON.parse(localStorage.getItem("loginData"));

  const fetch = async () => {
    const myData = await AsyncStorage.getItem("userData");
    const { country_id, state_id } = JSON.parse(myData);
    // if (country_id == null || (country_id === "" && state_id == null) || state_id === "") {
    //   return;
    // }
    axios
      .get(
        `https://3dsco.com/3discoapi/state.php?city=1&country_id=${countryId || country_id}&state_id=${
          stateId || state_id
        }`
      )
      .then(function (res) {
        if (res.data.success == 1) {
          setCityList(res.data.data);
        } else {
          console.log("City list can't fetch right now");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch();
  }, [countryId, stateId]);

  return (
    <View>
      {label && <Text style={styles.label_text}>{label}</Text>}
      <View style={{ flexDirection: "row", paddingVertical: 6 }}>
        {/* <SelectDropdown
          data={getCityList?.map((list, index) => ({ name: list.name, id: list.city_id }))}
          buttonTextAfterSelection={(selectedItem, index) => {
            // localStorage.setItem("city_id", getCityList[index].city_id);
            // localStorage.setItem("cityName", getCityList[index].name);
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
          data={getCityList.map((item, index) => ({ name: item.name, id: item.city_id }))}
          search
          maxHeight={300}
          disable={!countryId?.length && !stateId?.length}
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
