import * as React from 'react';
import { View, Text, StyleSheet, FlatList,Alert } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Logout from './src/screens/Logout';
import Landing from './src/screens/Landing';
import Signup from './src/screens/Signup';



const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
    >
      <Stack.Screen
        name="Landing"
        component={Landing}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
      />
      <Stack.Screen
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
    )
}

export default function App() {

  return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );

  
}


