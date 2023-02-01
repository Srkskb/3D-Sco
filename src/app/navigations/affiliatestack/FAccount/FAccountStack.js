import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AffiliateMail,
    AffiliateAccount,
    AffiliateEvent,
    AffiliateCabinet,
    AffiliateAddFileCabinet,
    AffiliateViewContent,
    AffiliateEditFileCabinet,
    AffiliateLibrary,
    AffiliateStoreFavoriteLinks,
    AffiliateAddLinks,
    AffiliateEditStoreFavoriteLinks,
    AffiliateViewStoreFavoriteLinks,
    AffiliateBlogs,
    AffiliateViewBlogs,
    AffiliateSuggestLinks,
    AffiliateAddBlogs,
    AffiliateEditBlogs,
    AffiliateExportContent,
    AffiliatePhotoAlbum,
    AffiliateAddPhoto,
    AffiliateViewPhoto,
    AffiliateEditPhoto,
    AffiliateAddMyJournal,
    AffiliateEditMyJournal,
    AffiliateMyJournal,
    AffiliateViewJournal
  } from "./";
  import AffiliateMailPage from "../../../screens/affiliate/AffiliateMail/mail/AffiliateMailPage";
  import ViewMail from "../../../screens/affiliate/AffiliateMail/mail/ViewMail";
  import Reply from "../../../screens/affiliate/AffiliateMail/mail/Reply";
  import ComposeMail from "../../../screens/affiliate/AffiliateMail/mail/ComposeMail";
  const Stack = createStackNavigator();
export default function FAccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AffiliateAccount" component={AffiliateAccount} />
      <Stack.Screen name="AffiliateMailPage" component={AffiliateMailPage} />
      <Stack.Screen name="ComposeMail" component={ComposeMail} />
      <Stack.Screen name="ViewMail" component={ViewMail} />
      <Stack.Screen name="Reply" component={Reply} />
      <Stack.Screen name="AffiliateEvent" component={AffiliateEvent} />
      <Stack.Screen name="AffiliateCabinet" component={AffiliateCabinet} />
      <Stack.Screen name="AffiliateAddFileCabinet" component={AffiliateAddFileCabinet} />
      <Stack.Screen name="AffiliateViewContent" component={AffiliateViewContent} />
      <Stack.Screen name="AffiliateEditFileCabinet" component={AffiliateEditFileCabinet} />
      <Stack.Screen name="AffiliateLibrary" component={AffiliateLibrary} />
      <Stack.Screen name="AffiliateStoreFavoriteLinks" component={AffiliateStoreFavoriteLinks} />
      <Stack.Screen name="AffiliateAddLinks" component={AffiliateAddLinks} /> 
      <Stack.Screen name="AffiliateEditStoreFavoriteLinks" component={AffiliateEditStoreFavoriteLinks} /> 
      <Stack.Screen name="AffiliateViewStoreFavoriteLinks" component={AffiliateViewStoreFavoriteLinks} /> 
      <Stack.Screen name="AffiliateBlogs" component={AffiliateBlogs} /> 
      <Stack.Screen name="AffiliateViewBlogs" component={AffiliateViewBlogs} /> 
      <Stack.Screen name="AffiliateSuggestLinks" component={AffiliateSuggestLinks} /> 
      <Stack.Screen name="AffiliateAddBlogs" component={AffiliateAddBlogs} /> 
      <Stack.Screen name="AffiliateEditBlogs" component={AffiliateEditBlogs} />
      <Stack.Screen name="AffiliatePhotoAlbum" component={AffiliatePhotoAlbum} />
      <Stack.Screen name="AffiliateExportContent" component={AffiliateExportContent} />  
      <Stack.Screen name="AffiliateAddMyJournal" component={AffiliateAddMyJournal} />
      <Stack.Screen name="AffiliateViewPhoto" component={AffiliateViewPhoto} />
      <Stack.Screen name="AffiliateEditMyJournal" component={AffiliateEditMyJournal} />
      <Stack.Screen name="AffiliateMyJournal" component={AffiliateMyJournal} />
      <Stack.Screen name="AffiliateAddPhoto" component={AffiliateAddPhoto} />
      <Stack.Screen name="AffiliateEditPhoto" component={AffiliateEditPhoto} />
      <Stack.Screen name="AffiliateViewJournal" component={AffiliateViewJournal} />
    </Stack.Navigator>
  );
}
