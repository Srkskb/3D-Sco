import { View, Text ,StyleSheet} from "react-native";
import React, { useState } from "react";
import color from "../assets/themes/Color";
import Checkbox from "expo-checkbox";
export default function NewCheckbox({onPress}) {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.checkbox_container}>
    <Checkbox
      style={styles.checkbox}
      value={isChecked}
      onValueChange={()=>{onPress();setChecked(!isChecked)}}
      color={isChecked ? color.purple : undefined}
    />
  </View>
  );
}
const styles = StyleSheet.create({
    
});
