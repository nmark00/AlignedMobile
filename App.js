import * as React from 'react';
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

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
  let initRoute;
  if (auth().currentUser && auth().currentUser.displayName)
    initRoute = "Home";
  else initRoute = "Landing";

  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initRoute}
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


