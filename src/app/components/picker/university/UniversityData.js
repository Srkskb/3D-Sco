import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

// Add Data Here

const University = [
  'Jadavpur University, Salt Lake Campus, Kolkata',
  'Pune University, Ganeshkhind Road , Pune',
  'University of Hyderabad, Kukatpally, Hyderabad, Andhra Pradesh',
  'Jawaharlal Nehru University, New Mehrauli Road, New Delhi',
  'University of Madras, Chennai, Tamilnadu',
  'Madurai Kamraj University, Nagamalai Puthukottai, Tamil Nadu'
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import color from '../../../assets/themes/Color';

const UniversityData = props => {
  const onPressItem = option => {
    props.changeModalVisibility(false);
    props.setData(option);
  };
  const option = University.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}>
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={styles.container}>
      <View style={[styles.modal, {width: WIDTH, height: HEIGHT / 3.5}]}>
      <ScrollView showsVerticalScrollIndicator={true}>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.transparent_black,
  },
  modal: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: color.purple,
    position: 'absolute',
    bottom: -10,
  },
  option: {
    borderRadius: 12,
    alignItems: 'flex-start',
    alignSelf: 'center',
    borderBottomWidth: 0.4,
    borderColor: '#808080',
    alignSelf: 'center',
    width: '100%',
    height:50
  },
  text: {
    margin: 15,
    fontSize: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    color: color.black,
    fontFamily:'Montserrat-Medium'
  },
});
export {UniversityData};
