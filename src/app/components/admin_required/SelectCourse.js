import { View, Text, Image } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from "react-native-element-dropdown";
// import color from "../../assets/themes/Color";
import React, { useEffect, useState } from "react";
// const down_img = require("../../assets/images/down.png");
import { styles } from "./Styles";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

export default function SelectCourse({ label, onSelect, ...props }) {
  const [selectItem, setSelectItem] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const fetchData = async () => {
    const myData = JSON.parse(await AsyncStorage.getItem("userData"));

    axios
      .get(`https://3dsco.com/3discoapi/3dicowebservce.php?courses_list=1&user_id=${myData.id}`)
      // .then((response) => response.json())
      .then(function (res) {
        if (res?.data?.success == 1) {
          if (res?.data?.data) {
            setSelectItem(res.data.data);
          } else setSelectItem([{ name: "No data to display", id: "" }]);
        } else {
          console.log("Course List can't fetch right now");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    !selectItem.length && fetchData();
  }, []);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {label && <Text style={styles.label_text}>{label}</Text>}

      {/* <View style={{ flexDirection: "row" }}>
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
          value={{ name: "hajs", id: "1" }}
        />

        <Image style={styles.downimg} source={down_img}></Image>
      </View> */}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#82027D" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={selectItem.map((item, index) => ({ name: item.Course, id: item.id }))}
        // data={[
        //   ...selectItem?.map((item) => ({ name: item.Course, id: item.id })),
        //   { name: "No data to display", id: "" },
        // ]}
        search={selectItem?.length}
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
      {/* </View> */}
    </View>
  );
}
