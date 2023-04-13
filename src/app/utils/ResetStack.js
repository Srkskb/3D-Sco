import { CommonActions } from "@react-navigation/native";

export const resetStack = (navigation, name) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: name }],
    })
  );
};
