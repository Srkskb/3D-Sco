import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React from "react";
import color from "../../assets/themes/Color";
  import { FontAwesome } from "@expo/vector-icons";
  
  export default function SearchEnroll({ ...props }) {
    return (
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            
            {...props}
          />
        </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      marginRight:20
    },
    input_container: {
      flexDirection: "row",
      width:'100%'
      
    },
    input: {
      borderWidth: 1,
      borderColor: color.purple,
      padding: 5,
      paddingHorizontal:10,
      fontSize: 13,
      borderRadius: 8,
      fontFamily: "Montserrat-Regular",
      width:'100%',
      paddingVertical:10
    },
  });
  