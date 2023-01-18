import {
    Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import color from "../../../../assets/themes/Color";
import Mail_Card from "../../../../components/card/Mail_Card";
import CommonDropdown from "../../../../components/dropdown/CommonDropdown";
import Input from "../../../../components/inputs/Input";
import User from "../../../../components/dropdown/User";
import NewCheckbox from "../../../../components/NewCheckbox";
import HeaderBack from "../../../../components/header/Header";
import { AppButton } from "../../../../components/buttons";
const {height} =Dimensions.get("window")
export default function ComposeMail({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBack
        title={"Compose a Mail"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{ margin: 15 }}>
          <User label={"Send Email To"} onSelect={(item, index) => {}} />
          <View
            style={{
              borderRadius: 5,
              elevation: 5,
              backgroundColor: color.white,
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              paddingHorizontal: 15,
              marginBottom: 10,
            //   height:height/2
            }}
          >
            
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <NewCheckbox />
              <Text style={{ marginLeft: 10, fontFamily: "Montserrat-Medium" }}>
                User Name
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <NewCheckbox />
              <Text style={{ marginLeft: 10, fontFamily: "Montserrat-Medium" }}>
                User Name
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <NewCheckbox />
              <Text style={{ marginLeft: 10, fontFamily: "Montserrat-Medium" }}>
                User Name
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <NewCheckbox />
              <Text style={{ marginLeft: 10, fontFamily: "Montserrat-Medium" }}>
                User Name
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
                marginTop: 10,
                // backgroundColor: color.purple,
                padding: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  backgroundColor: color.purple,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <Text style={{fontFamily:'Montserrat-SemiBold',color:color.white}}>Select All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  backgroundColor: color.purple,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <Text style={{fontFamily:'Montserrat-SemiBold',color:color.white}}>Unselect All</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Input label={"Subject"} placeholder={"Subject"} />
          <Input
            label={"Message"}
            placeholder={"Type Your Message"}
            numberOfLines={6}
            multiline={true}
            textAlignVertical={"top"}
          />
          <AppButton title={"Send"} btnColor={color.purple} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
