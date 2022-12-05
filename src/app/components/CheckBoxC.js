import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import CheckBox from "react-native-check-box";
import color from "../assets/themes/Color";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <CheckBox
          //  style={{}}
          onClick={() => {
            this.setState({
              isChecked: !this.state.isChecked,
            });
          }}
          isChecked={this.state.isChecked}
          // leftText={"CheckBox"}
          checkedCheckBoxColor={color.purple}
          checkBoxColor={color.purple}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 0,
    // width: 0,
    backgroundColor: color.white,
    padding: 0,
    margin: 0,
  },
});
