import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Mail,
  Account,
  FileCabinet,
  LibraryAccess,
  MyResources,
  CourceRoomAccess,
  AddEditStudentCorner,
  AddFileCabinet,
  EditFileCabinet,
  ViewContent,
  MyJournal,
  ViewJournal,
  EditMyJournal,
  AddMyJournal,
  StoreFavoriteLinks,
  AddLink,
  ViewStoreFavoriteLinks,
  EditStoreFavoriteLinks,
  MyProjects,
  AddProject,
  EditMyProjects,
  ViewMyProjects,
  Blogs,
  ViewBlogs,
  AddBlog,
  EditBlogs,
  ClassRoom,
  ManageResources,
  EditResources,
  AddResources,
} from "./";
import StudentMailPage from "../../../screens/students/StudentMail/mail/StudentMailPage";
import ComposeMail from "../../../screens/students/StudentMail/mail/ComposeMail";
import ViewMail from "../../../screens/students/StudentMail/mail/ViewMail";
import Reply from "../../../screens/students/StudentMail/mail/Reply";
import { InstituteInfo, JoinNewCourse } from "../homestack";
const Stack = createStackNavigator();
export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="ComposeMail" component={ComposeMail} />
      <Stack.Screen name="ViewMail" component={ViewMail} />
      <Stack.Screen name="Reply" component={Reply} />
      <Stack.Screen name="FileCabinet" component={FileCabinet} />
      <Stack.Screen name="AddFileCabinet" component={AddFileCabinet} />
      <Stack.Screen name="EditFileCabinet" component={EditFileCabinet} />
      <Stack.Screen name="ViewContent" component={ViewContent} />
      <Stack.Screen name="LibraryAccess" component={LibraryAccess} />
      <Stack.Screen name="MyResources" component={MyResources} />
      <Stack.Screen name="AddResources" component={AddResources} />
      <Stack.Screen name="ManageResources" component={ManageResources} />
      <Stack.Screen name="EditResources" component={EditResources} />
      <Stack.Screen name="CourceRoomAccess" component={CourceRoomAccess} />
      <Stack.Screen
        name="AddEditStudentCorner"
        component={AddEditStudentCorner}
      />
      <Stack.Screen name="ClassRoom" component={ClassRoom} />
      <Stack.Screen name="MyJournal" component={MyJournal} />
      <Stack.Screen name="AddMyJournal" component={AddMyJournal} />
      <Stack.Screen name="ViewJournal" component={ViewJournal} />
      <Stack.Screen name="EditMyJournal" component={EditMyJournal} />
      <Stack.Screen name="StoreFavoriteLinks" component={StoreFavoriteLinks} />
      <Stack.Screen name="AddLink" component={AddLink} />
      <Stack.Screen
        name="ViewStoreFavoriteLinks"
        component={ViewStoreFavoriteLinks}
      />
      <Stack.Screen
        name="EditStoreFavoriteLinks"
        component={EditStoreFavoriteLinks}
      />
      <Stack.Screen name="MyProjects" component={MyProjects} />
      <Stack.Screen name="AddProject" component={AddProject} />
      <Stack.Screen name="ViewMyProject" component={ViewMyProjects} />
      <Stack.Screen name="EditMyProjects" component={EditMyProjects} />
      <Stack.Screen name="Blogs" component={Blogs} />
      <Stack.Screen name="EditBlogs" component={EditBlogs} />
      <Stack.Screen name="AddBlog" component={AddBlog} />
      <Stack.Screen name="ViewBlogs" component={ViewBlogs} />
      <Stack.Screen name="StudentMailPage" component={StudentMailPage} />
      <Stack.Screen name="JoinNewCourse" component={JoinNewCourse} />
      <Stack.Screen name="InstituteInfo" component={InstituteInfo} />
    </Stack.Navigator>
  );
}
