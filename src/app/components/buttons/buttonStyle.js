import { StyleSheet } from "react-native";
import color from "../../assets/themes/Color";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const buttonStyle = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: color.purple,
        flexDirection: "row",
        borderRadius: 3,
        alignItems: "center",
        padding: 5,
        justifyContent: 'center',
    
      },
      edit_text: {
        fontFamily: "Montserrat-Medium",
        fontSize: wp(4),
        color: color.purple,
        marginLeft: 5,
      },
});
export {buttonStyle}