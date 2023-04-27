import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from "react-native-element-dropdown";

import { styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
const down_img = require("../../assets/images/down.png");

export default function StateDropdown({ label, onSelect, countryId, ...props }) {
  const [getStateList, setStateList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const fetch = async () => {
    const myData = await AsyncStorage.getItem("userData");
    const { country_id } = JSON.parse(myData);
    // if (country_id == null || (country_id === "" && state_id == null) || state_id === "") {
    //   return;
    // }

    axios
      .get(`https://3dsco.com/3discoapi/state.php?state=1&country_id=${countryId || country_id}`)
      .then(function (res) {
        // console.log("state list", res.data);
        if (res.data.success == 1) {
          // setCityList(res.data.data);
          console.log(res.data.data);
          setStateList(res.data.data);
        } else {
          console.log("State list can't fetch right now");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch();
  }, [countryId]);

  return (
    <View>
      {label && <Text style={styles.label_text}>{label}</Text>}
      <View style={{ flexDirection: "row", paddingVertical: 6 }}>
        {/* <SelectDropdown
          data={getStateList && getStateList.map((list, index) => ({ name: list.name, id: list.state_id }))}
          buttonTextAfterSelection={(selectedItem, index) => {
            localStorage.setItem("stateID", getStateList[index].state_id);
            localStorage.setItem("stateName", getStateList[index].name);

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
          data={getStateList.map((item, index) => ({ name: item.name, id: item.state_id }))}
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
