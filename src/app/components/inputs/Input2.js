import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";

const Input2 = ({ label, error, onFocus = () => {}, ...props }) => {
  const [isfocused, setIsfococused] = React.useState(false);
  return (
    <View style={styles.input_container}>
      <View style={styles.label_box}>
        {label &&(<Text style={styles.label_text}>{label}</Text>)}
        
      </View>
      <TextInput
        style={[
          styles.text_input,
          { borderColor: isfocused ? color.purple : color.gray },
        ]}
        autoCorrect={false}
        placeholderTextColor={color.light_gray}
        onFocus={() => {
          onFocus();
          setIsfococused(true);
        }}
        onBlur={() => {
          setIsfococused(false);
        }}
        {...props}
      />
    </View>
  );
};
export default Input2;
const styles = StyleSheet.create({
  input_container: {
    marginBottom: 10,
  },
  label_box: {
    flexDirection: "row",
    marginBottom: 5,
  },
  text_input: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 14,
    padding: 10,
    fontFamily: "Montserrat-Medium",
  },
  label_text: {
    color: color.black,
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
  },
});
