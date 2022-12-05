import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import color from '../../../assets/themes/Color';
import {UniversityData} from './UniversityData';

const UniversityPicker = (props) => {
  const [chooseData, setchooseData] = useState('Select University');
  const [isModalVisible, setisModalVisible] = useState(false);

  const changeModalVisibility = bool => {
    setisModalVisible(bool);
  };

  const setData = option => {
    setchooseData(option);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label_text}>{props.label}</Text>
      <TouchableOpacity
        onPress={() => changeModalVisibility(true)}
        style={styles.touchableOpacity}>
        <Text style={styles.text}>{chooseData}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}>
        <UniversityData
          changeModalVisibility={changeModalVisibility}
          setData={setData}
        />
      </Modal>
      <View
        style={{
          backgroundColor: 'transparent',
          borderTopWidth: 8,
          borderTopColor: 'gray',
          borderRightWidth: 8,
          borderRightColor: 'transparent',
          borderLeftWidth: 8,
          borderLeftColor: 'transparent',
          width: 0,
          height: 0,
          position: 'absolute',
          right: 30,
          bottom:33,
          borderTopColor: color.purple,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  text: {
    marginVertical: 15,
    fontSize: 14,
    color: color.black,
    fontFamily:'Montserrat-Medium'
  },
  touchableOpacity: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: color.gray,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    paddingLeft: 10,
    marginBottom: 10,
  },
  label_text:{
    color:color.black,
    fontSize:13,
    marginBottom:5,
    fontFamily:'Montserrat-Regular'
  }
});

export default UniversityPicker;
