import * as React from 'react';
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';


import Home from './src/screens/Home';
import Landing from './src/screens/Landing';

// const SwitchNavigator = createSwitchNavigator(
//   {
//     Auth: Landing,
//     Home: Home
// 
//   },
//   {
//     initialRouteName: 'Auth',
//     headerMode: 'none'
//   }
// )
// const MyApp = createAppContainer(SwitchNavigator);

const Stack = createStackNavigator();


export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen
            name="Landing"
            component={Landing}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

  
}


