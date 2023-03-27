import React, { useEffect } from "react";
import { View, StatusBar, BackHandler } from "react-native";
import color from "./src/app/assets/themes/Color";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, ForgetPassword, UserType, OTPVerification } from "./src/app/screens";
import { Signup_Admin } from "./src/app/screens/admin";
import { RegistrationForAll, Home } from "./src/app/screens/students";
import { Signup_Educator } from "./src/app/screens/educator";
import { Signup_Affiliate } from "./src/app/screens/affiliate";
import { Signup_Parent } from "./src/app/screens/parents";
import HomeScreen from "./src/app/screens/students/home_screen/HomeScreen";
import useFonts from "./src/app/api/useFonts";
import LearnerList from "./src/app/screens/students/education/LearnerList";
import InstructorList from "./src/app/screens/students/education/InstructorList";
import Library from "./src/app/screens/students/education/Library";
import EditFinancial from "./src/app/screens/students/education/EditFinancial";
import AddFinancial from "./src/app/screens/students/education/AddFinancial";
import {
  ChangePassword,
  AboutUs,
  TechnicalSupport,
  ContactUs,
  TermsCondition,
} from "./src/app/screens/common/hamburgerMenu";
import FinancialAssistance from "./src/app/screens/students/education/FinancialAssistance";
import {
  AddBlog,
  AddFileCabinet,
  AddLink,
  AddMyJournal,
  AddProject,
  Blogs,
  CourceRoomAccess,
  CoursePresentlyEnrolled,
  EventCalender,
  ExportContent,
  FileCabinet,
  LibraryAccess,
  Mail,
  MyJournal,
  MyProjects,
  MyResources,
  PreviousCourses,
  StoreFavoriteLinks,
  ViewJournal,
  ViewContent,
  ViewBlogs,
  ViewMyProject,
  ViewStoreFavoriteLinks,
  JoinNewCourse,
  EditFileCabinet,
  EditStoreFavoriteLinks,
  EditMyProjects,
  EditBlogs,
  EditMyJournal,
  AddEditStudentCorner,
  ShowResume,
} from "./src/app/screens/students/account";
import ViewProfile from "./src/app/screens/ViewProfile";
import EventCalender2 from "./src/app/screens/students/account/EventCalender2";
import UpdateProfile from "./src/app/screens/students/UpdateProfile";
import { InstituteInfo, CourseDetail, ClassRoom } from "./src/app/screens/students/account/courses_list";
import { LogBox } from "react-native";
import { AddEvent, Calendar, ViewEventDetails, EditEvent } from "./src/app/screens/students/calender";
import NavigationDrawer from "./src/app/screens/students/home_screen/NavigationDrawer";
import RootNavigator from "./src/app/navigations/RootNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
// import FlashMessage from "react-native-flash-message";
const Stack = createNativeStackNavigator();

