import { View, Text, Image } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from "react-native-element-dropdown";

import React, { useState } from "react";
import { styles } from "./Styles";
const down_img = require("../../assets/images/down.png");
const Access = ["Private", "Public", "Shared"];

export default function AccessLevel({ label, onSelect, ...props }) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      {label && (
        <Text style={styles.label_text} {...props}>
          {label}
        </Text>
      )}

      <View style={{ flexDirection: "row" }}>
        {/* <SelectDropdown
          data={Access}
          buttonTextAfterSelection={(selectedItem, index) => {
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
        <Image style={styles.downimg} source={down_img}></Image> */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "#82027D" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Access.map((item, index) => ({ name: item, id: item }))}
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
          {...props}
          // renderLeftIcon={() => (
          //   <AntDesign style={styles.icon} color={isFocus ? "#82027D" : "black"} name="Safety" size={20} />
          // )}
        />
      </View>
    </View>
  );
}
