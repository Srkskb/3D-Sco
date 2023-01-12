import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Headline from "../../../../components/Headline";
import CommonDropdown from "../../../../components/dropdown/CommonDropdown";
import Input2 from "../../../../components/inputs/Input2";
import color from "../../../../assets/themes/Color";
import SmallButton from "../../../../components/buttons/SmallButton";
export default function EmailUser() {
  return (
    <View style={styles.container}>
      <ScrollView style={{padding:15}}>
        <Text style={styles.title}>To</Text>
        <CommonDropdown />
        <Text style={styles.title}>Subject</Text>
        <Input2 placeholder={"Enter Subject Here"}/>
        <Text style={styles.title}>Body</Text>
        <Input2 placeholder={"Enter Message Here"} multiline={true} numberOfLines={8} textAlignVertical={"top"}/>
        <View style={styles.button}>
          <SmallButton
            title={"Cancel"}
            color={color.purple}
            fontFamily={"Montserrat-Medium"}
          />
          <SmallButton
            title="Submit"
            color={color.white}
            backgroundColor={color.purple}
            fontFamily={"Montserrat-Bold"}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:color.white
  },
  title:{
    fontFamily:'Montserrat-SemiBold',
    fontSize:14,
    color:color.purple,
    marginBottom:10,
    textDecorationLine:'underline'
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
  },
});
