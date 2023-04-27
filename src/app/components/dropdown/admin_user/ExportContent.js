import { View, Text, Image, StyleSheet } from "react-native";
import color from "../../../assets/themes/Color";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
const down_img = require("../../../assets/images/down.png");
const Value = [
  // { name: "Export Content", id: "1" },
  { name: "Not available on any of the pages", id: "1" },
  { name: "Available only for top level pages", id: "2" },
  { name: "Available on every page", id: "3" },
];
export default function ExportContent({ label, ...props }) {
  return (
    <View>
      {label && (
        <Text style={styles.label_text} {...props}>
          {label}
        </Text>
      )}
      <View style={{ flexDirection: "row", marginBottom: 20, ...props }}>
        <SelectDropdown
          data={Value}
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
          defaultValueByIndex={0}
          {...props}
        />
        <Image style={styles.downimg} source={down_img}></Image>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 8,
    width: "100%",
    borderWidth: 1,
    borderColor: color.light_skyblue,
    backgroundColor: color.white,
  },
  label_text: {
    color: color.black,
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
    marginBottom: 5,
  },
  downimg: {
    position: "absolute",
    right: 10,
    // alignSelf:'center',
    height: 8,
    resizeMode: "contain",
    top: "40%",
  },
  text_button: {
    textAlign: "left",
    fontSize: 14,
    alignSelf: "center",
    justifyContent: "center",
    color: color.black,
    fontFamily: "Montserrat-Medium",
    marginLeft: -1,
  },
  row_text: {
    fontSize: 16,
    alignSelf: "center",
    justifyContent: "center",
    color: color.black,
    fontFamily: "Montserrat-Medium",
  },
  dropdown_style: {
    borderRadius: 10,
  },
});
