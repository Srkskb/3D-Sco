import { View, Text, Image, StyleSheet } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from "react-native-element-dropdown";

import React, { useEffect, useState } from "react";
import { styles } from "./Styles";
import { myHeadersData } from "../../api/helper";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const down_img = require("../../assets/images/down.png");

export default function CategoryDropdown({ label, onSelect, ...props }) {
  const [categoryList, setCategoryList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const fetch = async () => {
    // const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    axios
      .get("https://3dsco.com/3discoapi/3dicowebservce.php?category_list=1")
      .then(function (res) {
        if (res.data.success == 1) {
          if (res.data.data) {
            setCategoryList(res.data.data);
          } else setCategoryList([{ Course: "Please add the course", id: 0 }]);
        } else {
          console.log("Course List can't fetch right now");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    !categoryList.length && fetch();

    // const myHeaders = myHeadersData();

    // fetch("https://3dsco.com/3discoapi/3dicowebservce.php?category_list=1", {
    //   method: "GET",

    //   headers: {
    //     myHeaders,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.success == 1) {
    //       setCategoryList(res.data);
    //     } else {
    //       alert("Try after sometime");
    //     }
    //   })
    //   .catch((error) => console.log("error", error));
  }, []);
  return (
    <View>
      {label && <Text style={styles.label_text}>{label}</Text>}
      <View style={{ flexDirection: "row", paddingVertical: 6 }}>
        {/* <SelectDropdown
          data={categoryList.map((list) => ({ name: list.Name, id: list.id }))}
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
        <Image style={styles.downimg} source={down_img}></Image> */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "#82027D" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          // inputSearchStyle={styles.text_button}
          iconStyle={styles.iconStyle}
          data={categoryList.map((item, index) => ({ name: item.Name, id: item.id }))}
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
          // value={props?.value}
          {...props}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color={isFocus ? "#82027D" : "black"} name="Safety" size={20} />
          )}
        />
      </View>
    </View>
  );
}
// const styles = StyleSheet.create({
//   dropdown: {
//     padding: 10,
//     width: "100%",

//     // backgroundColor: "red",
//   },
// });
