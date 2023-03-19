import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffffcc",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default Loader;
