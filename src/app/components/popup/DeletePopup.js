import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../buttons";
import color from "../../assets/themes/Color";
import React from "react";

export default function DeletePopup({ cancelPress, deletePress, deleteLoading = false }) {
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "#ccccccaa",
        zindex: 100,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "80%", backgroundColor: "#fff", padding: "6%", borderRadius: 20 }}>
        <View style={styles.arrow_container}>
          <Text style={styles.head_text}>Delete Event</Text>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.description_text}>Are you sure want to delete?</Text>
        </View>
        <View style={styles.button_container}>
          <View style={{ width: "45%" }}>
            <AppButton title={"cancel"} btnColor={color.purple} onPress={cancelPress} />
          </View>
          <View style={{ width: "45%" }}>
            <AppButton loading={deleteLoading} title={"Delete"} btnColor={color.purple} onPress={deletePress} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrow_container: {
    flexDirection: "row",
    width: "50%",
    flexWrap: "wrap",
  },
  text_container: {
    // height: 38,
    width: "100%",
    // alignSelf: "flex-end",
    paddingVertical: 10,
  },
  description_text: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    width: "100%",
    textAlign: "justify",
  },
  head_text: {
    fontSize: 16,
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    width: "95%",
  },
  button_container: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
});
