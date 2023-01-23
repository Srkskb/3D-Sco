import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./Styles";
import SelectDropdown from "react-native-select-dropdown";
const down_img = require("../../assets/images/down.png");
export default function CityDropdown({ label, ...props }) {
  const [getCityList, setCityList] = useState([]);
  const country_id = localStorage.getItem("countryId");
  const state_id = localStorage.getItem("stateID");

  useEffect(() => {
    if (
      country_id == null ||
      (country_id === "" && state_id == null) ||
      state_id === ""
    ) {
      return;
    }
    fetch(
      `https://3dsco.com/3discoapi/state.php?city=1&country_id=${country_id}&state_id=${state_id}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success == 1) {
          setCityList(res.data);
        } else {
          console.log("City list can't fetch right now");
        }
      });
  }, [state_id]);
  return (
    <View>
      <Text style={styles.label_text}>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          data={getCityList.map((list, index) => list.name)}
          buttonTextAfterSelection={(selectedItem, index) => {
            localStorage.setItem("city_id", getCityList[index].city_id);
            localStorage.setItem("cityName", getCityList[index].name);
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.text_button}
          rowTextStyle={styles.row_text}
          dropdownStyle={styles.dropdown_style}
          {...props}
        />
        <Image style={styles.downimg} source={down_img}></Image>
      </View>
    </View>
  );
}
