import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AdminMail,
  AdminAccount,
  AdminEvent,
  AdminCabinet,
  AdminAddFileCabinet,
  AdminViewContent,
  AdminEditFileCabinet,
  AdminLibrary,
  AdminResources,
  AdminStoreFavoriteLinks,
  AdminAddLinks,
  AdminEditStoreFavoriteLinks,
  AdminViewStoreFavoriteLinks,
  AdminBlogs,
  AdminViewBlogs,
  AdminSuggestLinks,
  AdminAddBlogs,
  AdminEditBlogs,
  AdminExportContent,
  AdminManageResources,
  AdminAddResources,
  AdminEditResources,
  AdminMyJournal,
  AdminEditMyJournal,
  AdminViewJournal,
  AdminAddMyJournal,
  //new screens
  TopBarNavigation,
  Enrollment,
  CourseTab,
  Course,
  CreateCourse,
  EditCourse,
  Assignment,
  AddAssignment,
  EditAssignment,
  Announcement,
  AddAnnouncement,
  EditAnnouncement,
  Forum,
  AddForum,
  EditForum,
  ViewForum,
  Presentation,
  AddPresentation,
  EditPresentation,
  Backup,
  AddBackup,
  EditBackup,
  Category,
  EditCategory,
  AddCategory,
  EnrollStudent,
  InstructorRequest,
} from "./";
import AdminMailPage from "../../../screens/admin/AdminMail/mail/AdminMailPage";
import ComposeMail from "../../../screens/admin/AdminMail/mail/ComposeMail";
const Stack = createStackNavigator();
export default function AAccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminAccount" component={AdminAccount} />
      <Stack.Screen name="AdminMail" component={AdminMail} />
      <Stack.Screen name="AdminEvent" component={AdminEvent} />
      <Stack.Screen name="AdminCabinet" component={AdminCabinet} />
      <Stack.Screen
        name="AdminAddFileCabinet"
        component={AdminAddFileCabinet}
      />
      <Stack.Screen name="AdminViewContent" component={AdminViewContent} />
      <Stack.Screen
        name="AdminEditFileCabinet"
        component={AdminEditFileCabinet}
      />
      <Stack.Screen name="AdminLibrary" component={AdminLibrary} />
      <Stack.Screen name="AdminResources" component={AdminResources} />
      <Stack.Screen
        name="AdminStoreFavoriteLinks"
        component={AdminStoreFavoriteLinks}
      />
      <Stack.Screen name="AdminAddLinks" component={AdminAddLinks} />
      <Stack.Screen
        name="AdminEditStoreFavoriteLinks"
        component={AdminEditStoreFavoriteLinks}
      />
      <Stack.Screen
        name="AdminViewStoreFavoriteLinks"
        component={AdminViewStoreFavoriteLinks}
      />
      <Stack.Screen name="AdminBlogs" component={AdminBlogs} />
      <Stack.Screen name="AdminViewBlogs" component={AdminViewBlogs} />
      <Stack.Screen name="AdminSuggestLinks" component={AdminSuggestLinks} />
      <Stack.Screen name="AdminAddBlogs" component={AdminAddBlogs} />
      <Stack.Screen name="AdminEditBlogs" component={AdminEditBlogs} />
      <Stack.Screen name="AdminExportContent" component={AdminExportContent} />
      <Stack.Screen name="AdminAddResources" component={AdminAddResources} />
      <Stack.Screen name="AdminEditResources" component={AdminEditResources} />
      <Stack.Screen
        name="AdminManageResources"
        component={AdminManageResources}
      />
      <Stack.Screen name="AdminMyJournal" component={AdminMyJournal} />
      <Stack.Screen name="AdminEditMyJournal" component={AdminEditMyJournal} />
      <Stack.Screen name="AdminViewJournal" component={AdminViewJournal} />
      <Stack.Screen name="AdminAddMyJournal" component={AdminAddMyJournal} />
      {/* New Screens */}
      <Stack.Screen name="TopBarNavigation" component={TopBarNavigation} />
      <Stack.Screen name="Enrollment" component={Enrollment} />
      <Stack.Screen name="EnrollStudent" component={EnrollStudent} />
      <Stack.Screen name="CourseTab" component={CourseTab} />
      <Stack.Screen name="InstructorRequest" component={InstructorRequest} />
      {/* Courses Tab Screens */}
      <Stack.Screen name="Course" component={Course} />
      <Stack.Screen name="CreateCourse" component={CreateCourse} />
      <Stack.Screen name="EditCourse" component={EditCourse} />
      <Stack.Screen name="Assignment" component={Assignment} />
      <Stack.Screen name="EditAssignment" component={EditAssignment} />
      <Stack.Screen name="AddAssignment" component={AddAssignment} />
      <Stack.Screen name="Announcement" component={Announcement} />
      <Stack.Screen name="EditAnnouncement" component={EditAnnouncement} />
      <Stack.Screen name="AddAnnouncement" component={AddAnnouncement} />
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen name="AddForum" component={AddForum} />
      <Stack.Screen name="EditForum" component={EditForum} />
      <Stack.Screen name="ViewForum" component={ViewForum} />
      <Stack.Screen name="Presentation" component={Presentation} />
      <Stack.Screen name="AddPresentation" component={AddPresentation} />
      <Stack.Screen name="EditPresentation" component={EditPresentation} />
      <Stack.Screen name="Backup" component={Backup} />
      <Stack.Screen name="AddBackup" component={AddBackup} />
      <Stack.Screen name="EditBackup" component={EditBackup} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="AddCategory" component={AddCategory} />
      <Stack.Screen name="EditCategory" component={EditCategory} />
      {/* New Mail Page */}
      <Stack.Screen name="AdminMailPage" component={AdminMailPage} />
      <Stack.Screen name="ComposeMail" component={ComposeMail} />

    </Stack.Navigator>
  );
}
