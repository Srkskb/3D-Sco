import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import color from "../../assets/themes/Color";
import React, { useState } from "react";
const down_img = require("../../assets/images/down.png");
import { styles } from "./Styles";
const Courses = [
  { id: 0, name: "Select Course" },
  { id: 1, name: "B.Sc.- Information Technology." },
  { id: 2, name: "B.Sc- Nursing." },
  { id: 3, name: "BPharma- Bachelor of Pharmacy." },
  { id: 4, name: "B.Sc- Interior Design." },
  { id: 5, name: "BDS- Bachelor of Dental Surgery." },
];
export default function SelectCourse({ label, ...props }) {
  const [selectItem, setSelectItem] = useState(Courses);
  return (
    <View
      style={{justifyContent: "center", alignItems: "center" }}
    >
      {label && <Text style={styles.label_text}>{label}</Text>}

      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          defaultValue={"Select Course"}
          data={selectItem.map((item, index) => item.name)}
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
