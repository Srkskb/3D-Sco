import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import AuthNavigator from './authNavigator'

export default function RootNavigator() {
  return (
   <NavigationContainer>
    <AuthNavigator/>
   </NavigationContainer>
  )
}