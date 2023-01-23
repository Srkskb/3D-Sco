import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { styles } from "./Styles";
const down_img = require("../../assets/images/down.png");
export default function StateDropdown({ label, ...props }) {
  const [getStateList, setStateList] = useState([]);
  const country_id = localStorage.getItem("countryId");
  useEffect(() => {

    if (country_id == null || country_id === "") {
      return;
    }
    fetch(
      `https://3dsco.com/3discoapi/state.php?state=1&country_id=${country_id}`
    )
      .then((res) => res.json())
      .then((res) => {
        setStateList(res.data);
      });
  }, [country_id]);

  return (
    <View>
      <Text style={styles.label_text}>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          data={getStateList && getStateList.map((list, index) => list.name)}
          buttonTextAfterSelection={(selectedItem, index) => {
            localStorage.setItem("stateID", getStateList[index].state_id);
            localStorage.setItem("stateName", getStateList[index].name);

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
