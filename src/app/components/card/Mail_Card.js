import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import color from "../../assets/themes/Color";
import CardButton from "../buttons/CardButton";
export default function Mail_Card({
  title,
  description,
  spam,
  inbox,
  archive,
  sent,
  sender,
  onPress,
  replyPress,
  archivePress,
  deletePress,
  spamPress,
  resendPress,
  notSpamPress,
  unArchivePress,
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {inbox && <Text style={styles.senderText}>From: {sender}</Text>}
      {sent && <Text style={styles.senderText}>To: {sender}</Text>}
      {spam && <Text style={styles.senderText}>From: {sender}</Text>}
      {archive && <Text style={styles.senderText}>From: {sender}</Text>}
      {/* <Text style={{ fontFamily: "Montserrat-Medium" }}>
        Date: <Text>12/01/2023 01:23 PM</Text>
      </Text> */}
      {/* {inbox && (
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <CardButton
            label={"Reply"}
            textColor={"green"}
            onPress={replyPress}
          />
          <CardButton
            label={"Archive"}
            textColor={"green"}
            onPress={archivePress}
          />
          <CardButton
            label={"Delete"}
            borderColor={color.red}
            textColor={color.red}
            onPress={deletePress}
          />
          <CardButton
            label={"Spam"}
            borderColor={color.red}
            textColor={color.red}
            onPress={spamPress}
          />
        </View>
      )}
      {sent && (
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <CardButton
            label={"Resend"}
            textColor={"green"}
            onPress={resendPress}
          />
          <CardButton
            label={"Delete"}
            borderColor={color.red}
            textColor={color.red}
            onPress={deletePress}
          />
        </View>
      )}
      {spam && (
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <CardButton
            label={"Delete"}
            borderColor={color.red}
            textColor={color.red}
            onPress={deletePress}
          />
          <CardButton
            label={"Not Spam"}
            borderColor={color.red}
            textColor={color.red}
            onPress={notSpamPress}
          />
        </View>
      )}
      {archive && (
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <CardButton
            label={"Unarchive"}
            textColor={"green"}
            onPress={unArchivePress}
          />

          <CardButton
            label={"Delete"}
            borderColor={color.red}
            textColor={color.red}
            onPress={deletePress}
          />
        </View>
      )} */}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: color.white,
    borderColor: color.light_gray,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
    marginTop: 5,
  },
  title: {
    color: color.purple,
    fontFamily: "Montserrat-Bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  description: {
    fontFamily: "Montserrat-Regular",
    textAlign: "justify",
    fontSize: 14,
    color: color.black,
    marginBottom: 10,
  },
  senderText: {
    fontFamily: "Montserrat-Medium",
  },
});
