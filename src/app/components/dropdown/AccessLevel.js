import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import { styles } from "./Styles";
const down_img = require("../../assets/images/down.png");
const Access = [
    'Private','Public','Shared'
  ];
export default function AccessLevel({ label, ...props }) {
  return (
    <View>
      {label && <Text style={styles.label_text} {...props}>{label}</Text>}
      
      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
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
        <Image style={styles.downimg} source={down_img}></Image>
      </View>
    </View>
  );
}

