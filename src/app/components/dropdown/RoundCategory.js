import { View, Text, Image, StyleSheet } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from "react-native-element-dropdown";

import React, { useEffect, useRef, useState } from "react";
import { myHeadersData } from "../../api/helper";
import color from "../../assets/themes/Color";
const down_img = require("../../assets/images/down.png");

export default function RoundCategory({ label, onSelect, ...props }) {
  const [categoryList, setCategoryList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const myHeaders = myHeadersData();

    fetch("https://3dsco.com/3discoapi/3dicowebservce.php?category_list=1", {
      method: "GET",

      headers: {
        myHeaders,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success == 1) {
          setCategoryList(res.data);
        } else {
          alert("Try after sometime");
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <View>
      <View style={{ width: "80%" }}>
        {/* <SelectDropdown
          data={categoryList.map((list, index) => ({ id: list.id, name: list.Name }))}
          buttonTextAfterSelection={(selectedItem, index) => {
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
        /> */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "#82027D" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          // inputSearchStyle={styles.placeholderStyle}
          iconStyle={styles.iconStyle}
          data={categoryList?.map((item, index) => ({ name: item.Name, id: item.id }))}
          search
          maxHeight={300}
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
          renderRightIcon={false}
          {...props}
          // renderLeftIcon={() => (
          //   <AntDesign style={styles.icon} color={isFocus ? "#82027D" : "black"} name="Safety" size={20} />
          // )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 50,
    width: 140,
    height: 40,
    borderWidth: 1,
    borderColor: color.purple,
    backgroundColor: color.white,
    // alignItems: "center",
    // marginLeft: 10,
  },
  placeholderStyle: {
    fontSize: 15,

    marginLeft: 10,
    margin: "auto",
    color: "#79787E",
  },
  selectedTextStyle: {
    fontSize: 15,

    marginLeft: 10,
  },
  text_button: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  dropdown_style: {
    width: "80%",
  },
  row_text: {
    fontFamily: "Montserrat-Medium",
  },
});
