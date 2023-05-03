import React from "react";
import { ActivityIndicator, Dimensions, StatusBar, View } from "react-native";
import HeaderBack from "../components/header/Header";

const Loader = () => {
  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,

        backgroundColor: "#ffffffcc",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        // backgroundColor: "red",
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default Loader;
