import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from "react-native-element-dropdown";

import { styles } from "./Styles";
import { myHeadersData } from "../../api/helper";
const down_img = require("../../assets/images/down.png");

export default function CountryDropdown({ label, onSelect, ...props }) {
  const [getCountryList, setCountryList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const counteryList = () => {
    const myHeaders = myHeadersData();
    fetch("https://3dsco.com/3discoapi/3dicowebservce.php?country=1", {
      method: "GET",
      headers: {
        myHeaders,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("get data", res);
        if (res.success == 1) {
          setCountryList(res.data);
        } else {
          alert("Country list can't be right now");
        }
      })
      .catch((err) => {
        console.log("country", err);
      });
  };

  useEffect(() => {
    counteryList();
  }, []);
  return (
    <View>
      {label && <Text style={styles.label_text}>{label}</Text>}
      <View style={{ flexDirection: "row", paddingVertical: 6 }}>
        {/* <SelectDropdown
          data={getCountryList.map((list, index) => ({ name: list.name, id: list.country_id }))}
          // data={getCountryList}
          buttonTextAfterSelection={(selectedItem, index) => {
            localStorage.setItem("countryId", getCountryList[index].country_id);
            localStorage.setItem("countryName", getCountryList[index].name);
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
          data={getCountryList.map((item, index) => ({ name: item.name, id: item.country_id }))}
          search
          maxHeight={300}
          // disable={!countryId?.length && !stateId?.length}
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
