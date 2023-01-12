import { StyleSheet } from 'react-native';
import color from '../../assets/themes/Color';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


const styles = StyleSheet.create({
    dropdown: {
      borderRadius: 8,
      width: "100%",
      borderWidth: 2,
      borderColor: color.gray,
      backgroundColor: color.white,
      marginVertical: 10,
    },
    label_text: {
      color: color.black,
      fontSize: 13,
      fontFamily: "Montserrat-Regular",
      marginBottom: 5,
      alignSelf:'flex-start'
    },
    downimg: {
      position: "absolute",
      right: 10,
      // alignSelf:'center',
      height: 8,
      resizeMode: "contain",
      top: "40%",
    },
    text_button: {
      textAlign: "left",
      fontSize: 14,
      alignSelf: "center",
      justifyContent: "center",
      color: color.black,
      fontFamily: "Montserrat-Medium",
      marginLeft:-1
    },
    row_text:{
      fontSize: 16,
      alignSelf: 'center',
      justifyContent: 'center',
      color: color.black,
      fontFamily:'Montserrat-Medium'
    },
    dropdown_style:{
      borderRadius:10,
  
    }
  });

export { styles }