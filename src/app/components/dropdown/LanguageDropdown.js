import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { useEffect, useState } from "react";
import { styles } from "./Styles";
import { myHeadersData } from "../../api/helper";

const down_img = require("../../assets/images/down.png");

export default function LanguageDropdown({ label, ...props }) {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const myHeaders = myHeadersData();

    fetch("https://3dsco.com/3discoapi/studentregistration.php?courses_language_list=1", {
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
      <Text style={styles.label_text}>{label}</Text>
      <View style={{ flexDirection: "row", paddingVertical: 6 }}>
        <SelectDropdown
          data={categoryList.map((list) => ({ name: list.Language, id: list.id }))}
          buttonTextAfterSelection={(selectedItem, index) => {
            localStorage.setItem("catID", categoryList[index].id);

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
