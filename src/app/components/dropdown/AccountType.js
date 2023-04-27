import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import { styles } from "./Styles";
const down_img = require("../../assets/images/down.png");
const UserAccount = [
  { name: "Student", id: "1" },
  { name: "Educator", id: "2" },
];
export default function AccountType({ label, ...props }) {
  return (
    <View>
      <Text style={styles.label_text} {...props}>
        {label}
      </Text>
      <View style={{ flexDirection: "row", paddingVertical: 6 }}>
        <SelectDropdown
          defaultValue={"this.state.selectValue"}
          data={UserAccount}
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
        />
        <Image style={styles.downimg} source={down_img}></Image>
      </View>
    </View>
  );
}
