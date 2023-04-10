import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Icon, withBadge } from "react-native-elements";
import color from "../../assets/themes/Color";
const BadgeIcon = withBadge(0)(Icon);
export default function HomeHeader({ navigation, title,mailPress }) {
  return (
    <SafeAreaView>
      <View style={styles.headerStyle}>
        <Icon
          type="material-community"
          name="menu"
          color={color.purple}
          size={40}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <Text style={styles.title}>{title}</Text>
        {/* <BadgeIcon
          type="material-community"
          name="email"
          color={color.purple}
          size={35}
          onPress={mailPress}
        /> */}
        <View style={{width:35}}></View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: color.white,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: color.purple,
  },
});
