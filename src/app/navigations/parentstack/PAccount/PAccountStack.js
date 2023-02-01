import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ParentAccount,
  ParentEvent,
  ParentCabinet,
  ParentAddFileCabinet,
  ParentViewContent,
  ParentEditFileCabinet,
  ParentLibrary,
  ParentStoreFavoriteLinks,
  ParentAddLinks,
  ParentEditStoreFavoriteLinks,
  ParentViewStoreFavoriteLinks,
  ParentBlogs,
  ParentViewBlogs,
  ParentSuggestLinks,
  ParentAddBlogs,
  ParentEditBlogs,
  ParentExportContent,
  ParentPhotoAlbum,
  ParentAddPhoto,
  ParentViewPhoto,
  ParentEditPhoto,
} from "./";
import ParentMailPage from "../../../screens/parents/ParentMail/mail/ParentMailPage";
import ComposeMail from "../../../screens/parents/ParentMail/mail/ComposeMail";
import ViewMail from "../../../screens/parents/ParentMail/mail/ViewMail";
import Reply from "../../../screens/parents/ParentMail/mail/Reply";
const Stack = createStackNavigator();
export default function PAccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentAccount" component={ParentAccount} />
      <Stack.Screen name="ParentMailPage" component={ParentMailPage} />
      <Stack.Screen name="ViewMail" component={ViewMail} />
      <Stack.Screen name="Reply" component={Reply} />
      <Stack.Screen name="ComposeMail" component={ComposeMail} />
      <Stack.Screen name="ParentEvent" component={ParentEvent} />
      <Stack.Screen name="ParentCabinet" component={ParentCabinet} />
      <Stack.Screen
        name="ParentAddFileCabinet"
        component={ParentAddFileCabinet}
      />
      <Stack.Screen name="ParentViewContent" component={ParentViewContent} />
      <Stack.Screen
        name="ParentEditFileCabinet"
        component={ParentEditFileCabinet}
      />
      <Stack.Screen name="ParentLibrary" component={ParentLibrary} />
      <Stack.Screen
        name="ParentStoreFavoriteLinks"
        component={ParentStoreFavoriteLinks}
      />
      <Stack.Screen name="ParentAddLinks" component={ParentAddLinks} />
      <Stack.Screen
        name="ParentEditStoreFavoriteLinks"
        component={ParentEditStoreFavoriteLinks}
      />
      <Stack.Screen
        name="ParentViewStoreFavoriteLinks"
        component={ParentViewStoreFavoriteLinks}
      />
      <Stack.Screen name="ParentBlogs" component={ParentBlogs} />
      <Stack.Screen name="ParentViewBlogs" component={ParentViewBlogs} />
      <Stack.Screen name="ParentSuggestLinks" component={ParentSuggestLinks} />
      <Stack.Screen name="ParentAddBlogs" component={ParentAddBlogs} />
      <Stack.Screen name="ParentEditBlogs" component={ParentEditBlogs} />
      <Stack.Screen name="ParentPhotoAlbum" component={ParentPhotoAlbum} />
      <Stack.Screen
        name="ParentExportContent"
        component={ParentExportContent}
      />
      <Stack.Screen name="ParentAddPhoto" component={ParentAddPhoto} />
      <Stack.Screen name="ParentViewPhoto" component={ParentViewPhoto} />
      <Stack.Screen name="ParentEditPhoto" component={ParentEditPhoto} />
    </Stack.Navigator>
  );
}
