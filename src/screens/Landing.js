import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import LandingComponent from '../components/LandingComponent';
import Signup from './Signup';

const Stack = createStackNavigator();


export default function Landing() {
  return (
    <Stack.Navigator
      initialRouteName="LandingComponent"
    >
      <Stack.Screen
        name="LandingComponent"
        component={LandingComponent}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        name="Login"
        component={Login}
      />

    </Stack.Navigator>
    )
}
