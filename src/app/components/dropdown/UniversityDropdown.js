import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { myHeadersData } from "../../api/helper";
import { styles } from "./Styles";
const down_img = require("../../assets/images/down.png");

export default function UniversityDropdown({ label, ...props }) {
  const [getUniversityList, setUniversityList] = useState([]);
  const country_id = localStorage.getItem("countryId");


  useEffect((async) => {
    const myHeaders = myHeadersData();
     if (country_id == null || country_id === "") {
      return;
    }
    fetch(
      `https://3dsco.com/3discoapi/3dicowebservce.php?university=1&country_id=${country_id}`,
      {
        method: "GET",
        headers: {
          myHeaders,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success == 1) {
          setUniversityList(res.data);
        } else {
          alert("Please after sometime");
        }
      });
  }, [country_id]);
  return (
    <View>
      <Text style={styles.label_text}>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          data={getUniversityList && getUniversityList.map((list, index) => (
            (list.name)
          ))}
          buttonTextAfterSelection={(selectedItem, index) => {
              localStorage.setItem("university_id", getUniversityList[index].university_id)
              localStorage.setItem("universityName", getUniversityList[index].name)

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
