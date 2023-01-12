import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import React from "react";
import color from "../../../../assets/themes/Color";
import CommonDropdown from "../../../../components/dropdown/CommonDropdown";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../../../../components/buttons/AppButton";
export default function Users() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headline}>Account Status</Text>
        <CommonDropdown />
        <Text style={styles.headline}>Account Type</Text>
        <CommonDropdown />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.input}>
            <View
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="search" size={24} color={color.purple} />
            </View>
            <View
              style={{
                width: "78%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{
                  width: "100%",
                  fontFamily: "Montserrat-Regular",
                  fontSize: 12,
                }}
                placeholder={"Search Login Name, Email.."}
              />
            </View>
          </View>
          <View style={{ width: "38%" }}>
            <CommonDropdown marginBottom={0} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View style={{ width: "58%" }}>
            <CommonDropdown />
          </View>
          <View style={{ width: "38%" }}>
            <CommonDropdown />
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Text style={styles.text}>Logged in within: </Text>
          </View>

          <View
            style={{
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              height: 50,
              borderRadius: 8,
              borderColor: color.purple,
              paddingHorizontal: 10,
              marginHorizontal: 10,
            }}
          >
            <TextInput
              style={{
                width: "100%",
                fontFamily: "Montserrat-Regular",
                fontSize: 12,
              }}
              placeholder={""}
            />
          </View>
          <View>
            <Text style={styles.text}>days</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <AppButton title={"Filter"} btnColor={color.purple} />
        </View>
        <View
          style={{
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>No User Found</Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  headline: {
    fontFamily: "Montserrat-Bold",
    color: color.purple,
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  input: {
    width: "58%",
    borderWidth: 1,
    borderColor: color.purple,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat-Regular",
  },
  btnContainer: {
    width: "60%",
    alignSelf: "center",
    marginVertical: 20,
  },
});
