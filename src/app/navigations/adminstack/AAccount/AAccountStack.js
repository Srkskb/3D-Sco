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
    AdminAddMyJournal
  } from "./";
  const Stack = createStackNavigator();
export default function AAccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminAccount" component={AdminAccount} />
      <Stack.Screen name="AdminMail" component={AdminMail} />
      <Stack.Screen name="AdminEvent" component={AdminEvent} />
      <Stack.Screen name="AdminCabinet" component={AdminCabinet} />
      <Stack.Screen name="AdminAddFileCabinet" component={AdminAddFileCabinet} />
      <Stack.Screen name="AdminViewContent" component={AdminViewContent} />
      <Stack.Screen name="AdminEditFileCabinet" component={AdminEditFileCabinet} />
      <Stack.Screen name="AdminLibrary" component={AdminLibrary} />
      <Stack.Screen name="AdminResources" component={AdminResources} /> 
      <Stack.Screen name="AdminStoreFavoriteLinks" component={AdminStoreFavoriteLinks} />
      <Stack.Screen name="AdminAddLinks" component={AdminAddLinks} /> 
      <Stack.Screen name="AdminEditStoreFavoriteLinks" component={AdminEditStoreFavoriteLinks} /> 
      <Stack.Screen name="AdminViewStoreFavoriteLinks" component={AdminViewStoreFavoriteLinks} /> 
      <Stack.Screen name="AdminBlogs" component={AdminBlogs} /> 
      <Stack.Screen name="AdminViewBlogs" component={AdminViewBlogs} /> 
      <Stack.Screen name="AdminSuggestLinks" component={AdminSuggestLinks} /> 
      <Stack.Screen name="AdminAddBlogs" component={AdminAddBlogs} /> 
      <Stack.Screen name="AdminEditBlogs" component={AdminEditBlogs} />
      <Stack.Screen name="AdminExportContent" component={AdminExportContent} /> 
      <Stack.Screen name="AdminAddResources" component={AdminAddResources} />
      <Stack.Screen name="AdminEditResources" component={AdminEditResources} />
      <Stack.Screen name="AdminManageResources" component={AdminManageResources} />
      <Stack.Screen name="AdminMyJournal" component={AdminMyJournal} />
      <Stack.Screen name="AdminEditMyJournal" component={AdminEditMyJournal} />
      <Stack.Screen name="AdminViewJournal" component={AdminViewJournal} />
      <Stack.Screen name="AdminAddMyJournal" component={AdminAddMyJournal} />

      

    </Stack.Navigator>
  );
}