export default function App() {
  console.error = (error) => error.apply;
  LogBox.ignoreLogs(["ViewPropTypes will be removed", "ColorPropType will be removed"]);
  // useEffect(() => {
  //   useFonts();
  //   const backHandler = BackHandler.addEventListener("hardwareBackPress", function () {
  //     return true;
  //   });
  //   return () => backHandler.remove();
  // }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootNavigator />
      {/*<FlashMessage position="top" />*/}
    </SafeAreaView>
    // <>
    //   <IconRegistry icons={EvaIconsPack} />
    //   <ApplicationProvider {...eva} theme={eva.light}>
    //     <NavigationContainer independent={true}>
    //       <Stack.Navigator
    //         initialRouteName="HomeScreen"
    //         screenOptions={{ headerShown: false }}
    //       >
    //         <Stack.Screen name="Login" component={Login} />
    //         <Stack.Screen
    //           name="RegistrationForAll"
    //           component={RegistrationForAll}
    //         />
    //         <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    //         <Stack.Screen name="Home" component={Home} />
    //         <Stack.Screen name="HomeScreen" component={HomeScreen} />
    //         <Stack.Screen name="UserType" component={UserType} />
    //         <Stack.Screen name="Signup_Educator" component={Signup_Educator} />
    //         <Stack.Screen name="Signup_Parent" component={Signup_Parent} />
    //         <Stack.Screen name="Signup_Admin" component={Signup_Admin} />
    //         <Stack.Screen
    //           name="Signup_Affiliate"
    //           component={Signup_Affiliate}
    //         />
    //         <Stack.Screen name="ChangePassword" component={ChangePassword} />
    //         <Stack.Screen name="ContactUs" component={ContactUs} />
    //         <Stack.Screen
    //           name="TechnicalSupport"
    //           component={TechnicalSupport}
    //         />
    //         <Stack.Screen name="AboutUs" component={AboutUs} />
    //         <Stack.Screen name="TermsCondition" component={TermsCondition} />

    //         <Stack.Screen name="InstructorList" component={InstructorList} />
    //         <Stack.Screen name="LearnerList" component={LearnerList} />
    //         <Stack.Screen name="Library" component={Library} />
    //         <Stack.Screen
    //           name="FinancialAssistance"
    //           component={FinancialAssistance}
    //         />

    //         <Stack.Screen name="AddFileCabinet" component={AddFileCabinet} />
    //         <Stack.Screen name="Blogs" component={Blogs} />
    //         <Stack.Screen
    //           name="CourceRoomAccess"
    //           component={CourceRoomAccess}
    //         />
    //         <Stack.Screen
    //           name="CoursePresentlyEnrolled"
    //           component={CoursePresentlyEnrolled}
    //         />
    //         <Stack.Screen name="EventCalender" component={EventCalender} />
    //         <Stack.Screen name="ExportContent" component={ExportContent} />
    //         <Stack.Screen name="LibraryAccess" component={LibraryAccess} />
    //         <Stack.Screen name="Mail" component={Mail} />
    //         <Stack.Screen name="MyJournal" component={MyJournal} />
    //         <Stack.Screen name="MyResources" component={MyResources} />
    //         <Stack.Screen name="PreviousCourses" component={PreviousCourses} />
    //         <Stack.Screen
    //           name="StoreFavoriteLinks"
    //           component={StoreFavoriteLinks}
    //         />
    //         <Stack.Screen name="FileCabinet" component={FileCabinet} />
    //         <Stack.Screen name="MyProjects" component={MyProjects} />
    //         <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
    //         <Stack.Screen name="ViewProfile" component={ViewProfile} />
    //         <Stack.Screen name="AddMyJournal" component={AddMyJournal} />
    //         <Stack.Screen name="AddProject" component={AddProject} />
    //         <Stack.Screen name="AddBlog" component={AddBlog} />
    //         <Stack.Screen name="AddLink" component={AddLink} />
    //         <Stack.Screen name="EventCalender2" component={EventCalender2} />
    //         <Stack.Screen name="ViewJournal" component={ViewJournal} />
    //         <Stack.Screen name="ViewContent" component={ViewContent} />
    //         <Stack.Screen name="ViewBlogs" component={ViewBlogs} />
    //         <Stack.Screen name="ViewMyProject" component={ViewMyProject} />
    //         <Stack.Screen
    //           name="ViewStoreFavoriteLinks"
    //           component={ViewStoreFavoriteLinks}
    //         />
    //         <Stack.Screen name="AddEvent" component={AddEvent} />
    //         <Stack.Screen name="Calendar" component={Calendar} />
    //         <Stack.Screen
    //           name="ViewEventDetails"
    //           component={ViewEventDetails}
    //         />
    //         <Stack.Screen name="JoinNewCourse" component={JoinNewCourse} />
    //         <Stack.Screen name="EditEvent" component={EditEvent} />
    //         <Stack.Screen name="EditFileCabinet" component={EditFileCabinet} />
    //         <Stack.Screen
    //           name="EditStoreFavoriteLinks"
    //           component={EditStoreFavoriteLinks}
    //         />
    //         <Stack.Screen name="EditMyProjects" component={EditMyProjects} />
    //         <Stack.Screen name="EditBlogs" component={EditBlogs} />
    //         <Stack.Screen name="EditMyJournal" component={EditMyJournal} />
    //         <Stack.Screen name="EditFinancial" component={EditFinancial} />
    //         <Stack.Screen name="AddFinancial" component={AddFinancial} />

    //         <Stack.Screen name="InstituteInfo" component={InstituteInfo} />
    //         <Stack.Screen name="ClassRoom" component={ClassRoom} />
    //         <Stack.Screen name="CourseDetail" component={CourseDetail} />
    //         <Stack.Screen name="OTPVerification" component={OTPVerification} />
    //         <Stack.Screen name="AddEditStudentCorner" component={AddEditStudentCorner} />
    //         <Stack.Screen name="ShowResume" component={ShowResume} />
    //         <Stack.Screen name="NavigationDrawer" component={NavigationDrawer} />

    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   </ApplicationProvider>
    // </>
  );
}
