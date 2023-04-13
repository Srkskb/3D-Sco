import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import color from "../../assets/themes/Color";
import React, { useEffect, useState } from "react";
const down_img = require("../../assets/images/down.png");
import { styles } from "./Styles";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export default function SelectCourse({ label, ...props }) {
  const [selectItem, setSelectItem] = useState([]);

  const fetch = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));
    axios
      .get(`https://3dsco.com/3discoapi/3dicowebservce.php?courses_list=1&user_id=${myData.id}`)
      .then(function (res) {
        if (res.data.success == 1) {
          if (res.data.data) {
            setSelectItem(res.data.data);
          } else setSelectItem([{ Course: "Please add the course", id: 0 }]);
        } else {
          console.log("Course List can't fetch right now");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    !selectItem.length && fetch();
  }, []);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {label && <Text style={styles.label_text}>{label}</Text>}

      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          defaultValue={"Select Course"}
          data={selectItem.map((item, index) => ({ name: item.Course, id: item.id }))}
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
