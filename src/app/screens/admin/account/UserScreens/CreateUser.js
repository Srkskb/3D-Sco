import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import color from "../../../../assets/themes/Color";
import Headline from "../../../../components/Headline";
import Input from "../../../../components/inputs/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import User from "../../../../components/dropdown/User";
import GenderDropdown from "../../../../components/dropdown/GenderDropdown";
import CountryDropdown from "../../../../components/dropdown/CountryDropdown";
import CityDropdown from "../../../../components/dropdown/CityDropdown";
import UniversityDropdown from "../../../../components/dropdown/UniversityDropdown";
import StateDropdown from "../../../../components/dropdown/StateDropdown";
import CategoryDropdown from "../../../../components/dropdown/CategoryDropdown";
import Input2 from "../../../../components/inputs/Input2";
import { AppButton } from "../../../../components/buttons";
import ActiveStatus from "../../../../components/dropdown/ActiveStatus";
import AccountType from "../../../../components/dropdown/AccountType";
export default function CreateUser() {
  const [isVisibleEntry, setIsVisibleEntry] = useState(true);
  const [isVisibleEntry2, setIsVisibleEntry2] = useState(true);
  
  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <Headline title={"Required information"} />
        <Input label={"Username"} placeholder={"Enter Username"} />
        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsVisibleEntry(!isVisibleEntry)}
          >
            <MaterialCommunityIcons
              name={
                isVisibleEntry === false ? "eye-outline" : "eye-off-outline"
              }
              size={24}
              color={isVisibleEntry === false ? color.dark_gray : color.purple}
            />
          </TouchableOpacity>
          <Input
            label={"Password"}
            placeholder={"Enter Password"}
            secureTextEntry={isVisibleEntry}
            autoCapitalize="none"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsVisibleEntry2(!isVisibleEntry2)}
          >
            <MaterialCommunityIcons
              name={
                isVisibleEntry2 === false ? "eye-outline" : "eye-off-outline"
              }
              size={24}
              color={isVisibleEntry2 === false ? color.dark_gray : color.purple}
            />
          </TouchableOpacity>
          <Input
            label={"Confirm Password"}
            placeholder={"Confirm Password"}
            secureTextEntry={isVisibleEntry}
            autoCapitalize="none"
          />
        </View>
        <Input label={"Email"} placeholder={"Enter Email Address"} />
        <Input label={"Name"} placeholder={"Name"} />
        {/* <User onSelect={(item, index) => console.log(item)} label={"Account Type"} /> */}
        {/* <AccountType onSelect={(item, index) => console.log(item)} label={"Account Type"} /> */}
        <ActiveStatus  onSelect={(selectedItem, index) => {}}/>
        <Headline title={"Personal information (Optional)"} />
        <Input2 label={"Date of Birth"} placeholder={"DD-MMM-YYYY"} />
        <GenderDropdown
          onSelect={(item, index) => console.log(item)}
          label={"Select Gender"}
        />
        <Input2 label={"Street Address"} placeholder={"Street Address"} />
        <Input2 label={"Postal/Zip Code"} placeholder={"Postal/Zip Code"} />
        <Input2 label={"School Name"} placeholder={"School Name"} />
        <Input2 label={"College Name"} placeholder={"College Name"} />
        <CountryDropdown
          label={"Country"}
          onSelect={(item, index) => console.log(item)}
        />
        <StateDropdown
          label={"State"}
          onSelect={(item, index) => console.log(item)}
        />
        <CityDropdown
          label={"City"}
          onSelect={(item, index) => console.log(item)}
        />
        <UniversityDropdown
          label={"University"}
          onSelect={(item, index) => console.log(item)}
        />
        <Input2 label={"Telephone"} placeholder={"Enter Mobile Number"} />
        <Input2 label={"Website"} placeholder={"http://"} />
        <CategoryDropdown
          label={"Category"}
          onSelect={(item, index) => console.log(item)}
        />
        <AppButton title={"Continue"} btnColor={color.purple} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  icon: {
    position: "absolute",
    right: 15,
    top: "45%",
    zIndex: 1,
  },
});
