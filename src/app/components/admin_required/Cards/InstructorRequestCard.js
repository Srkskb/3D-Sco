import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import color from "../../../assets/themes/Color";
import Edit from "../../buttons/Edit";
import Remove from "../../buttons/Remove";
import CardButton from "../../buttons/CardButton";

export default function InstructorRequestCard({
  loginName,
  approvePress,
  denyPress,
  status,
  notes,
  name,
  email,
}) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.sub_container}>
          <Text style={styles.head_text}>
            <Text>Login Name - </Text>
            <Text style={{ fontFamily: "Montserrat-Medium" }}>{loginName}</Text>
          </Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              color:
                status === "pending" || status === "Pending"
                  ? color.red
                  : "green",
              textTransform: "capitalize",
            }}
          >
            {status}
          </Text>
        </View>
      </View>

      <Text style={{ marginVertical: 3 }}>
        <Text style={{ fontFamily: "Montserrat-SemiBold", color: color.black }}>
          Name:{" "}
        </Text>
        <Text style={{ fontFamily: "Montserrat-Regular" }}>{name}</Text>
      </Text>
      <Text style={{ marginVertical: 3 }}>
        <Text style={{ fontFamily: "Montserrat-SemiBold", color: color.black }}>
          Email:{" "}
        </Text>
        <Text style={{ fontFamily: "Montserrat-Regular" }}>{email}</Text>
      </Text>
      <Text style={{ marginVertical: 3 }}>
        <Text style={{ fontFamily: "Montserrat-SemiBold", color: color.black }}>
          Notes:{" "}
        </Text>
        <Text style={{ fontFamily: "Montserrat-Regular" }}>{notes}</Text>
      </Text>

      <View style={styles.btn_container}>
        <CardButton
          label={"Approve"}
          textColor={"green"}
          onPress={approvePress}
        />

        {/* <View style={{ width: 20 }}></View> */}
        <CardButton
          label={"Deny"}
          borderColor={color.red}
          textColor={color.red}
          onPress={denyPress}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 3,
    borderColor: color.light_skyblue,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: color.white,
    elevation: 3,
  },
  head_text: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    // marginLeft:20
  },
  btn_container: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    marginTop: 10,
  },
  sub_container: {
    flexDirection: "row",
    flex: 2,
    // paddingHorizontal:10
  },
});
