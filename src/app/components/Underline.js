import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Underline() {
  return <View style={styles.line} />;
}
const styles = StyleSheet.create({
  line: {
    width: '93%',
    height: 1,
    backgroundColor: '#C6C6C8',
    alignSelf: 'center',
  },
});
