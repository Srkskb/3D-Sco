import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import color from "../../../../assets/themes/Color";
import Mail_Card from "../../../../components/card/Mail_Card";
export default function Inbox({navigation}) {
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <ScrollView style={{}}>
        <View style={{ margin: 15 }}>
          <Mail_Card
            title={"title"}
            description={
              "this is description this is description this is description this is description this is description this is descriptions"
            }
            inbox
            sender={"rohit@gmail.com"}
            onPress={()=>navigation.navigate("ViewMail",{msgType:"inbox"})}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
