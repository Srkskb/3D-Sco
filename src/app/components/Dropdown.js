import React from 'react'
import {StyleSheet, SafeAreaView,View} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
const sports = [
    {
      label: 'Student',
      value: 'Student',
    },
    {
      label: 'Educator',
      value: 'Educator',
    },
    {
      label: 'Admin',
      value: 'Admin',
    },
    {
      label: 'Parent',
      value: 'Parent',
    },
    {
      label: 'Affiliate',
      value: 'Affiliate',
    },
  ];
  const placeholder = {
    label: 'Select Category...',
    value: null,
    color: '#82027D',
  };
export default function Dropdown(){
    return (
      <SafeAreaView>
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={sports}
            style={pickerSelectStyles}
            placeholder={placeholder}
       />
        </SafeAreaView>
    )
}
 const pickerSelectStyles = StyleSheet.create({
    inputAndroid:{
        color:'#000',
        // marginLeft:5,
        fontSize:16,
        fontFamily:'Montserrat-Medium'
    },
    inputIOS:{
      color:'#000',
      paddingLeft:15,
      fontSize:16,
      
    },
 })
