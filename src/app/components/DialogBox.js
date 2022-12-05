import { View, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/themes/Color";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";

export default function DialogBox({ fileTitle, file }) {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  return (
    <Provider >
      <View>
        <Button style={styles.appButtonContainer} onPress={showDialog}>
          View Document
        </Button>
        <Portal style={styles.container}>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{fileTitle}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{file}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  appButtonContainer: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
    backgroundColor: color.purple,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  container:{
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
  },
  description: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
  },
});
