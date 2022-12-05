import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Login,UserType } from '../screens';
import ClientTabs from './ClientTabs';
import DrawerNavigator from './DrawerNavigator';

const App = createStackNavigator();
export default function AppStack() {
  return (
    <App.Navigator>
        <App.Screen
        name="App"
        component={DrawerNavigator}
        options={{
            headerShown:false,
            ...TransitionPresets.RevealFromBottomAndroid
        }}
        />
    </App.Navigator>
  )
}