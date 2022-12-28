import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    EducatorMail,
    EducatorAccount,
    EducatorEvent,
    EducatorCabinet,
    EducatorAddFileCabinet,
    EducatorViewContent,
    EducatorEditFileCabinet,
    EducatorLibrary,
    EducatorResources,
    EducatorStoreFavoriteLinks,
    EducatorAddLinks,
    EducatorEditStoreFavoriteLinks,
    EducatorViewStoreFavoriteLinks,
    EducatorBlogs,
    EducatorViewBlogs,
    EducatorSuggestLinks,
    EducatorAddBlogs,
    EducatorEditBlogs,
    EducatorExportContent,
    EducatorPhotoAlbum,
    AddPhoto,
    ViewPhoto,
    EditPhoto,
    EducatorManageResources,
    EducatorAddResources,
    EducatorEditResources
  } from "./";
  const Stack = createStackNavigator();
export default function Account() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EducatorAccount" component={EducatorAccount} />
      <Stack.Screen name="EducatorMail" component={EducatorMail} />
      <Stack.Screen name="EducatorEvent" component={EducatorEvent} />
      <Stack.Screen name="EducatorCabinet" component={EducatorCabinet} />
      <Stack.Screen name="EducatorAddFileCabinet" component={EducatorAddFileCabinet} />
      <Stack.Screen name="EducatorViewContent" component={EducatorViewContent} />
      <Stack.Screen name="EducatorEditFileCabinet" component={EducatorEditFileCabinet} />
      <Stack.Screen name="EducatorLibrary" component={EducatorLibrary} />
      <Stack.Screen name="EducatorResources" component={EducatorResources} /> 
      <Stack.Screen name="EducatorStoreFavoriteLinks" component={EducatorStoreFavoriteLinks} />
      <Stack.Screen name="EducatorAddLinks" component={EducatorAddLinks} /> 
      <Stack.Screen name="EducatorEditStoreFavoriteLinks" component={EducatorEditStoreFavoriteLinks} /> 
      <Stack.Screen name="EducatorViewStoreFavoriteLinks" component={EducatorViewStoreFavoriteLinks} /> 
      <Stack.Screen name="EducatorBlogs" component={EducatorBlogs} /> 
      <Stack.Screen name="EducatorViewBlogs" component={EducatorViewBlogs} /> 
      <Stack.Screen name="EducatorSuggestLinks" component={EducatorSuggestLinks} /> 
      <Stack.Screen name="EducatorAddBlogs" component={EducatorAddBlogs} /> 
      <Stack.Screen name="EducatorEditBlogs" component={EducatorEditBlogs} />
      <Stack.Screen name="EducatorPhotoAlbum" component={EducatorPhotoAlbum} />
      <Stack.Screen name="EducatorExportContent" component={EducatorExportContent} />  
      <Stack.Screen name="AddPhoto" component={AddPhoto} />
      <Stack.Screen name="ViewPhoto" component={ViewPhoto} />
      <Stack.Screen name="EditPhoto" component={EditPhoto} />
      <Stack.Screen name="EducatorAddResources" component={EducatorAddResources} />
      <Stack.Screen name="EducatorEditResources" component={EducatorEditResources} />
      <Stack.Screen name="EducatorManageResources" component={EducatorManageResources} />
    </Stack.Navigator>
  );
}
