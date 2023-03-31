import { View, Text, Image, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { useEffect, useState } from "react";
import { myHeadersData } from "../../api/helper";
import color from "../../assets/themes/Color";
const down_img = require("../../assets/images/down.png");

export default function RoundCategory({ label, ...props }) {
  const [categoryList, setCategoryList] = useState([]);
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
          console.log(res.data);
        } else {
          alert("Try after sometime");
        }
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <View>
      <View style={{ width: "80%" }}>
        <SelectDropdown
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
        />
        {/* <Image style={styles.downimg} source={down_img}></Image> */}
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
