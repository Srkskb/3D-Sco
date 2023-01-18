import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import color from "../../../assets/themes/Color";
import InstructorRequestCard from "../../../components/admin_required/Cards/InstructorRequestCard";
import HeaderBack from "../../../components/header/Header";

export default function InstructorRequest({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <HeaderBack
        title={"Instructor Request"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View style={{ paddingVertical: 10 }}>
          <InstructorRequestCard
          loginName={"My Tester"}
            status={"Pending"}
            notes={
              "please assign me a new class for the upcoming semester Posted on:2022-02-09 07:51:29"
            }
            name={"Armando Liwanag Demesa"}
            email={"mesalvi@gmail.com"}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
