import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { useEffect, useState } from "react";
import { styles } from "./Styles";
import { myHeadersData } from "../../api/helper";

const down_img = require("../../assets/images/down.png");

export default function CategoryDropdown({ label, ...props }) {
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
        
        } else {
          alert("Try after sometime");
        }
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <View>
      <Text style={styles.label_text}>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          data={categoryList.map((list) => list.Name)}
          buttonTextAfterSelection={(selectedItem,index) => {
             localStorage.setItem("catID", categoryList[index].id);
             
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
